"use client";

import ModelIa from "@/components/model-ia";
import { BiZoomIn } from "react-icons/bi";

export default function RestaureImageResolution() {
	return (
		<ModelIa
			title="Aumentar Resolução"
			icon={BiZoomIn}
			apiUrl="/api/image-resolution"
			DescriptionModel="Envie uma foto de até 1mb para aumentar a resolução esse modelo custa 25 tokens ou 0,21 centavos por requisição"
			size={1}
		/>
	);
}
