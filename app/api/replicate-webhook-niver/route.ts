import { NextResponse } from "next/server";
import { validateWebhook } from "replicate";
import sharp from "sharp";
import path from "path"; // Para tratar paths corretamente

const framePath = path.resolve("./public", "frame.png"); // Corrija o caminho para o frame

export async function POST(request: Request) {
	console.log("Received webhook...");

	const secret = process.env.REPLICATE_WEBHOOK_SIGNING_SECRET;

	// Validação do Webhook
	if (!secret) {
		console.log(
			"Skipping webhook validation. To validate webhooks, set REPLICATE_WEBHOOK_SIGNING_SECRET"
		);
		const body = await request.json();
		console.log(body);
		return NextResponse.json(
			{ detail: "Webhook received (but not validated)" },
			{ status: 200 }
		);
	}

	// Valida o webhook com a chave secreta
	const webhookIsValid = await validateWebhook(request.clone(), secret);

	if (!webhookIsValid) {
		return NextResponse.json({ detail: "Webhook is invalid" }, { status: 401 });
	}

	console.log("Webhook is valid!");
	const body = await request.json();
	console.log(body);

	// Se o status do webhook for 'succeeded', processa a imagem
	if (body.status === "succeeded") {
		const imageUrl = body.output[0]; // Pega a URL da imagem gerada
		console.log(imageUrl);

		if (imageUrl) {
			try {
				// Faz o download da imagem gerada pela IA
				const response = await fetch(imageUrl);
				const imageBuffer = await response.arrayBuffer();

				// Caminho onde a imagem final será salva
				const outputPath = path.resolve(
					"./public",
					`final-photo-${Date.now()}.png`
				);

				// Carrega a imagem base e o frame PNG, e os combina usando Sharp
				const baseImage = sharp(Buffer.from(imageBuffer)); // Converte ArrayBuffer para Buffer
				const frameImage = sharp(framePath).resize({
					fit: "cover",
				});

				// Compor o frame sobre a imagem gerada
				await baseImage
					.composite([{ input: await frameImage.toBuffer(), blend: "over" }])
					.toFile(outputPath); // Salva a imagem final no caminho especificado

				console.log("Imagem final criada com sucesso:", outputPath);

				// Gera a URL da imagem final
				const finalImageUrl = `${
					process.env.NEX_PUBLIC_APP_URL
				}/final-photo-${Date.now()}.png`;

				// Envia a URL de volta para o front-end
				return NextResponse.json({ url: finalImageUrl }, { status: 200 });
			} catch (error: any) {
				// Tratamento de erro durante o processo de download e composição de imagens
				console.error("Erro ao processar a imagem:", error);
				if (error.response && error.response.status >= 400) {
					console.error("Erro HTTP ao baixar imagem:", error.response.status);
				}
			}
		} else {
			console.log("Nenhuma URL de imagem encontrada.");
		}
	}

	return NextResponse.json(
		{ detail: "Webhook processed successfully" },
		{ status: 200 }
	);
}
