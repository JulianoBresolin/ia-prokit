"use client";

import ModelIa from "@/components/model-ia";
import { BiZoomIn } from "react-icons/bi";

export default function RestaureImageResolution() {
	return (
		<ModelIa
			title="Aumentar Resolução"
			icon={BiZoomIn}
			apiUrl="/api/image-resolution"
			DescriptionModel="Envie uma foto antiga para restaurar esse modelo custa 25 tokens ou 0,25 centavos por requisição"
		/>
	);
}
