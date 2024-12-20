import Replicate from "replicate";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription"; // Controle de assinatura personalizado
import { translate } from "@vitalets/google-translate-api";

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_KEY,
});
// Prevent Next.js
replicate.fetch = (url, options) => {
	return fetch(url, { ...options, cache: "no-store" });
};

const WEBHOOK_HOST = process.env.NEX_PUBLIC_APP_URL;

// Função que lida com a requisição HTTP POST
export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		console.log("Valores recebidos no corpo da requisição:", body);
		const { prompt, amountOptions, forceStyle, photoStyle, input_images } =
			body;

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!replicate.auth) {
			return new NextResponse("Replicate API Key not configured.", {
				status: 500,
			});
		}

		if (!prompt || !input_images || input_images.length !== 4) {
			return new NextResponse("Prompt and 4 input images are required", {
				status: 400,
			});
		}

		const freeTrial = await checkApiLimitReq();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse(
				"Free trial has expired. Please upgrade to pro.",
				{ status: 403 }
			);
		}
		// Translate the prompt to English
		const translatedPrompt = await translate(prompt, { to: "en" });
		// Chama a API Replicate com os parâmetros recebidos
		console.log(translatedPrompt.text);
		const options: any = {
			version:
				"ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4", // Atualize para a versão desejada
			input: {
				prompt: `img ${translatedPrompt.text}`, // Use the translated prompt
				num_steps: 50,
				style_name: photoStyle,
				num_outputs: parseInt(amountOptions, 10),
				input_image: input_images[0], // Primeira imagem
				input_image2: input_images[1], // Segunda imagem
				input_image3: input_images[2], // Terceira imagem
				input_image4: input_images[3], // Quarta imagem
				guidance_scale: 5,
				negative_prompt:
					"nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
				style_strength_ratio: parseInt(forceStyle, 10),
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

		const valueToAdd = 75;
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
