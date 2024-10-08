import { LayoutDashboard } from "lucide-react";
import {
	BiConversation,
	BiCodeAlt,
	BiImage,
	BiImageAdd,
	BiMusic,
	BiCrop,
	BiPalette,
	BiZoomIn,
} from "react-icons/bi";
import { LiaPhotoVideoSolid } from "react-icons/lia";
import { LuSettings } from "react-icons/lu";
import { BsPersonBoundingBox } from "react-icons/bs";

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
		label: "Gerar Imagem",
		icon: BiImage,
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
		href: "/image",
	},
	{
		label: "Transforme suas fotos",
		icon: BsPersonBoundingBox,
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
		href: "/transforme-suas-fotos",
	},
	{
		label: "Restaurar Foto",
		icon: BiImageAdd,
		href: "/image-restauration",
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
	},
	{
		label: "Colorir Memórias Fotograficas",
		icon: BiPalette,
		href: "/image-colors",
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
	},
	{
		label: "Remover fundo",
		icon: BiCrop,
		href: "/image-remove-bg",
		color: "text-[#FFD9DF]",
		bgColor: "bg-[#8D495A]",
	},
	{
		label: "Aumentar Resolução",
		icon: BiZoomIn,
		href: "/image-resolution",
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
