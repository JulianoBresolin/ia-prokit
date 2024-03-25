import { LayoutDashboard } from "lucide-react";
import {
	BiConversation,
	BiCodeAlt,
	BiImage,
	BiImageAdd,
	BiMusic,
} from "react-icons/bi";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";

export const MAX_FREE_COUNTS = 10;
export const PRO_PRICE = 0.0084;
export const PRO_PRICE_AFTER_LIMIT = 0.0098;

export const tools = [
	{
		label: "Painel Principal",
		icon: LayoutDashboard,
		href: "/dashboard",
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
	},
	{
		label: "Conversação",
		icon: BiConversation,
		href: "/conversation",
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
	},
	{
		label: "Gerar Código",
		icon: BiCodeAlt,
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
		href: "/code",
	},

	{
		label: "Gerar Imagem",
		icon: BiImage,
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
		href: "/image",
	},
	{
		label: "Restaurar Foto",
		icon: BiImageAdd,
		href: "/image-restauration",
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
	},
	{
		label: "Imagem para Video",
		icon: LiaPhotoVideoSolid,
		href: "/image-to-video",
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
	},

	{
		label: "Gerar Musica",
		icon: BiMusic,
		href: "/music",
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
	},

	{
		label: "Configurações",
		icon: LuSettings,
		href: "/settings",
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
	},
];
