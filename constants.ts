import { Code, ImageIcon, MessageSquare } from "lucide-react";

export const MAX_FREE_COUNTS = 2;
export const PRO_PRICE = 0.0054;
export const PRO_PRICE_AFTER_LIMIT = 0.0098;

export const tools = [
	{
		label: "Conversation",
		icon: MessageSquare,
		href: "/conversation",
		color: "text-violet-500",
		bgColor: "bg-violet-500/10",
	},

	{
		label: "Image Generation",
		icon: ImageIcon,
		color: "text-pink-700",
		bgColor: "bg-pink-700/10",
		href: "/image",
	},

	{
		label: "Code Generation",
		icon: Code,
		color: "text-green-700",
		bgColor: "bg-green-700/10",
		href: "/code",
	},
];
