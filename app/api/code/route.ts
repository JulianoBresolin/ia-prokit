import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"; // Importa a classe NextResponse para manipular respostas HTTP
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription"; // Importa funções personalizadas para controle de assinatura
// Cria uma instância de Configuration com a chave da API da OpenAI
import { encodingForModel } from "js-tiktoken";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// Função que lida com a requisição HTTP POST
const instructionMessage = {
	role: "system",
	content:
		"You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};
export async function POST(req: Request) {
	try {
		// Obtém o ID do usuário autenticado a partir das funções do Clerk
		const { userId } = auth();

		// Obtém o corpo da requisição como JSON
		const body = await req.json();

		// Obtém as mensagens do corpo da requisição
		const { messages } = body;

		// Verifica se o usuário não está autenticado
		if (!userId) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// Verifica se a chave da API da OpenAI não está configurada
		if (!openai.apiKey) {
			return new NextResponse("OpenAI API Key not configured.", {
				status: 500,
			});
		}

		if (!messages) {
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

		// Envia as mensagens para a API da OpenAI e obtém uma resposta
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: true,
			messages: [instructionMessage, ...messages],
		});

		const model = "gpt-3.5-turbo";

		const enc = encodingForModel(model);

		const promptTokens = messages.reduce(
			(total: number, msg: { content: string }) =>
				total + enc.encode(msg.content ?? "").length,
			0
		);

		let completionTokens = 0;
		let totalTokens = 0;

		const streamCallbacks = {
			onToken: async (content: string) => {
				const tokenList = enc.encode(content);
				completionTokens += tokenList.length;
			},
			onFinal: async () => {
				const totalTokensvalue = completionTokens + promptTokens;
				totalTokens = totalTokensvalue;

				console.log(
					`Token completion: ${completionTokens}, prompt: ${promptTokens}, total: ${totalTokens}`
				);

				if (isPro) {
					await incrementPro(totalTokens);
				}
				if (isPro) {
					await incrementPro(totalTokens);
				} else {
					await incrementApiLimitReq();
					await incrementApiLimitTokens(totalTokens);
				}
			},
		};

		const stream = OpenAIStream(response, streamCallbacks);

		return new StreamingTextResponse(stream);
	} catch (error) {
		// Em caso de erro, registra o erro no console e retorna uma resposta de erro interno
		console.log("[CODE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
