import * as z from "zod";

export const formSchema = z.object({
	prompt: z.string().min(1, {
		message: "Prompt is required",
	}),
	amount: z.string().min(1),
	resolution: z.string().min(1),
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
	{
		value: "3",
		label: "3 Fotos",
	},
	{
		value: "4",
		label: "4 Fotos",
	},
];

export const resolutionsOptions = [
	{
		value: "1:1",
		label: "1:1",
	},
	{
		value: "2:3",
		label: "2:3",
	},
	{
		value: "3:2",
		label: "3:2",
	},
	{
		value: "3:4",
		label: "3:4",
	},
	{
		value: "4:3",
		label: "4:3",
	},
	{
		value: "4:5",
		label: "4:5",
	},
	{
		value: "9:16",
		label: "9:16",
	},
	{
		value: "9:21",
		label: "9:21",
	},
	{
		value: "16:9",
		label: "16:9",
	},
	{
		value: "21:9",
		label: "21:9",
	},
];
