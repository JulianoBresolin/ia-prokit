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
		label: "Fotográfico feminino",
		src: "/natal/photo-fem.png",
		prompt:
			"Uma fotografia realista de uma mulher, com iluminação suave de luzes natalinas, vestindo roupas típicas de Natal e segurando uma xícara de chocolate quente ao lado de uma árvore de Natal iluminada.",
	},
	{
		value: "Photographic (Default)",
		label: "Fotográfico masculino",
		src: "/natal/photo-men.png",
		prompt:
			"Uma fotografia realista de um homem, com iluminação quente, vestindo um suéter de Natal ao lado de uma lareira decorada com guirlandas e luzes.",
	},
	{
		value: "Cinematic",
		label: "Cinematográfico feminino",
		src: "/natal/cinema-fem.png",
		prompt:
			"Um retrato de uma mulher com iluminação dramática, segurando um globo de neve mágico em um cenário cinematográfico com neve caindo e tons quentes de Natal.",
	},
	{
		value: "Cinematic",
		label: "Cinematográfico masculino",
		src: "/natal/cinema-men.png",
		prompt:
			"Uma fotografia de um homem com reflexos de lente e iluminação de cinema,vestindo um suéter vermelho sentado em um trenó decorado com presentes e luzes natalinas brilhando ao fundo.",
	},
	{
		value: "Disney Charactor",
		label: "Personagem da Disney feminino",
		src: "/natal/disney-fem.png",
		prompt:
			"Elsa, de Frozen, em um deslumbrante vestido azul e branco decorado com flocos de neve, cercada por uma paisagem congelada mágica com luzes natalinas brilhando ao fundo.",
	},
	{
		value: "Disney Charactor",
		label: "Personagem da Disney masculino",
		src: "/natal/disney-men.png",
		prompt:
			"Um carismático Papai Noel, com seu traje vermelho clássico, cercado por renas animadas e um saco cheio de presentes, pronto para celebrar o Natal com um toque mágico.",
	},
	{
		value: "Fantasy art",
		label: "Arte fantasia feminino",
		src: "/natal/fantasy-fem.png",
		prompt:
			"Um retrato de uma mulher no estilo fantasia, vestida como uma rainha natalina, cercada por flocos de neve mágicos e luzes cintilantes.",
	},
	{
		value: "Fantasy art",
		label: "Arte fantasia masculino",
		src: "/natal/fantasy-men.png",
		prompt:
			"Um retrato de um homem no estilo fantasia, como um guardião das estrelas de Natal, com detalhes mágicos e uma aurora boreal ao fundo.",
	},
	{
		value: "Neonpunk",
		label: "Neonpunk feminino",
		src: "/natal/neon-fem.png",
		prompt:
			"Um retrato futurista de uma mulher, com cabelo brilhante e enfeites neon, segurando uma estrela de Natal em um cenário cyberpunk iluminado com luzes vermelhas e verdes.",
	},
	{
		value: "Neonpunk",
		label: "Neonpunk masculino",
		src: "/natal/neon-men.png",
		prompt:
			"Um retrato futurista de um homem, com  uma jaqueta estilizada com luzes neon, em um mercado natalino cyberpunk cheio de cores vibrantes.",
	},
	{
		value: "Comic book",
		label: "Quadrinhos feminino",
		src: "/natal/comic-fem.png",
		prompt:
			"Um retrato de uma mulher em estilo de quadrinhos, decorando uma árvore de Natal com expressões dinâmicas e luzes piscando ao fundo.",
	},
	{
		value: "Comic book",
		label: "Quadrinhos masculino",
		src: "/natal/comic-men.png",
		prompt:
			"Um retrato de um homem em estilo de quadrinhos, vestido como Papai Noel, em um cenário animado de Natal.",
	},
	{
		value: "Lowpoly",
		label: "Estilo 3D feminino",
		src: "/natal/3d-fem.png",
		prompt:
			"Um retrato estilizado de uma mulher em 3D com poucos polígonos, vestindo um gorro de Natal e segurando um presente em um cenário de neve geométrica.",
	},
	{
		value: "Lowpoly",
		label: "Estilo 3D masculino",
		src: "/natal/3d-men.png",
		prompt:
			"Um retrato estilizado de um homem em 3D com poucos polígonos, segurando uma bengala doce em um cenário de Natal com formas geométricas de árvores e estrelas.",
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
