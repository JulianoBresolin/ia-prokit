import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";

import { Youtube } from "lucide-react";

export default function HelpChat() {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="destructive">Ajuda</Button>
				</DialogTrigger>
				<DialogContent className="max-w-[425px] text-white md:max-w-[625px] lg:max-w-[725px]">
					<DialogHeader>
						<DialogTitle>Informações</DialogTitle>
						<DialogDescription className="text-white/75">
							Veja informações de como usar o Chat de I.A e também sobre
							valores. Caso tenha mais dúvidas entre em contato.
						</DialogDescription>
					</DialogHeader>
					<div className="overflow-y-auto max-h-[calc(100vh-400px)] ">
						<section id="como-usar">
							<ol>
								<li>
									<strong>Como utilizar o modelo de I.A :</strong>
									Envie uma foto através do formulario e clique no botão enviar
									para interagir com o modelo de i.a. Aguarde um instante o
									processamento. Você poderá fazer o download ou escanear o
									qrcode após a resposta do modelo de i.a ficar pronta. você
									também pode ver nossos videos no canal do youtube:
									<Link
										target="_blank"
										href="https://www.youtube.com/@iaprokit"
										className="flex items-center"
									>
										<Youtube className="w-8 h-8  text-white hover:text-[#470e1d] " />
									</Link>
								</li>
								<li>
									<strong>Erros:</strong> Caso tenha algum problema ou erro na
									resposta do modelo de i.a. , aguarde alguns instantes e tente
									novamente, se persistir o erro entre em contato. Você também
									pode tentar atualizar a página antes de tentar uma nova
									requisição.
								</li>
								<li>
									<strong>Feedback:</strong> Seja parte do nosso aprimoramento
									contínuo fornecendo feedback. Se encontrar problemas ou tiver
									alguma sugestão, por favor, informe-nos.
								</li>
							</ol>
						</section>
						<br />
						<section id="cobranca">
							<h3>
								<strong> Forma de Cobrança por Uso de Token:</strong>
							</h3>
							<br />
							<ol>
								<li>
									<strong>Tokens:</strong> Nossa plataforma utiliza um sistema
									de tokens para medir o uso do serviço. Cada solicitação do
									formulário consome uma quantidade de tokens.
								</li>
								<li>
									<strong>Monitoramento de Uso:</strong> Mantenha-se informado
									sobre o consumo de tokens através do menu lateral . Ele mostra
									o total de tokens consumidos e o saldo atual resultante do
									consumo.
								</li>
								<li>
									<strong>Valores:</strong>Na tela inicial de cada modelo mostra
									o custo por tokens e o valor em reais por cada requisição.
								</li>
								<li>
									<strong>Plano Pro:</strong> Você tem uma assinatura mensal e é
									cobrado o valor do consumo no final do período.
								</li>
							</ol>
						</section>

						<footer>
							<p>
								Estamos comprometidos em fornecer uma experiência de chat com IA
								intuitiva e acessível. Se surgirem dúvidas, nossa equipe de
								suporte está disponível para ajudar a qualquer momento.
								Aproveite suas interações!
							</p>
						</footer>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button type="button" variant="outline">
								Fechar
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
