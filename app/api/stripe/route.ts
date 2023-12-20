// Importação de módulos e funções necessárias
import { auth, currentUser } from "@clerk/nextjs"; // Clerk é usado para autenticação
import { NextResponse } from "next/server"; // NextResponse para manipular respostas
import prismadb from "@/lib/prismadb"; // Acesso ao banco de dados com Prisma
import { stripe } from "@/lib/stripe"; // Integração com Stripe para pagamentos
import { absoluteUrl } from "@/lib/utils"; // Funções utilitárias para URLs

// Criação de uma URL para as configurações da conta
const settingsUrl = absoluteUrl("/settings");

// Função que lida com a requisição HTTP GET
export async function GET() {
	try {
		// Autentica o usuário e obtém informações do usuário atual
		const { userId } = auth();
		const user = await currentUser();

		// Verifica se o usuário não está autenticado
		if (!userId || !user) {
			return new NextResponse("Unauthorized", { status: 401 });
		}

		// Verifica se o usuário tem uma assinatura no banco de dados Prisma
		const userSubscription = await prismadb.userSubscription.findUnique({
			where: {
				userId,
			},
		});

		// Se o usuário tem uma assinatura com um ID de cliente Stripe associado
		if (userSubscription && userSubscription.stripeCustomerId) {
			// Cria uma sessão de faturamento com Stripe e retorna a URL
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: userSubscription.stripeCustomerId,
				return_url: settingsUrl,
			});

			return new NextResponse(JSON.stringify({ url: stripeSession.url }));
		}

		// Se o usuário não tem uma assinatura
		const stripeSession = await stripe.checkout.sessions.create({
			success_url: settingsUrl,
			cancel_url: settingsUrl,
			payment_method_types: ["card"],
			mode: "subscription",
			billing_address_collection: "auto",
			customer_email: user.emailAddresses[0].emailAddress,

			line_items: [
				{
					price: "price_1OPTQbDmtpt2jh5mv2nktWeb",
				},
			],
			metadata: {
				userId,
			},
		});

		// Retorna a URL da sessão de checkout criada
		return new NextResponse(JSON.stringify({ url: stripeSession.url }));
	} catch (error) {
		// Em caso de erro, registra no console e retorna uma resposta de erro interno
		console.log("[STRIPE_ERROR]", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
