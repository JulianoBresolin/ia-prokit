import { ReportUsageToStripe } from "@/RepotedUsage";

export const revalidate = 0;
export async function GET() {
	const result = await ReportUsageToStripe();
	console.log("Function executed successfully");
	return Response.json({ result });
}
