import {
	Code,
	ImageDown,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	Music,
	Settings,
	Video,
} from "lucide-react";

export const MAX_FREE_COUNTS = 10;
export const PRO_PRICE = 0.0054;
export const PRO_PRICE_AFTER_LIMIT = 0.0098;

export const tools = [
	{
		label: "Painel Principal",
		icon: LayoutDashboard,
		href: "/dashboard",
		color: "text-sky-500",
		bgColor: "bg-violet-500/10",
	},
	{
		label: "Conversação",
		icon: MessageSquare,
		href: "/conversation",
		color: "text-violet-500",
		bgColor: "bg-violet-500/10",
	},

	{
		label: "Gerar Imagem",
		icon: ImageIcon,
		color: "text-pink-700",
		bgColor: "bg-pink-700/10",
		href: "/image",
	},

	{
		label: "Gerar Código",
		icon: Code,
		color: "text-green-700",
		bgColor: "bg-green-700/10",
		href: "/code",
	},
	{
		label: "Gerar Musica",
		icon: Music,
		href: "/music",
		color: "text-orange-500",
		bgColor: "bg-orange-500/10",
	},
	{
		label: "Gerar Video",
		icon: Video,
		href: "/video",
		color: "text-cyan-300",
		bgColor: "bg-cyan-300/10",
	},
	{
		label: "Restaurar Foto",
		icon: ImageDown,
		href: "/image-restauration",
		color: "text-yellow-300",
		bgColor: "bg-yellow-300/10",
	},
	{
		label: "Configurações",
		icon: Settings,
		href: "/settings",
		color: "text-gray-300",
		bgColor: "bg-gray-300/10",
	},
];
