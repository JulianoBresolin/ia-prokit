"use client";

import ModelIa from "@/components/model-ia";
import { BiCrop } from "react-icons/bi";

export default function ImageRemoveBg() {
	return (
		<ModelIa
			title="Remover fundo"
			icon={BiCrop}
			apiUrl="/api/image-remove-bg"
			DescriptionModel="Envie uma foto de até 7mb para remover o fundo esse modelo custa 25 tokens ou 0,21 centavos por requisição"
			size={7}
		/>
	);
}
