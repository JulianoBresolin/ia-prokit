import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
	{
		label: "Conversação",
		icon: MessageSquare,
		href: "/conversation",
		color: "text-violet-500",
		bgColor: "bg-violet-500/10",
	},

	{
		label: "Geração de Imagens",
		icon: ImageIcon,
		color: "text-pink-700",
		bgColor: "bg-pink-700/10",
		href: "/image",
	},

	{
		label: "Geração de Códigos",
		icon: Code,
		color: "text-green-700",
		bgColor: "bg-green-700/10",
		href: "/code",
	},
];
