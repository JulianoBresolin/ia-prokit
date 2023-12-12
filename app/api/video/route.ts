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

		const response = await replicate.run(
			"anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
			{
				input: {
					fps: 24,
					prompt: prompt,
					negative_prompt: " dust, noisy, washed out, ugly, distorted, broken",
					guidance_scale: 15,
					num_inference_steps: 50,
				},
			}
		);

		const valueToAdd = 20;
		let totalTokens = valueToAdd;

		if (isPro) {
			await incrementPro(totalTokens);
		} else {
			await incrementApiLimitReq();
			await incrementApiLimitTokens(totalTokens);
		}

		return NextResponse.json(response);
	} catch (error) {
		console.log("[MUSIC_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
