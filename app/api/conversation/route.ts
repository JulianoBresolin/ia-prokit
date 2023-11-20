import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"; // Importa a classe NextResponse para manipular respostas HTTP
import OpenAI from "openai";
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription"; // Importa funções personalizadas para controle de assinatura
// Cria uma instância de Configuration com a chave da API da OpenAI
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// Função que lida com a requisição HTTP POST
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
			messages,
			max_tokens: 1024,
		});

		if (response && response.usage) {
			const tokensUsed = response.usage.total_tokens;
			console.log("response:", response);
			console.log("Tokens used:", tokensUsed);

			if (isPro) {
				await incrementPro(tokensUsed);
			} else {
				await incrementApiLimitReq();
				await incrementApiLimitTokens(tokensUsed);
			}
		}
		// Verifica se o limite gratuito da API da OpenAI foi atingido

		// Retorna a resposta da API da OpenAI como JSON
		return new NextResponse(JSON.stringify(response.choices[0].message), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		// Em caso de erro, registra o erro no console e retorna uma resposta de erro interno
		console.log("[CONVERSATION_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
