import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import "../globals.css";
import { getApiLimitCountTokens, getApiLimitCountReq } from "@/lib/api-limit";
import { getApiCountPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription";
//import { startCronJob } from "@/lib/Cronjob-Reported";
export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isPro = await checkSubscription();
	let apiLimitCount;
	const apiLimitCountReq = await getApiLimitCountReq();

	if (isPro) {
		apiLimitCount = await getApiCountPro();
	} else {
		apiLimitCount = await getApiLimitCountTokens();
	}
	//startCronJob();
	return (
		<div className="h-full relative">
			<div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
				<Sidebar
					isPro={isPro}
					apiLimitCount={apiLimitCount}
					apiLimitCountReq={apiLimitCountReq}
				/>
			</div>
			<main className="md:pl-72 pb-10">
				<Navbar />
				{children}
			</main>
		</div>
	);
}
