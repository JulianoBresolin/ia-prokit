"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ApiCounter } from "@/components/api-counter";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

export const Sidebar = ({
	apiLimitCount = 0,
	apiLimitCountReq = 0,
	isPro = false,
}: {
	apiLimitCount: number;
	apiLimitCountReq: number;
	isPro: boolean;
}) => {
	const pathname = usePathname();
	return (
		<>
			<div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
				<div className="px-3 py-2 flex-1">
					<Link className="flex items-center pl-3 mb-14" href="/dashboard">
						<div className="relative  mr-4">
							<Image width={230} height={98} alt="Logo" src="/Logo.png" />
						</div>
					</Link>
					<div className="space-y-1">
						{tools.map((route, index) => (
							<Link
								key={index}
								href={route.href}
								className={cn(
									"text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
									pathname === route.href
										? "text-white bg-white/10"
										: "text-zinc-400"
								)}
							>
								<div className="flex items-center flex-1">
									<route.icon className={cn("h-5 w-5 mr-3", route.color)} />
									{route.label}
								</div>
							</Link>
						))}
					</div>
				</div>
				<ApiCounter
					isPro={isPro}
					apiLimitCount={apiLimitCount}
					apiLimitCountReq={apiLimitCountReq}
				/>
			</div>
		</>
	);
};
