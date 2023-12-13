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

export default function HelpChat() {
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
							Veja informações de como usar o Chat e também sobre valores. Caso
							tenha mais dúvidas entre em contato.
						</DialogDescription>
					</DialogHeader>
					<div className="overflow-y-auto max-h-[calc(100vh-400px)] ">
						<section id="como-usar">
							<ol>
								<li>
									<strong>Iniciar uma Conversa:</strong> Escreva sua Pergunta ou
									tenha uma converça com o modelo de i.a através do formulário.
									Clique no botão enviar para interagir com o modelo de i.a.
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
									tokens. sua pergunta ou interação é somado com a resposta do
									modelo de i.a que gera um total de valores de tokens.
								</li>
								<li>
									<strong>Valores:</strong>

									<ul>
										<li>
											<p>mensagem: &quot;Qual é a capital do Brasil?&quot;</p>
											<p>
												tokens: &quot;Qual&quot;, &quot;é&quot;, &quot;a&quot; ,
												&quot;capital&quot; , &quot;do&quot;,
												&quot;Brasil&quot;.
											</p>
											<p>27 caracteres = 7 tokens</p>
										</li>
										<li>
											<p>
												Resposta: &quot;A capital do Brasil é Brasilia.&quot;
											</p>

											<p>
												tokens: &quot;A&quot;, &quot;capital&quot;,
												&quot;do&quot; , &quot;Brasil&quot; , &quot;é&quot;,
												&quot;Brasilia&quot;.
											</p>
											<p>31 caracteres = 8 tokens</p>
										</li>
										<li>
											<p>Mensagem + Resposta = Valor Total</p>
											<p>7 + 8 = 15 tokens consumidos</p>
										</li>
									</ul>
								</li>

								<li>
									<strong>Monitoramento de Uso:</strong> Mantenha-se informado
									sobre o consumo de tokens através do menu lateral . Ele mostra
									o valor total de tokens que foi consumido e o valor atual
									gerado pelo consumo.
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
