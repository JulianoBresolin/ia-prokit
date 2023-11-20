import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { getApiLimitCountTokens, getApiLimitCountReq } from "@/lib/api-limit";
import { getApiCountPro } from "@/lib/api-UsagePro";
import { checkSubscription } from "@/lib/subscription";
export default async function Navbar() {
	const isPro = await checkSubscription();
	let apiLimitCount;
	const apiLimitCountReq = await getApiLimitCountReq();

	if (isPro) {
		apiLimitCount = await getApiCountPro();
	} else {
		apiLimitCount = await getApiLimitCountTokens();
	}
	return (
		<>
			<div className="flex items-center p-4">
				<MobileSidebar
					isPro={isPro}
					apiLimitCount={apiLimitCount}
					apiLimitCountReq={apiLimitCountReq}
				/>
				<div className="flex w-full justify-end">
					<UserButton afterSignOutUrl="/" />
				</div>
			</div>
		</>
	);
}
