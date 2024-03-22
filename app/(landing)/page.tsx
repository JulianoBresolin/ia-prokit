import Background from "@/components/Backgroud";
import { LandingContent } from "@/components/landing-content";
import { LandingPrice } from "@/components/landing-price";
import Faq from "@/components/faq";
import Demo from "@/components/landing-demo";
import { LandingFooter } from "@/components/landing-footer";
import Demopro from "@/components/landing-demo-pro";
import Contato from "@/components/Contato";
import IAcard from "@/components/IAcard";

const LandingPage = () => {
	return (
		<div className="  bg-[#191113]">
			<Background />
			<IAcard />
			<Demo />
			<Demopro />
			<LandingContent />
			<LandingPrice />
			<Faq />
			<Contato />
			<LandingFooter />
		</div>
	);
};

export default LandingPage;
