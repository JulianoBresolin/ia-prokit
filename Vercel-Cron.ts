import { ReportUsageToStripe } from "./RepotedUsage";

export async function handler() {
	await ReportUsageToStripe();
	return { statusCode: 200 };
}
