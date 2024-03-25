"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { tools } from "@/constants";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ApiCounter } from "@/components/api-counter";

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
			<div className="space-y-4 py-4 flex flex-col h-full bg-[#310937] text-white">
				<div className="px-3 py-2 flex-1">
					<Link className="flex items-center pl-3 mb-14" href="/dashboard">
						<div className="relative  mr-4">
							<Image
								width={230}
								height={49}
								alt="Logo"
								src="/iaprokit-logo.png"
								priority
								className="w-[200px] lg:w-[230px]"
							/>
						</div>
					</Link>
					<div className=" overflow-y-auto max-h-[calc(100vh-400px)] md:overflow-hidden">
						<div className="space-y-1 ">
							{tools.map((route, index) => (
								<Link
									key={index}
									href={route.href}
									className={cn(
										"text-sm group flex p-2 lg:p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-{#8D495A} rounded-lg transition",
										pathname === route.href
											? "text-white bg-[#8D495A]"
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
