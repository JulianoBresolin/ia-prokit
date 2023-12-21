import { NextResponse } from "next/server";

export default async function handler(req: Request) {
	console.log(" incoming webhook!", req.body);
	const prediction = req.body;

	return NextResponse.json(prediction);
}
