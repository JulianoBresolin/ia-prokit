import Replicate from "replicate";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription";

// Cria uma instância de Configuration com a chave da API da Replicate
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
		const { userId } = auth();
		const body = await req.json();
		const { prompt } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!replicate.auth) {
			return new NextResponse("Replicate API Key not configured.", {
				status: 500,
			});
		}

		if (!prompt) {
			return new NextResponse("Messages are required", { status: 400 });
		}

		const freeTrial = await checkApiLimitReq();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse(
				"Free trial has expired. Please upgrade to pro.",
				{ status: 403 }
			);
		}

		// Configura as opções para o webhook e o modelo a ser usado
		const options: any = {
			version:
				"0da600fab0c45a66211339f1c16b71345d22f26ef5fea3dca1bb90bb5711e950", // Atualize para a versão desejada
			input: {
				model_name: "Artistic",
				input_image: prompt,
				with_scratch: true,
				render_factor: 35,
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
		const valueToAdd = 25;
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
		console.log("[IMAGE_RESTAURATION_COLORS_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
