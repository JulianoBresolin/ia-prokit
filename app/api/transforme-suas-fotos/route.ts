import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription"; // Controle de assinatura personalizado

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();
		const body = await req.json();
		console.log("Valores recebidos no corpo da requisição:", body);
		const {
			prompt,
			amountOptions,
			forceStyle, // Nome vindo do front-end
			photoStyle, // Nome vindo do front-end
			input_images,
		} = body;

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

		// Chama a API Replicate com os parâmetros recebidos
		const response = await replicate.run(
			"tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
			{
				input: {
					prompt: `img ${prompt}`,
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
			}
		);

		const valueToAdd = 50;
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