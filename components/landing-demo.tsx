import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const Descriptions = [
	{
		description:
			"Transforme sua visão em realidade com nossa IA de criação de imagens. De retratos cativantes a paisagens deslumbrantes, o poder da expressão visual está em suas mãos.",
	},
	{
		description:
			"Codificação simplificada para desbloquear o potencial ilimitado da tecnologia. De algoritmos inteligentes a websites dinâmicos, crie o futuro com nossas ferramentas de programação intuitivas.",
	},
	{
		description:
			"Explore novos horizontes musicais com nossa IA de criação de músicas. De trilhas sonoras envolventes a batidas inovadoras, liberte sua criatividade musical.",
	},
	{
		description:
			"Dê vida às suas histórias com vídeos extraordinários. Da concepção à produção, transforme suas ideias em filmes cativantes com a ajuda da nossa IA especializada.",
	},
	{
		description:
			"Descubra o fascinante mundo da comunicação automatizada. De assistentes virtuais a chatbots personalizados, a IA está aqui para simplificar e aprimorar suas interações.",
	},
	{
		description:
			"Reviva momentos preciosos através da restauração de fotos antigas. Deixe que nossa tecnologia avançada traga de volta a vitalidade às suas lembranças mais queridas.",
	},
];

export default function Demo() {
	return (
		<>
			<section className=" flex px-10 flex-wrap items-center justify-between gap-2 space-y-5 mb-36">
				<div className=" shadow-white ">
					<Image
						className="rounded-lg drop-shadow-[-1px_-1px_15px_rgba(82,23,158,1)]"
						src="/preview.jpg"
						alt="demo"
						width={576}
						height={634}
					/>
				</div>

				<Card className="w-[600px] text-white bg-transparent border-0">
					<CardHeader className="text-center">
						<CardTitle className="text-3xl ">
							Desperte a Magia da Inovação!
						</CardTitle>
						<CardDescription className="text-lg">
							Seu Portal para a Criatividade Ilimitada está Agora Aberto
						</CardDescription>
					</CardHeader>
					<CardContent>
						{Descriptions.map((list, index) => (
							<div
								key={index}
								className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
							>
								<span className="relative flex h-3 w-3">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
								</span>
								<div className=" space-y-1/4">
									<p className="text-sm ">{list.description}</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</section>
		</>
	);
}
