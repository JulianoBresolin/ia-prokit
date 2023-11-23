import { ReportUsageToStripe } from "../../../RepotedUsage";

export async function handler() {
	await ReportUsageToStripe();
	return { statusCode: 200 };
}

//testes de cron job com vercel
