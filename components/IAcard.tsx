"use client";

import Image from "next/image";
import Link from "next/link";

export const exploreIA = [
	{
		id: "imagem",
		imgUrl: "/03-image.jpg",
		title: "Gerar Imagens",
	},
	{
		id: "Transforme-suas-Fotos",
		imgUrl: "/07-transforme.jpg",
		title: "Transforme suas Fotos",
	},
	{
		id: "restauracao",
		imgUrl: "/04-restauraçao.jpg",
		title: "Restaurar Fotos",
	},
	{
		id: "Remover-fundos",
		imgUrl: "/08-removebg.jpg",
		title: "Remover fundos",
	},

	{
		id: "Colorir-Fotos",
		imgUrl: "/05-animaçao.jpg",
		title: "Colorir Memórias Fotograficas",
	},
	{
		id: "Aumentar-Resolução",
		imgUrl: "/05-animaçao.jpg",
		title: "Aumentar Resolução",
	},
];

export default function IAcard() {
	return (
		<>
			<div className="text-center mt-8  text-white  mb-8">
				<h2 className=" text-4xl font-extrabold mb-3">
					Desperte a Magia da Inovação!
				</h2>
				<h3 className="text-2xl">
					Seu Portal para a Criatividade Ilimitada está Agora Aberto
				</h3>
			</div>
			<div className="mt-[50px] px-[15%]  flex items-center   justify-center md:flex-row flex-col min-h-[70vh] gap-2">
				{exploreIA.map((ia, index) => (
					<div
						key={index}
						className="relative 
					  flex items-center justify-center transition-all duration-1000  flex-1 hover:flex-[2] w-[300px] h-[400px] md:w-[170px]  md:h-[524px] cursor-pointer group"
					>
						<h3 className=" text-lg md:text-2xl  z-10 font-bold md:w-[90%] text-white absolute md:bottom-[8rem]  group-hover:rotate-0 md:rotate-[-90deg] transition-transform">
							{ia.title}
						</h3>
						<Image
							src={ia.imgUrl}
							alt={ia.title}
							width={552}
							height={524}
							className="absolute w-full h-full object-cover md:rounded-[24px] rounded-md hover:opacity-50"
						/>
					</div>
				))}
			</div>
		</>
	);
}
