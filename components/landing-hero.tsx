"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
	const { isSignedIn } = useAuth();

	return (
		<div className="text-white font-bold py-36 text-center space-y-10">
			<div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
				<h1>Seu Kit de Ferramentas de IA! </h1>
				<div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
					<TypewriterComponent
						options={{
							strings: [
								"Chatbot.",
								"Gerar Imagens.",
								"Gerar Vídeos.",
								"Gerar Códigos.",
								"Gerar Musicas.",
								"Restaurar Fotos.",
							],
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</div>
			<div className="space-y-3">
				<div className="text-sm md:text-xl font-light text-white">
					Valor Promocional de Lançamento
				</div>
				<div className="text-sm md:text-xl font-light text-zinc-400">
					Pague por uso, menos de 1 centavo por Token. <br /> Crie conteúdos e
					tenha acesso ao poder da I.A.
				</div>

				<div className="text-zinc-400 text-xs md:text-sm font-normal">
					Não é necessário cartão de crédito para teste.
				</div>
			</div>

			<div>
				<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
					<Button
						variant="premium"
						className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
					>
						Começe Agora
					</Button>
				</Link>
			</div>
		</div>
	);
};
