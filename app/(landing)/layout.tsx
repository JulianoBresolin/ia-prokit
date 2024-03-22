import { LandingNavbar } from "@/components/landing-navbar";
const LandingLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="  bg-[#191113] ">
			<div>
				<LandingNavbar />
				{children}
			</div>
		</main>
	);
};

export default LandingLayout;
