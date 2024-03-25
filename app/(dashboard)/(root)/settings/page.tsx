import { LuSettings } from "react-icons/lu";

import Heading from "@/components/heading";
import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
	const isPro = await checkSubscription();

	return (
		<div>
			<div className="flex bg-[#847375] justify-start gap-4 pr-4 items-center">
				<Heading
					title="Configurações"
					icon={LuSettings}
					iconColor="text-[#FFD9DF]"
					bgColor="bg-[#8D495A]"
				/>
			</div>
			<div className="px-4 pt-10 lg:px-8 space-y-4">
				<div className=" text-lg">
					{isPro
						? "Você está atualmente no plano Pro."
						: "Você está atualmente no plano Grátis."}
				</div>
				<SubscriptionButton isPro={isPro} />
			</div>
		</div>
	);
};

export default SettingsPage;
