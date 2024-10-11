// ai-saas/ia-prokit/app/api/predictions/route.ts

import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_KEY,
});

// Prevent Next.js / Vercel from caching responses
// See https://github.com/replicate/replicate-javascript/issues/136#issuecomment-1728053102
replicate.fetch = (url, options) => {
	return fetch(url, { ...options, cache: "no-store" });
};

// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = "https://www.iaprokit.com.br";

export async function POST(request: Request) {
	if (!process.env.REPLICATE_API_KEY) {
		throw new Error(
			"The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
		);
	}

	const { prompt } = await request.json();

	const options: any = {
		version: "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc",
		input: { prompt },
	};

	if (WEBHOOK_HOST) {
		options.webhook = `${WEBHOOK_HOST}/api/replicate-webhook`;
		options.webhook_events_filter = ["start", "completed"];
	}

	const prediction = await replicate.predictions.create(options);

	if (prediction?.error) {
		return NextResponse.json({ detail: prediction.error }, { status: 500 });
	}

	return NextResponse.json(prediction, { status: 201 });
}
