import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { message, userId } = body;

		console.log(`Webhook recebido: ${message} para o usuário: ${userId}`);

		// Aqui, você pode armazenar o status da operação em um banco de dados,
		// enviar uma atualização ao frontend (via WebSocket, por exemplo), ou simplesmente logar a informação.

		return new NextResponse("Webhook recebido com sucesso.", { status: 200 });
	} catch (error) {
		console.error("Erro no webhook:", error);
		return new NextResponse("Erro no webhook.", { status: 500 });
	}
}
