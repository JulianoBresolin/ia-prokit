"use client";
import { useState } from "react";
import Image from "next/image";

function ImagerestauRationPage() {
	const [file, setFile] = useState<File>();
	const [restoredImage, setRestoredImage] = useState<string>("");
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file) return;

		try {
			const data = new FormData();
			data.set("file", file);

			const response = await fetch("/api/image-restauration", {
				method: "POST",
				body: data,
			});

			if (!response.ok) throw new Error(await response.text());
			const responseData = await response.json();
			// Supondo que a resposta contenha o URL da imagem restaurada
			const restoredImageUrl = responseData.img;

			setRestoredImage(restoredImageUrl);
		} catch (e: any) {
			console.error(e);
		}
	};
	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					name="file"
					type="file"
					onChange={(e) => setFile(e.target.files?.[0])}
				/>
				<button className="bg-blue-500" type="submit" value="Upload">
					Upload
				</button>
			</form>
			{restoredImage && (
				<div>
					<h2>Imagem Restaurada</h2>
					<Image src={restoredImage} alt="Imagem Restaurada" />
				</div>
			)}
		</>
	);
}

export default ImagerestauRationPage;
