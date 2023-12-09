import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { incrementApiLimitReq, checkApiLimitReq } from "@/lib/api-limit";
//import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		const data = await req.formData();
		const file: File | null = data.get("file") as unknown as File;
		console.log(file, data);

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		if (!replicate.auth) {
			return new NextResponse("OpenAI API Key not configured.", {
				status: 500,
			});
		}

		if (!file) {
			return new NextResponse("Messages are required", { status: 400 });
		}

		const freeTrial = await checkApiLimitReq();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse(
				"Free trial has expired. Please upgrade to pro.",
				{ status: 403 }
			);
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const fileName = file.name;
		const publicFolderPath = join(process.cwd(), "public/temp");
		const filePath = join(publicFolderPath, fileName);

		await writeFile(filePath, buffer);
		console.log(`Arquivo salvo em ${filePath}`);

		const response = await replicate.run(
			"tencentarc/gfpgan:9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
			{
				input: {
					img: `https://ia-prokit.vercel.app/temp/${fileName}`,
				},
			}
		);

		if (!isPro) {
			await incrementApiLimitReq();
		}

		return NextResponse.json(response);
	} catch (error) {
		console.log("[IMAGE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
