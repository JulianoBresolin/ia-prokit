import * as z from "zod";

export const formSchema = z.object({
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
		value: "Escolha um Estilo",
		label: "Escolha um Estilo",
		src: "/toy-disney.JPG",
		prompt: "",
	},
	{
		value: "Disney Charactor1",
		label: "Woody",
		src: "/woody.JPG",
		prompt:
			"A Toy Story character resembling Woody, with a cowboy hat and cheerful expression.",
	},
	{
		value: "Disney Charactor2",
		label: "Jessie",
		src: "/jessie.JPG",
		prompt:
			"A Toy Story character resembling Jessie, with a cowgirl outfit and a bright smile.",
	},
	{
		value: "Disney Charactor3",
		label: "Buzz Lightyear",
		src: "/buzz.JPG",
		prompt:
			"A Toy Story character resembling Buzz Lightyear, wearing a space suit and heroic pose.",
	},
	{
		value: "Disney Charactor4",
		label: "Bo Peep",
		src: "/bopeep.JPG",
		prompt:
			"A Toy Story character resembling Bo Peep, with her shepherd staff and confident look.",
	},
	{
		value: "Disney Charactor5",
		label: "Rex",
		src: "/rex.JPG",
		prompt:
			"A Toy Story character resembling Rex, with a friendly dinosaur face and curious expression.",
	},
	{
		value: "Disney Charactor6",
		label: "Barbie",
		src: "/barbie.JPG",
		prompt:
			"A Toy Story character resembling Barbie, with her stylish outfit and playful expression.",
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
