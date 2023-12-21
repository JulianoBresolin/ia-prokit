import Replicate from "replicate";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription"; // Importa funções personalizadas para controle de assinatura

// Cria uma instância de Configuration com a chave da API da OpenAI

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const { prompt } = body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!replicate.auth) {
			return new NextResponse("OpenAI API Key not configured.", {
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

		// Decodifica a imagem da string base64

		const response = await replicate.predictions.create({
			version:
				"microsoft/bringing-old-photos-back-to-life:c75db81db6cbd809d93cc3b7e7a088a351a3349c9fa02b6d393e35e0d51ba799",
			input: {
				image: prompt,
				with_scratch: true,
			},
			webhook: "https://www.iaprokit.com.br/replicate-webhook",
		});

		const valueToAdd = 25;
		let totalTokens = valueToAdd;

		if (isPro) {
			await incrementPro(totalTokens);
		} else {
			await incrementApiLimitReq();
			await incrementApiLimitTokens(totalTokens);
		}

		return NextResponse.json(response);
	} catch (error) {
		console.log("[IMAGE_RESTAURATION_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
