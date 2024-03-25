"use client";
import { tools } from "@/constants";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Dashboard() {
	const router = useRouter();
	return (
		<>
			<div>
				<div className="mb-8 space-y-4">
					<h2 className="text-2xl md:text-4xl font-bold text-center">
						Explore o Poder da I.A
					</h2>
					<p className=" font-light text-sm md:text-lg text-center">
						Seja Bem vindo ao seu Portal Mágico de Criatividade!
					</p>
				</div>
				<div className="px-4 md:px-20 lg:px-32 space-y-4">
					{tools.map((tool) => (
						<Card
							onClick={() => router.push(tool.href)}
							key={tool.href}
							className="p-2 bg-[#847375] text-white border-black/5 flex items-center justify-between hover:shadow-md hover:bg-[#9b8f91] transition cursor-pointer"
						>
							<div className="flex items-center gap-x-4">
								<div
									className={cn("p-1 lg:p-2 w-fit rounded-full", tool.bgColor)}
								>
									<tool.icon
										className={cn(" w-5 h-5 md:w-8 md:h-8", tool.color)}
									/>
								</div>
								<div className="font-semibold text-md md:text-lg">
									{tool.label}
								</div>
							</div>
							<ArrowRight className="w-5 h-5" />
						</Card>
					))}
				</div>
			</div>
		</>
	);
}
