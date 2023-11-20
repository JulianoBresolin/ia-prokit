"use Client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { tools } from "@/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProModal({ isPro = false }: { isPro: boolean }) {
	const proModal = useProModal();
	const [loading, setLoading] = useState(false);
	const onSubscribe = async () => {
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
		<>
			<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
							<div className="flex items-center gap-x-2 font-bold text-xl text-center">
								{isPro
									? "Sua Pergunta e Resposta passou do Limite de Requisições Pro. Atualize sua Assinatura"
									: "Sua Pergunta e Resposta passam do Limite de Requisições Grátis . Faça a Assinatura para o plano Pro!"}
							</div>
						</DialogTitle>
						<DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
							{tools.map((tool) => (
								<Card
									key={tool.href}
									className="p-3 border-black/5 flex items-center justify-between"
								>
									<div className="flex items-center gap-x-4">
										<div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
											<tool.icon className={cn("w-6 h-6", tool.color)} />
										</div>
										<div className="font-semibold text-sm">{tool.label}</div>
									</div>
									<Check className="text-primary w-5 h-5" />
								</Card>
							))}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							disabled={loading}
							onClick={onSubscribe}
							size="lg"
							variant={isPro ? "default" : "premium"}
							className="w-full"
						>
							{isPro ? "Gerenciar assinatura" : "Assinar Pro"}
							{!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
