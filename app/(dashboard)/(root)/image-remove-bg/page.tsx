"use client";

import ModelIa from "@/components/model-ia";
import { BiCrop } from "react-icons/bi";

export default function ImageRemoveBg() {
	return (
		<ModelIa
			title="Remover fundo"
			icon={BiCrop}
			apiUrl="/api/image-remove-bg"
			DescriptionModel="Envie uma foto para remover o fundo esse modelo custa 25 tokens ou 0,25 centavos por requisição"
		/>
	);
}
