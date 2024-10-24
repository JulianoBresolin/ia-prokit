import * as z from "zod";

export const formSchema = z.object({
	photoStyle: z.string(),
	forceStyle: z.string(),
	amountOptions: z.string(),
	prompt: z.string().min(1, {
		message: "Adicione um texto",
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
			"A realistic, photograph of a person's, with natural lighting and fine detail.",
	},
	{
		value: "Cinematic",
		label: "Cinematográfico",
		src: "/03-cinema.JPG",
		prompt:
			"A portrait of a person with dramatic lighting, lens flare, and a film-like color grade.",
	},
	{
		value: "Disney Charactor",
		label: "Personagem da Disney",
		src: "/toy-disney.JPG",
		prompt: "A cheerful Toy Story-style character",
	},
	{
		value: "Fantasy art",
		label: "Arte fantasia",
		src: "/05-fantasy.JPG",
		prompt:
			"A portrait of a person with magical elements, intricate details, and vibrant colors.",
	},
	{
		value: "Neonpunk",
		label: "Neonpunk",
		src: "/06-neon.JPG",
		prompt:
			"A futuristic portrait of a person with bright neon lights, cybernetic elements, and bold contrasts.",
	},
	{
		value: "Comic book",
		label: "Quadrinhos",
		src: "/08-comic.JPG",
		prompt:
			"A portrait of a person with bold lines, dynamic shading, and vibrant colors.",
	},
	{
		value: "Lowpoly",
		label: "Estilo 3D com poucos polígonos",
		src: "/3d.JPG",
		prompt:
			"A portrait of a person with simple geometric shapes and flat colors.",
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
