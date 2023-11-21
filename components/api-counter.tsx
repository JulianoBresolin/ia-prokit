import { Zap } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { MAX_FREE_COUNTS, PRO_PRICE, PRO_PRICE_AFTER_LIMIT } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import numeral from "numeral";
export const ApiCounter = ({
	apiLimitCount = 0,
	apiLimitCountReq = 0,
	isPro = false,
}: {
	apiLimitCount: number;
	apiLimitCountReq: number;
	isPro: boolean;
}) => {
	const proModal = useProModal();
	const [loading, setLoading] = useState(false);
	const ValuePrice =
		apiLimitCount >= 2000
			? apiLimitCount * PRO_PRICE_AFTER_LIMIT // Arredondando para 2 casas decimais
			: apiLimitCount * PRO_PRICE;
	const formattedPrice = numeral(ValuePrice).format("0,0.00");

	const onClick = async () => {
		try {
			setLoading(true);

			const response = await axios.get("/api/stripe");

			window.location.href = response.data.url;
		} catch (error) {
			toast.error("Algo está errado");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="px-3">
			<Card
				className={isPro ? ` bg-violet-950 border-0` : `bg-white/10 border-0`}
			>
				<CardContent className="py-6">
					<div className="text-center text-sm  text-white mb-4 space-y-2">
						<div>
							<p>
								{isPro
									? "tokens Pro"
									: "Limite Plano Grátis até 10 Requisições"}
							</p>
							{!isPro && (
								<p>
									{apiLimitCountReq} / {MAX_FREE_COUNTS}
								</p>
							)}
							{!isPro && (
								<Progress
									className="h-3"
									value={(apiLimitCountReq / MAX_FREE_COUNTS) * 100}
								/>
							)}
							<br />
						</div>
						<div className=" flex justify-between ">
							<div className="flex flex-col p-3  rounded-lg bg-slate-800 ">
								<p>Quant.</p>
								<p>{apiLimitCount}</p>
							</div>
							<div className="flex flex-col p-3  rounded-lg bg-slate-800 ">
								<p>Valor</p>
								<p> R$ {formattedPrice}</p>
							</div>
						</div>
					</div>
					<Button
						disabled={loading}
						onClick={onClick}
						variant={isPro ? "default" : "premium"}
						className="w-full"
					>
						{isPro ? "Gerenciar assinatura" : "Assinar Pro"}
						{!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};
