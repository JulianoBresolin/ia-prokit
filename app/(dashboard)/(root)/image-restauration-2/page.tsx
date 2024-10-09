"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";

// Função para criar um delay com tipagem
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Definição do tipo para o objeto Prediction
interface Prediction {
	id: string;
	status: string;
	output?: string[];
	detail?: string;
}

export default function ImageRestauration2() {
	const [prediction, setPrediction] = useState<Prediction | null>(null);
	const [error, setError] = useState<string | null>(null);
	const promptInputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (promptInputRef.current) {
			promptInputRef.current.focus();
		}
	}, []);

	// Tipagem para o evento de submissão
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null); // Resetando o erro ao submeter novamente

		const form = e.currentTarget;
		const promptValue = form.prompt.value;

		const response = await fetch("/api/predictions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: promptValue,
			}),
		});

		let prediction: Prediction = await response.json();

		if (response.status !== 201) {
			setError(prediction.detail || "An error occurred");
			return;
		}

		setPrediction(prediction);

		// Verifica status da predição enquanto ela está em andamento
		while (
			prediction.status !== "succeeded" &&
			prediction.status !== "failed"
		) {
			await sleep(1000);

			const statusResponse = await fetch(`/api/predictions/${prediction.id}`);
			prediction = await statusResponse.json();

			if (statusResponse.status !== 200) {
				setError(
					prediction.detail || "An error occurred while updating status"
				);
				return;
			}

			console.log({ prediction });
			setPrediction(prediction);
		}
	};

	return (
		<div className="container max-w-2xl mx-auto p-5">
			<h1 className="py-6 text-center font-bold text-2xl">
				Dream something with{" "}
			</h1>

			<form className="w-full flex" onSubmit={handleSubmit}>
				<input
					type="text"
					className="flex-grow"
					name="prompt"
					placeholder="Enter a prompt to display an image"
					ref={promptInputRef}
				/>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
				>
					Go!
				</button>
			</form>

			{error && <div className="text-red-500">{error}</div>}

			{prediction && (
				<>
					{prediction.output && (
						<div className="image-wrapper mt-5">
							<Image
								width={200}
								height={200}
								src={prediction.output[prediction.output.length - 1]}
								alt="output"
								sizes="100vw"
							/>
						</div>
					)}
					<p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
				</>
			)}
		</div>
	);
}
