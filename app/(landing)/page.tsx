import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";
import { LandingPrice } from "@/components/landing-price";

const LandingPage = () => {
	return (
		<div className="h-full ">
			<LandingNavbar />
			<LandingHero />
			<LandingContent />
			<LandingPrice />
		</div>
	);
};

export default LandingPage;
