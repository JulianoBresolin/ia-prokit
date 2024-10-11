// ai-saas/ia-prokit/app/api/predictions/[id]/route.ts

import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_KEY,
});

// Prevent Next.js / Vercel from caching responses
// See https://github.com/replicate/replicate-javascript/issues/136#issuecomment-1728053102
replicate.fetch = (url, options) => {
	return fetch(url, { cache: "no-store", ...options });
};

interface Params {
	params: {
		id: string;
	};
}
export async function GET(request: Request, { params }: Params) {
	const { id } = params;
	try {
		// Obtendo a predição com base no id
		const prediction = await replicate.predictions.get(id);

		// Retornando erro se houver
		if (prediction?.error) {
			return NextResponse.json({ detail: prediction.error }, { status: 500 });
		}

		// Retornando a predição em JSON
		return NextResponse.json(prediction);
	} catch (error) {
		// Tratamento de erros
		return NextResponse.json(
			{ detail: "An unexpected error occurred." },
			{ status: 500 }
		);
	}
}
