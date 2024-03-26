import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { TbZoomMoney } from "react-icons/tb";
import { BiCreditCardAlt } from "react-icons/bi";

const Descriptions = [
	{
		icondemo: TbZoomMoney,
		title: "Controle de gastos.",
		description:
			"No painel de controle você poderá ter o controle total de uso , onde mostra a quantidade de tokens usados e os valores que foram gastos até o momento.",
	},
	{
		icondemo: BiCreditCardAlt,
		title: "Pague por uso no final de cada período de 30 dias.",
		description:
			"A cada final de um período de 30 dias é faturado os valores totais de uso que são descontados no seu cartão de crédito. Em  Gerenciar Assinatura você poderá ver todas as faturas e ter o controle total dos pagamentos.",
	},
];

export default function Demopro() {
	return (
		<>
			<section className=" flex px-10 lg:px-72 flex-wrap items-center justify-center lg:justify-between  gap-2 space-y-5 mb-36">
				<Card className="w-[400px] text-white bg-transparent border-0">
					<CardHeader>
						<CardTitle className="text-4xl ">
							Como funciona o Plano Pro
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
										<list.icondemo
											style={{
												fontSize: "50px",

												flexShrink: 0,
											}}
											className="rounded-md p-1 "
										/>
									</span>
								</div>
								<div className="pt-2">
									<p className="text-xl text-[#FFD9DF] md:text-3xl font-bold pb-1">
										{list.title}
									</p>
									<p className="text-md md:text-lg">{list.description}</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
				<div className=" shadow-white lg:w-[30rem] ">
					<Image
						className="rounded-lg drop-shadow-[-1px_-1px_15px_rgba(82,23,158,1)]"
						src="/plano-pro.png"
						alt="plano-pro"
						width={515}
						height={587}
					/>
				</div>
			</section>
		</>
	);
}
