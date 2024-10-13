import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const Descriptions = [
	{
		number: 1,
		description: "Faça o longin ou crie uma nova conta.",
	},
	{
		number: 2,
		description: "Escolha os modelos de I.A da sua preferência.",
	},
	{
		number: 3,
		description: "No plano Grátis você envia 10 requisições. ",
	},
	{
		number: 4,
		description: "Crie um Plano Pró e pague o que usar.",
	},
];

export default function Demo() {
	return (
		<>
			<section className=" flex px-10 lg:px-72 pt-40 flex-wrap items-center justify-center lg:justify-between  gap-2 space-y-5 mb-36">
				<div>
					<Image
						className="rounded-lg drop-shadow-[-1px_-1px_15px_rgba(82,23,158,1)]"
						src="/como-funciona.png"
						alt="como-funciona"
						width={600}
						height={705}
					/>
				</div>

				<Card className="w-[380px] text-white bg-transparent border-0">
					<CardHeader>
						<CardTitle className="text-4xl ">
							Comece Com Alguns Clicks
						</CardTitle>
					</CardHeader>
					<CardContent>
						{Descriptions.map((list, index) => (
							<div
								key={index}
								className="flex justify-start items-center gap-4 mt-4"
							>
								<div>
									<span className=" flex justify-center items-center text-lg md:text-xl text-[#FFD9DF] font-bold rounded-lg h-12 w-12 bg-[#8D495A]">
										{list.number}
									</span>
								</div>
								<div>
									<p className="text-lg md:text-xl ">{list.description}</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			</section>
		</>
	);
}
