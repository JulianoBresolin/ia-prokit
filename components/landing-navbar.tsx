"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export const LandingNavbar = () => {
	const { isSignedIn } = useAuth();

	return (
		<nav className="p-4 z-30 px-10 lg:px-72 relative bg-transparent flex items-center justify-between">
			<Link href="/" className="flex items-center">
				<div className="relative  mr-4">
					<Image width={230} height={49} alt="Logo" src="/iaprokit-logo.png" />
				</div>
			</Link>
			<div className="flex items-center gap-x-2">
				<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
					<Button
						variant="outline"
						className="rounded-full text-xl font-bold shadow-md text-[#8D495A] hover:bg-slate-200 hover:shadow-fuchsia-600"
					>
						Entrar
					</Button>
				</Link>
			</div>
		</nav>
	);
};
