"use client";

import ModelIa from "@/components/model-ia";
import { BiPalette } from "react-icons/bi";

export default function RestaureImageColors() {
	return (
		<ModelIa
			title="Colorir Memórias Fotograficas"
			icon={BiPalette}
			apiUrl="/api/image-restauration-colors"
			DescriptionModel="Envie uma foto de até 7mb para restaurar as cores e dar uma nova vida a elas esse modelo custa 25 tokens ou 0,21 centavos por requisição"
			size={7}
		/>
	);
}
