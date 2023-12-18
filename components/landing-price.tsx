"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const Plans = [
	{
		plano: "Gratis",
		title: "Use até 10x",
		price: "R$ 0,00",
		description: " Use um limite de até 10 requisições de forma gratuita.",
	},
	{
		plano: "Assinatura Plano Pro ",
		title: "Pague por uso Mensal",
		price: "R$ 0,0054",
		priceB: "R$ 0,0098",
		description:
			"Promoção de Lançamento. Page por uso. Gaste até onde você quiser. A cada final de mês você paga a fatura do total de tokens que usou. ",
		descriptionPriceA: "Até 2000 tokens.",
		descriptionPriceB: "Acima de 2000 tokens.",
	},
];

export const LandingPrice = () => {
	const { isSignedIn } = useAuth();
	return (
		<div className="px-10 space-y-5 mb-36">
			<h2 className="text-center text-4xl text-white font-extrabold mb-10">
				Planos
			</h2>
			<div className="flex flex-wrap gap-4 h-full justify-center items-center  ">
				{Plans.map((item) => (
					<Card
						key={item.description}
						className="bg-white h-[28rem] w-80 flex flex-col justify-between items-center border-none text-slate-800 text-center"
					>
						<CardHeader>
							<CardTitle className="flex justify-center items-center gap-x-1">
								<div>
									<p className="text-2xl">{item.plano}</p>

									<p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-lg">
										{item.title}
									</p>
									<br />
									<p className="text-zinc-900 text-4xl">{item.price}</p>
									<p className=" text-sm">{item.descriptionPriceA}</p>
									<p className="text-zinc-900 text-4xl">{item.priceB}</p>
									<p className=" text-sm">{item.descriptionPriceB}</p>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent className="flex pt-4  ">
							<div className="flex items-start">
								<span className="flex flex-shrink-0 h-2 w-2 translate-y-1 rounded-full bg-sky-500  " />
								<p className="leading-5">{item.description}</p>
							</div>
						</CardContent>

						<CardFooter>
							<Button
								disabled
								variant="default"
								className="rounded-full w-full font-semibold"
							>
								Comece Agora
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};
