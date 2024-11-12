// Importação de módulos e funções necessárias
import { auth } from "@clerk/nextjs/server"; // Importa funções de autenticação do Clerk
import { NextResponse } from "next/server"; // Importa a classe NextResponse para manipular respostas HTTP
import Replicate from "replicate";
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription";
import { translate } from "@vitalets/google-translate-api";
// Cria uma instância de Configuration com a chave da API da OpenAI
const replicate = new Replicate({
	auth: process.env.REPLICATE_API_KEY,
});
// Prevent Next.js
replicate.fetch = (url, options) => {
	return fetch(url, { ...options, cache: "no-store" });
};

// Define o host para o webhook
const WEBHOOK_HOST = process.env.NEX_PUBLIC_APP_URL;

export async function POST(req: Request) {
	try {
		// Obtém o ID do usuário autenticado a partir das funções do Clerk
		const { userId } = auth();

		// Obtém o corpo da requisição como JSON
		const body = await req.json();

		// Extrai as informações do corpo da requisição, incluindo o prompt, a quantidade e a resolução
		const { prompt, amount, resolution } = body;

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
		const translatedPrompt = await translate(prompt, { to: "en" });

		const options: any = {
			model: "black-forest-labs/flux-schnell", // Atualize para a versão desejada
			input: {
				prompt: `${translatedPrompt.text}`,
				go_fast: true,
				megapixels: "1",
				num_outputs: parseInt(amount, 10),
				aspect_ratio: resolution,
				output_format: "jpg",
				output_quality: 80,
			},
		};

		// Adiciona o webhook se o host estiver definido
		if (WEBHOOK_HOST) {
			options.webhook = `${WEBHOOK_HOST}/api/replicate-webhook`; // URL do webhook
			options.webhook_events_filter = ["start", "completed"]; // Eventos a serem monitorados
		}

		// Faz a chamada à API da Replicate com o webhook
		const prediction = await replicate.predictions.create(options);

		if (prediction?.error) {
			return NextResponse.json({ detail: prediction.error }, { status: 500 });
		}

		// Incrementa os limites de requisição e tokens conforme o plano do usuário
		const valueToAdd = 50;
		let totalTokens = valueToAdd;

		if (isPro) {
			await incrementPro(totalTokens);
		} else {
			await incrementApiLimitReq();
			await incrementApiLimitTokens(totalTokens);
		}

		// Retorna a resposta da API da Replicate
		return NextResponse.json(prediction, { status: 201 });
	} catch (error) {
		console.log("[IMAGE_FLUX_GENERATE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
