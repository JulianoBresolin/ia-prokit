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

export default function HelpChatImage() {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="destructive">Ajuda</Button>
				</DialogTrigger>
				<DialogContent className="max-w-[425px] md:max-w-[625px] lg:max-w-[725px]">
					<DialogHeader>
						<DialogTitle>Informações</DialogTitle>
						<DialogDescription>
							Veja informações de como usar o Chat de criação de imagens e
							também sobre valores. Caso tenha mais dúvidas entre em contato.
						</DialogDescription>
					</DialogHeader>
					<div className="overflow-y-auto max-h-[calc(100vh-400px)] ">
						<section id="como-usar">
							<ol>
								<li>
									<strong>Iniciar uma criação de imagem:</strong> Escreva sua
									solicitação de criação de imagem através do formulário.
									selecione as medidas e a quantidade de imagens que você
									deseja. Clique no botão enviar para interagir com o modelo de
									i.a.
								</li>

								<li>
									<strong>Feedback:</strong> Seja parte do nosso aprimoramento
									contínuo fornecendo feedback. Se encontrar problemas ou tiver
									sugestões, informe-nos.
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
									de tokens para medir o uso do serviço. Cada interação ou
									comando específico consome uma quantidade predeterminada de
									tokens. Cada tamanho de imagem tem um valor de tokens e esse
									valor é multiplicado a quantidade de imagens que você escolhe.
									Com isso gera o valor total de tokens que foi consumido.
								</li>
								<li>
									<strong>Monitoramento de Uso:</strong> Mantenha-se informado
									sobre o consumo de tokens através do menu lateral . Ele mostra
									o valor total de tokens que foi consumido e o valor atual
									gerado pelo consumo.
								</li>
								<li>
									<strong>Valores:</strong>

									<ul>
										<li>256x256: 20 tokens</li>
										<li>512x512: 30 tokens</li>
										<li>1024x1024: 50 tokens</li>
									</ul>
								</li>
								<li>
									<strong>Plano Pro:</strong> Você tem uma assinatura mensal e é
									cobrado o valor do consumo no final do periodo.
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
							<Button type="button" variant="default">
								Fechar
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}