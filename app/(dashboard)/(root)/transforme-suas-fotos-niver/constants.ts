import * as z from "zod";

export const formSchema = z.object({
	forceStyle: z.string(),

	prompt: z.string().min(1, {
		message: "Adicione um texto",
	}),
});

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
			"A Toy Story character Woody, with a cowboy hat and cheerful expression.",
	},
	{
		value: "Disney Charactor2",
		label: "Jessie",
		src: "/Jessie.JPG",
		prompt:
			"A Toy Story character Jessie, with a cowgirl outfit and a bright smile.",
	},
	{
		value: "Disney Charactor3",
		label: "Buzz Lightyear",
		src: "/buzz.JPG",
		prompt:
			"A Toy Story character Buzz Lightyear, wearing a space suit and heroic pose.",
	},
	{
		value: "Disney Charactor4",
		label: "Bo Peep",
		src: "/bopeep.JPG",
		prompt:
			"A Toy Story character Bo Peep, with her shepherd staff and confident look.",
	},
	{
		value: "Disney Charactor5",
		label: "Mrs. Potato Head",
		src: "/mrspotatohead.JPG",
		prompt:
			"A Toy Story character Mrs. Potato Head, with her wide-brimmed hat, red lips, and friendly expression.",
	},
	{
		value: "Disney Charactor6",
		label: "Barbie",
		src: "/barbie.JPG",
		prompt:
			"A Toy Story character Barbie, with her stylish outfit and playful expression.",
	},
	{
		value: "Disney Charactor6",
		label: "Andy",
		src: "/andy.JPG",
		prompt:
			"A Toy Story character Andy, a young boy with a friendly face, casual clothing, and an enthusiastic expression.",
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
