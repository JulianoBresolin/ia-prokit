"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
	const { isSignedIn } = useAuth();

	return (
		<div className="absolute top-0 left-0 right-0 bottom-0 items-center h-[90vh] z-20 ">
			<div className="text-white px-10 font-bold py-36 text-center space-y-10">
				<div className="text-4xl pt-24 sm:text-5xl md:text-6xl  space-y-5 font-bold">
					<h1>Seu Kit de Ferramentas de IA! </h1>
					<div className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB8C5] to-[#FF4C84]">
						<TypewriterComponent
							options={{
								strings: [
									"Gerar Imagens.",
									"Transforme suas fotos",
									"Restaurar Foto",
									"Colorir fotos PB",
									"Remover fundo",
									"Aumentar Resolução",
								],
								autoStart: true,
								loop: true,
							}}
						/>
					</div>
				</div>
				<div className="space-y-3">
					<div className="text-sm md:text-xl font-normal  text-white">
						Valor Promocional de Lançamento
					</div>
					<div className="text-sm md:text-xl font-bold text-white">
						Pague por uso, menos de 1 centavo por Token. <br /> Crie conteúdos e
						tenha acesso ao poder da I.A.
					</div>

					<div className=" text-white text-xs md:text-lg font-normal ">
						Não é necessário cartão de crédito para teste.
					</div>
				</div>

				<div>
					<Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
						<Button
							variant="premium"
							className="md:text-lg p-4 md:p-6 rounded-full font-semibold shadow-md hover:shadow-fuchsia-600"
						>
							Começe Agora
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
