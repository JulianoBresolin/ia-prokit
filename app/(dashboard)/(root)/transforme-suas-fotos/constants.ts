import * as z from "zod";

export const formSchema = z.object({
	photoStyle: z.string(),
	forceStyle: z.string(),
	amountOptions: z.string(),

	prompt: z.string().min(1, {
		message: "Insira exatamente 4 fotos de rosto e Adicione um texto",
	}),
});

export const amountOptions = [
	{
		value: "1",
		label: "1 Foto",
	},
	{
		value: "2",
		label: "2 Fotos",
	},
];

export const photoStyle = [
	{
		value: "Photographic (Default)",
		label: "Fotográfico",
		src: "/02-foto.JPG",
		prompt:
			"Uma fotografia realista de uma pessoa, com iluminação natural e detalhes finos.",
	},
	{
		value: "Cinematic",
		label: "Cinematográfico",
		src: "/03-cinema.JPG",
		prompt:
			"Um retrato de uma pessoa com iluminação dramática, reflexos de lente e um estilo de cor de filme.",
	},
	{
		value: "Disney Charactor",
		label: "Personagem da Disney",
		src: "/toy-disney.JPG",
		prompt: "Um personagem alegre no estilo Toy Story.",
	},
	{
		value: "Fantasy art",
		label: "Arte fantasia",
		src: "/05-fantasy.JPG",
		prompt:
			"Um retrato de uma pessoa com elementos mágicos, detalhes intrincados e cores vibrantes.",
	},
	{
		value: "Neonpunk",
		label: "Neonpunk",
		src: "/06-neon.JPG",
		prompt:
			"Um retrato futurista de uma pessoa com luzes neon brilhantes, elementos cibernéticos e contrastes fortes.",
	},
	{
		value: "Comic book",
		label: "Quadrinhos",
		src: "/08-comic.JPG",
		prompt:
			"Um retrato de uma pessoa com linhas marcantes, sombreamento dinâmico e cores vibrantes.",
	},
	{
		value: "Lowpoly",
		label: "Estilo 3D com poucos polígonos",
		src: "/3d.JPG",
		prompt:
			"Um retrato de uma pessoa com formas geométricas simples e cores chapadas.",
	},
];

export const forceStyle = [
	{
		value: "15",
		label: "Forçar Estilo 15x",
	},
	{
		value: "20",
		label: "Forçar Estilo 20x",
	},
	{
		value: "25",
		label: "Forçar Estilo 25x",
	},
	{
		value: "30",
		label: "Forçar Estilo 30x",
	},
	{
		value: "35",
		label: "Forçar Estilo 35x",
	},
	{
		value: "40",
		label: "Forçar Estilo 40x",
	},
	{
		value: "45",
		label: "Forçar Estilo 45x",
	},
	{
		value: "50",
		label: "Forçar Estilo 50x",
	},
];
