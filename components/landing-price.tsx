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
import { FaCheckCircle } from "react-icons/fa";

const Plans = [
	{
		plano: "Plano Grátis ",
		title: "Use até 10 vezes",
		price: "R$ 0,00",
		iconPg: FaCheckCircle,
		descriptions: [
			"Use um limite de até 10 requisições de forma gratuita.",
			"Conversação com I.A",
			"Gerar Códigos",
			"Gerar Imagens",
			"Restauração de Fotos",
			"Imagem para Animação",
			"Gerar Música",
		],
	},
];
const PlansPro = [
	{
		plano: "Plano Pro ",
		title: "Pagamento por uso mensal",
		price: "R$ 0,0084",
		aboutPrice: "Até 2000 tokens.",
		priceB: "R$ 0,0098",
		aboutPriceB: "Acima de 2000 tokens.",
		iconPg: FaCheckCircle,
		descriptionsB: [
			"Sem Limite de uso.",
			"Conversação com I.A",
			"Gerar Códigos",
			"Gerar Imagens",
			"Restauração de Fotos",
			"Imagem para Animação",
			"Gerar Música",
		],
	},
];

export const LandingPrice = () => {
	const { isSignedIn } = useAuth();
	return (
		<div className="px-10 space-y-5 mb-36">
			<h2 className="text-center text-4xl text-white font-extrabold mb-20">
				Planos
			</h2>
			<div className="flex flex-wrap gap-4 h-full justify-center items-center">
				{Plans.map((item, index) => (
					<Card
						key={index}
						className={`bg-[#FFD9DF] h-[40rem] w-80 flex flex-col justify-between items-center border-none`}
					>
						<CardHeader>
							<CardTitle className="flex justify-center items-center gap-x-1">
								<div>
									<p className="text-5xl text-[#75565C]">{item.plano}</p>
									<p className=" text-lg">{item.title}</p>
									<br />
									<p className="text-zinc-900 text-6xl">{item.price}</p>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex gap-2 flex-col text-md items-start">
								{item.descriptions.map((description, index) => (
									<div
										key={index}
										className=" flex gap-2 items-start justify-center"
									>
										<item.iconPg
											className="fill-[#8D495A]"
											style={{
												fontSize: "30px",

												flexShrink: 0,
											}}
										/>
										<p>{description}</p>
									</div>
								))}
							</div>
						</CardContent>
						<CardFooter>
							<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
								<Button
									variant="default"
									size="lg"
									className="rounded-full w-full font-semibold"
								>
									Começar Agora
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
				{PlansPro.map((item, index) => (
					<Card
						key={index}
						className={`bg-[#75565C] h-[40rem] w-80 text-white flex flex-col justify-between items-center border-none`}
					>
						<CardHeader>
							<CardTitle className="flex justify-center items-center gap-x-1 ">
								<div>
									<p className="text-5xl text-[#FFD9DF]">{item.plano}</p>
									<p className=" text-lg">{item.title}</p>
									<br />
									<p className=" text-5xl">{item.price}</p>
									<p className="text-sm">{item.aboutPrice}</p>
									<p className="text-5xl">{item.priceB}</p>
									<p className="text-sm">{item.aboutPriceB}</p>
								</div>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex gap-2 flex-col text-md items-start">
								{item.descriptionsB.map((descriptionB, index) => (
									<div
										key={index}
										className=" flex gap-2 items-start justify-center"
									>
										<item.iconPg
											className="fill-[#FFD9DF]"
											style={{
												fontSize: "30px",

												flexShrink: 0,
											}}
										/>
										<p>{descriptionB}</p>
									</div>
								))}
							</div>
						</CardContent>
						<CardFooter>
							<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
								<Button
									variant="outline"
									size="lg"
									className="rounded-full w-full text-black font-semibold"
								>
									Começar Agora
								</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};
