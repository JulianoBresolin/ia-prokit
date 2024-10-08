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
		value: "(No style)", //ok
		label: "Sem estilo",
		src: "/01-nostyle.JPG",
	},
	{
		value: "Photographic (Default)", // ok
		label: "Fotográfico",
		src: "/02-foto.JPG",
	},
	{
		value: "Cinematic", //ok
		label: "Cinematográfico",
		src: "/03-cinema.JPG",
	},
	{
		value: "Disney Charactor", // ok
		label: "Personagem da Disney",
		src: "/04-disney.JPG",
	},
	{
		value: "Fantasy art", //ok
		label: "Arte fantasia",
		src: "/05-fantasy.JPG",
	},
	{
		value: "Neonpunk", // ok
		label: "Neonpunk",
		src: "/06-neon.JPG",
	},
	{
		value: "Enhance", //ok
		label: "Melhorar",
		src: "/07-enhance.JPG",
	},
	{
		value: "Comic book", //ok
		label: "Quadrinhos",
		src: "/08-comic.JPG",
	},
	{
		value: "Lowpoly", //ok
		label: "Estilo 3D com poucos polígonos",
		src: "/3d.JPG",
	},
	{
		value: "Line art", //ok
		label: "Linhas",
		src: "/09-lines.JPG",
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
