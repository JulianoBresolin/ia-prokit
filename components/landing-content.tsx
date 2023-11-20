"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
	{
		name: "Manuel",
		avatar: "J",
		title: "Engenheiro de software",
		description: " Este app e muito bom! Também é muito poderoso!",
	},
	{
		name: "Antonio",
		avatar: "A",
		title: "Designer",
		description:
			"Eu uso diariamente para gerar novas fotos para os perfis do istagram que administro.",
	},
	{
		name: "Marcos",
		avatar: "M",
		title: "Marketing",
		description:
			"Este app mudou minha vida,não consigo imaginar trabalhar sem ele!",
	},
	{
		name: "Maria",
		avatar: "M",
		title: "CFO",
		description:
			"O melhor app para gerar conteudo, perfeito para o seu negócios!",
	},
];

export const LandingContent = () => {
	return (
		<div className="px-10 pb-20">
			<h2 className="text-center text-4xl text-white font-extrabold mb-10">
				Testemunhos
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{testimonials.map((item) => (
					<Card
						key={item.description}
						className="bg-[#192339] border-none text-white"
					>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-2">
								<div>
									<p className="text-lg">{item.name}</p>
									<p className="text-zinc-400 text-sm">{item.title}</p>
								</div>
							</CardTitle>
							<CardContent className="pt-4 px-0">
								{item.description}
							</CardContent>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
};
