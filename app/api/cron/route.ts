import { ReportUsageToStripe } from "../../../RepotedUsage";
export async function GET() {
	await ReportUsageToStripe();

	return new Response("Relatório de uso para o Stripe concluído.");
}
