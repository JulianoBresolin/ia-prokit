"use client";

import ModelIa from "@/components/model-ia";
import { BiImageAdd } from "react-icons/bi";

export default function RestaureImage() {
	return (
		<ModelIa
			title="Restaurar Fotos"
			icon={BiImageAdd}
			apiUrl="/api/image-restauration"
			DescriptionModel="Envie uma foto antiga para restaurar esse modelo custa 30 tokens ou 0,25 centavos por requisição"
		/>
	);
}
