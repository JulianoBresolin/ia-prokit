import Stripe from "stripe"; // Importa a biblioteca Stripe para lidar com eventos webhooks do Stripe
import { headers } from "next/headers"; // Importa a função 'headers' para acessar cabeçalhos da requisição
import { NextResponse } from "next/server"; // Importa a classe 'NextResponse' para gerar respostas da rota
import prismadb from "@/lib/prismadb"; // Importa um módulo para acesso ao banco de dados usando Prisma
import { stripe } from "@/lib/stripe"; // Importa um módulo para interagir com o Stripe

export async function POST(req: Request) {
	// Obtém o corpo da requisição como texto
	const body = await req.text();
	// Obtém a assinatura do webhook Stripe a partir dos cabeçalhos
	const signature = headers().get("Stripe-Signature") as string;

	let event: Stripe.Event; // Variável para armazenar o evento Stripe

	try {
		// Tenta construir o evento Stripe a partir do corpo e assinatura
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch (error: any) {
		// Em caso de erro na construção do evento, retorna uma resposta de erro com código 400
		return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
	}

	// Obtém o objeto de sessão a partir do evento (se for um evento 'checkout.session.completed')
	const session = event.data.object as Stripe.Checkout.Session;

	if (event.type === "checkout.session.completed") {
		// Se o evento for de conclusão de sessão de checkout
		// Obtém informações da assinatura associada à sessão de checkout
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);

		if (!session?.metadata?.userId) {
			// Verifica se o evento não contém o ID do usuário e retorna um erro com código 400 se não contiver
			return new NextResponse("User id is required", { status: 400 });
		}

		// Cria um registro da assinatura do usuário no banco de dados
		await prismadb.userSubscription.create({
			data: {
				userId: session?.metadata?.userId,
				stripeSubscriptionId: subscription.id,
				stripeCustomerId: subscription.customer as string,
				stripePriceId: subscription.items.data[0].price.id,
				period_start: new Date(subscription.current_period_start * 1000),
				period_end: new Date(subscription.current_period_end * 1000),
				stripeCustomerCount: 0,
				reported: false,
			},
		});
	}

	if (event.type === "invoice.payment_succeeded") {
		// Se o evento for de pagamento de fatura bem-sucedido
		// Obtém informações da assinatura associada à fatura
		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);

		// Atualiza o registro da assinatura do usuário no banco de dados com informações da fatura
		await prismadb.userSubscription.update({
			where: {
				stripeSubscriptionId: subscription.id,
			},
			data: {
				stripePriceId: subscription.items.data[0].price.id,
				period_end: new Date(subscription.current_period_end * 1000),
				period_start: new Date(subscription.current_period_start * 1000),
				stripeCustomerCount: 0,
				reported: true,
			},
		});
	}

	return new NextResponse(null, { status: 200 });
}
