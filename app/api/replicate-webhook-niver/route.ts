import { NextResponse } from "next/server";
import { validateWebhook } from "replicate";

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

	return NextResponse.json({ detail: "Webhook is valid" }, { status: 200 });
}
