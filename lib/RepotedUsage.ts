import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

import { CronJob } from "cron";

const reportUsageToStripe = async () => {
	try {
		console.log("Iniciando relatório de uso para o Stripe...");

		const reports = await prismadb.userSubscription.findMany({
			where: {
				reported: false,
			},
			select: {
				id: true,
				userId: true,
				period_start: true,
				period_end: true,
				stripeCustomerCount: true,
				stripeSubscriptionId: true,
			},
		});

		if (reports.length > 0) {
			// Loop pelos relatórios não reportados
			for (const report of reports) {
				const subscriptionId = report.stripeSubscriptionId;

				if (subscriptionId) {
					// Obtém informações da assinatura do Stripe
					const subscription = await stripe.subscriptions.retrieve(
						subscriptionId
					);
					console.log("Dados da assinatura do Stripe:", subscription);

					const subscriptionItemId = subscription.items.data[0].id;
					console.log("ID do item da assinatura:", subscriptionItemId);

					const periodStart = report.period_start;
					console.log("Período de início:", periodStart);

					if (periodStart) {
						await stripe.subscriptionItems.createUsageRecord(
							subscriptionItemId,
							{
								quantity: report.stripeCustomerCount,
								timestamp: Math.ceil(new Date(periodStart).getTime() / 1000),
								action: "set",
							}
						);
					}
				}
				console.log("Relatório de uso para o Stripe concluído.");
			}
		}
	} catch (error) {
		console.error("Erro ao relatar uso para o Stripe:", error);
	}
};

// Função para verificar e executar a tarefa no horário agendado// Função para agendar e executar a tarefa a cada 15 minutos

export const startCronJob = () => {
	new CronJob(
		"*/30 * * * *", // Expressão cron
		async () => {
			try {
				console.log("Tarefa agendada iniciada.");
				await reportUsageToStripe();
			} catch (error) {
				console.error("Erro na tarefa agendada:", error);
			}
		},
		null,
		true,
		"America/Sao_Paulo",
		null, // context
		true // runOnInit
	);
	console.log("CronJob criado.");
};
startCronJob();
