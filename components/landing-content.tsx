"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
	{
		name: "Manuel",
		avatar: "M",
		title: "Engenheiro de software",
		description: "Este app é muito bom! Também é muito poderoso!",
	},
	{
		name: "Antonio",
		avatar: "A",
		title: "Designer",
		description:
			"Eu uso diariamente para gerar novas imagens para os perfis do Instagram que administro.",
	},
	{
		name: "Marcos",
		avatar: "M",
		title: "Marketing",
		description:
			"Este app mudou minha vida, não consigo imaginar trabalhar sem ele!",
	},
	{
		name: "Maria",
		avatar: "M",
		title: "Redes Sociais",
		description:
			"O melhor app para gerar conteúdo, perfeito para o seu negócio!",
	},
	{
		name: "Renata",
		avatar: "R",
		title: "Social Media Manager",
		description:
			"Eu recomendo este aplicativo para todos os meus clientes. Simplifica muito o processo de criação de conteúdo para redes sociais.",
	},
	{
		name: "Bruno",
		avatar: "B",
		title: "Designer Gráfico",
		description:
			"Como designer, encontrar ferramentas que combinam eficiência e qualidade é essencial. Este aplicativo superou minhas expectativas!",
	},
	{
		name: "Carla",
		avatar: "C",
		title: "Empresária",
		description:
			"Utilizo esse app para criar campanhas publicitárias de forma rápida e eficaz. Economizo tempo e recursos, o que é crucial para o sucesso do meu negócio.",
	},
	{
		name: "Pedro",
		avatar: "P",
		title: "Estudante de Marketing",
		description:
			"Como estudante de marketing, estou constantemente buscando ferramentas que me ajudem a criar conteúdo envolvente. Este aplicativo se tornou indispensável para mim.",
	},
];

export const LandingContent = () => {
	return (
		<div className=" px-10 lg:px-72 space-y-5 mb-36">
			<h2 className="text-center text-4xl text-white font-extrabold mb-10">
				Testemunhos
			</h2>
			<div className="flex  flex-wrap gap-4 items-center justify-center ">
				{testimonials.map((item) => (
					<Card
						key={item.description}
						className="bg-[#75565C] w-[18rem] h-[18rem] border-none text-white"
					>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-2">
								<div>
									<p className="text-lg">{item.name}</p>
									<p className="text-[#FFD9DF] text-sm">{item.title}</p>
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
