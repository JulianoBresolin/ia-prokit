import { ReportUsageToStripe } from "@/RepotedUsage";

export async function GET() {
	await ReportUsageToStripe();
	console.log("Function executed successfully");
	return new Response("Function executed successfully");
}
