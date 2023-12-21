import { NextResponse } from "next/server";

export default async function GET(req: Request) {
	console.log(" incoming webhook!", req.body);
	const prediction = req.body;

	return NextResponse.json(prediction);
}
