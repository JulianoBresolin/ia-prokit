// Importação de módulos e funções necessárias
import { auth } from "@clerk/nextjs"; // Importa funções de autenticação do Clerk
import { NextResponse } from "next/server"; // Importa a classe NextResponse para manipular respostas HTTP
import Replicate from "replicate";
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription";

// Cria uma instância de Configuration com a chave da API da OpenAI
const replicate = new Replicate({
	auth: process.env.REPLICATE_API_KEY,
});

// Função que lida com a requisição HTTP POST
export async function POST(req: Request) {
	try {
		// Obtém o ID do usuário autenticado a partir das funções do Clerk
		const { userId } = auth();

		// Obtém o corpo da requisição como JSON
		const body = await req.json();

		// Extrai as informações do corpo da requisição, incluindo o prompt, a quantidade e a resolução
		const { prompt, amount = 1, resolution = "1:1" } = body;

		const resolutionTokensMap = {
			"1:1": 20,
			"2:3": 20,
			"3:2": 20,
			"3:4": 20,
			"4:3": 20,
			"4:5": 20,
			"9:16": 30,
			"9:21": 30,
			"16:9": 30,
			"21:9": 30,
		};

		// Verifica se o usuário não está autenticado
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// Verifica se a chave da API da OpenAI não está configurada
		if (!replicate.auth) {
			return new NextResponse("OpenAI API Key not configured.", {
				status: 500,
			});
		}

		// Verifica se o prompt é fornecido na requisição
		if (!prompt) {
			return new NextResponse("prompt is required", { status: 400 });
		}

		// Verifica se a quantidade (amount) é fornecida na requisição
		if (!amount) {
			return new NextResponse("amount is required", { status: 400 });
		}

		// Verifica se a resolução (resolution) é fornecida na requisição
		if (!resolution) {
			return new NextResponse("resolution is required", { status: 400 });
		}

		// Verifica se o limite gratuito da API da OpenAI foi atingido
		const freeTrial = await checkApiLimitReq();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse(
				"Free trial has expired. Please upgrade to pro.",
				{ status: 403 }
			);
		}
		// Calcule o consumo total de tokens com base na quantidade e resolução escolhidas
		const totalTokens =
			resolutionTokensMap[resolution as keyof typeof resolutionTokensMap] *
			amount;
		console.log("Tokens used:", totalTokens);
		// Verifique se o limite de tokens gratuito foi atingido

		if (isPro) {
			await incrementPro(totalTokens);
		} else {
			await incrementApiLimitReq();
			await incrementApiLimitTokens(totalTokens);
		}

		const response = await replicate.run("black-forest-labs/flux-schnell", {
			input: {
				prompt: prompt,
				go_fast: true,
				megapixels: "1",
				num_outputs: parseInt(amount, 10),
				aspect_ratio: resolution,
				output_format: "jpg",
				output_quality: 80,
			},
		});

		// Retorna a resposta da API da OpenAI como JSON
		return NextResponse.json(response);
	} catch (error) {
		// Em caso de erro, registra o erro no console e retorna uma resposta de erro interno
		console.log("[IMAGE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
