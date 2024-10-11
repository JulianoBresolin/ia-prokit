// The Replicate webhook is a POST request where the request body is a prediction object.
// Identical webhooks can be sent multiple times, so this handler must be idempotent.

import { NextResponse } from "next/server";
import { validateWebhook } from "replicate";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: Request) {
	console.log("Received webhook...");

	const secret = process.env.REPLICATE_WEBHOOK_SIGNING_SECRET;

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

	const webhookIsValid = await validateWebhook(request.clone(), secret);

	if (!webhookIsValid) {
		return NextResponse.json({ detail: "Webhook is invalid" }, { status: 401 });
	}

	// process validated webhook here...
	console.log("Webhook is valid!");
	const body = await request.json();
	console.log(body);

	if (body.status === "completed") {
		const imageUrl = body.output[0]; // URL da imagem gerada
		console.log(imageUrl);
		try {
			console.log("Enviando o e-mail...");
			// Envia o e-mail com a URL da imagem
			await resend.emails.send({
				from: "Acme <onboarding@resend.dev>",
				to: ["bresolinfotografia@gmail.com"], // Troque pelo e-mail correto do usuário
				subject: "Sua imagem está pronta!",
				react: EmailTemplate({ firstName: "Usuário", imageUrl }), // Template do e-mail com URL da imagem
			});
		} catch (error) {
			console.error("Erro ao enviar o e-mail:", error);
		}
	}

	return NextResponse.json({ detail: "Webhook is valid" }, { status: 200 });
}
