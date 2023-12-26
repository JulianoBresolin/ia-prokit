"use client";

import Link from "next/link";

import { FacebookIcon, InstagramIcon } from "lucide-react";

export const LandingFooter = () => {
	return (
		<footer className="p-4 pb-16 bg-transparent gap-2 flex items-center justify-start">
			<Link
				target="_blank"
				href="https://www.facebook.com/profile.php?id=61554635802528"
				className="flex items-center"
			>
				<FacebookIcon className="w-8 h-8  text-blue-500 hover:text-white " />
			</Link>
			<Link
				target="_blank"
				href="https://www.instagram.com/iaprokit?igsh=eTRscjg4ZWZ1YXkz"
				className="flex items-center"
			>
				<InstagramIcon className="w-8 h-8  text-blue-500 hover:text-white " />
			</Link>

			<p className="text-slate-400 pl-3">
				© 2023 IAPROKIT. Todos os direitos reservados.
			</p>
		</footer>
	);
};
