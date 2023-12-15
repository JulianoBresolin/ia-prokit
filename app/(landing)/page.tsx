import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/landing-hero";
import { LandingContent } from "@/components/landing-content";
import { LandingPrice } from "@/components/landing-price";
import Faq from "@/components/faq";
import Demo from "@/components/landing-demo";

const LandingPage = () => {
	return (
		<div className="h-full ">
			<LandingNavbar />
			<LandingHero />
			<Demo />
			<LandingContent />
			<LandingPrice />
			<Faq />
		</div>
	);
};

export default LandingPage;
