"use client";

import Link from "next/link";

import { FacebookIcon, InstagramIcon, Youtube } from "lucide-react";

export const LandingFooter = () => {
	return (
		<footer className="p-4 px-10 lg:px-72 pb-16 bg-transparent gap-2 flex items-center justify-end">
			<p className=" text-white pl-3">
				© 2023 IAPROKIT. Todos os direitos reservados.
			</p>
			<Link
				target="_blank"
				href="https://www.facebook.com/profile.php?id=61554635802528"
				className="flex items-center"
			>
				<FacebookIcon className="w-8 h-8  text-[#8D495A] hover:text-white " />
			</Link>
			<Link
				target="_blank"
				href="https://www.instagram.com/iaprokit?igsh=eTRscjg4ZWZ1YXkz"
				className="flex items-center"
			>
				<InstagramIcon className="w-8 h-8  text-[#8D495A] hover:text-white " />
			</Link>
			<Link
				target="_blank"
				href="https://www.youtube.com/@iaprokit"
				className="flex items-center"
			>
				<Youtube className="w-10 h-10  text-[#8D495A] hover:text-white " />
			</Link>
		</footer>
	);
};
