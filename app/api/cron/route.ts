export async function GET() {
	const repo = require("./RepotedUsage.ts");

	await repo.ReportUsageToStripe();

	return new Response("Relatório de uso para o Stripe concluído.");
}
