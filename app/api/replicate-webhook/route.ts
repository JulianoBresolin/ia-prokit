import { NextResponse } from "next/server";
import { validateWebhook } from "replicate";
import { Resend } from "resend";
import { EmailTemplate } from "../../../components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);
let emailSent = false;

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

	console.log("Webhook is valid!");
	const body = await request.json();
	console.log(body);

	if (body.status === "succeeded") {
		const imageUrl = body.output[0];
		console.log(imageUrl);

		try {
			if (!emailSent) {
				console.log("Enviando o e-mail...");
				const { data } = await resend.emails.send({
					from: "Acme <onboarding@resend.dev>",
					to: ["bresolinfotografia@gmail.com"],
					subject: "Sua imagem está pronta!",
					react: EmailTemplate({ firstName: "Usuário", imageUrl }),
				});
				console.log("E-mail enviado com sucesso:", data);

				// Marcar como enviado após o envio bem-sucedido
				emailSent = true;
			} else {
				console.log("Email já foi enviado anteriormente.");
			}
		} catch (error: any) {
			console.error("Erro ao enviar o e-mail:", error);
			if (error.response && error.response.status >= 400) {
				console.error("Resend retornou um erro HTTP:", error.response.status);
			}
		}
	}

	return NextResponse.json({ detail: "Webhook is valid" }, { status: 200 });
}
