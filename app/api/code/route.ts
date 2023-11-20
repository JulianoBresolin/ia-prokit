// Importação de módulos e funções necessárias
import { auth } from "@clerk/nextjs"; // Importa funções de autenticação do Clerk
import { NextResponse } from "next/server"; // Importa a classe NextResponse para manipular respostas HTTP
import OpenAI from "openai"; // Importa módulos relacionados à API da OpenAI
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import {
	incrementApiLimitTokens,
	incrementApiLimitReq,
	checkApiLimitReq,
} from "@/lib/api-limit";
import { incrementPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription";
// Cria uma instância de Configuration com a chave da API da OpenAI
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, // Utiliza uma variável de ambiente para a chave da API
});

// Cria uma instância da API da OpenAI com a configuração

// Define uma mensagem de instrução que será enviada à OpenAI
const instructionMessage: ChatCompletionMessageParam = {
	role: "system",
	content:
		"You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

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

		// Verifica se as mensagens são fornecidas na requisição
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

		// Envia as mensagens para a API da OpenAI, incluindo a mensagem de instrução
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [instructionMessage, ...messages],
			max_tokens: 1024,
		});
		// A resposta da API da OpenAI está em response.choices[0].message
		if (response && response.usage) {
			// Você pode agora extrair o número de tokens usados
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
		// Retorna a resposta da API da OpenAI como JSON
		return new NextResponse(JSON.stringify(response.choices[0].message), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		// Em caso de erro, registra o erro no console e retorna uma resposta de erro interno
		console.log("[CODE_ERROR]", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
