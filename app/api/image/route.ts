// Importação de módulos e funções necessárias
import { auth } from "@clerk/nextjs"; // Importa funções de autenticação do Clerk
import { NextResponse } from "next/server"; // Importa a classe NextResponse para manipular respostas HTTP
import OpenAI from "openai"; // Importa módulos relacionados à API da OpenAI
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription";

// Cria uma instância de Configuration com a chave da API da OpenAI
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, // Utiliza uma variável de ambiente para a chave da API
});

// Função que lida com a requisição HTTP POST
export async function POST(req: Request) {
	try {
		// Obtém o ID do usuário autenticado a partir das funções do Clerk
		const { userId } = auth();

		// Obtém o corpo da requisição como JSON
		const body = await req.json();

		// Extrai as informações do corpo da requisição, incluindo o prompt, a quantidade e a resolução
		const { prompt, amount = 1, resolution = "512x512" } = body;

		const resolutionTokensMap = {
			"256x256": 20,
			"512x512": 30,
			"1024x1024": 50,
		};

		// Verifica se o usuário não está autenticado
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// Verifica se a chave da API da OpenAI não está configurada
		if (!openai.apiKey) {
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

		// Envia o prompt, a quantidade e a resolução para a API da OpenAI e obtém uma resposta
		const response = await openai.images.generate({
			prompt,
			n: parseInt(amount, 10),
			size: resolution,
		});

		// Retorna a resposta da API da OpenAI como JSON
		return NextResponse.json(response.data);
	} catch (error) {
		// Em caso de erro, registra o erro no console e retorna uma resposta de erro interno
		console.log("[IMAGE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
