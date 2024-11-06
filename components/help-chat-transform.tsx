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

export default function HelpChatImgTransform() {
	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="destructive">Ajuda</Button>
				</DialogTrigger>
				<DialogContent className="max-w-[425px] text-white  md:max-w-[625px]  lg:max-w-[725px]">
					<DialogHeader>
						<DialogTitle>Informações</DialogTitle>
						<DialogDescription className="text-white/75">
							Veja informações de como usar o Chat de I.A e também sobre
							valores. Caso tenha mais dúvidas entre em contato.
						</DialogDescription>
					</DialogHeader>
					<div className="overflow-y-auto pb-10 max-h-[calc(100vh-400px)] ">
						<section id="como-usar">
							<ol>
								<li>
									<strong>Iniciar uma transformação de imagem :</strong>
									Envie 4 fotos de rosto , pode ser a mesma foto para as 4
									vezes, no formulário escolha um estilo de imagem , você também
									tem a opção de forçar o estilo e gerar até duas fotos
									trasformadas. clique no botão enviar para interagir com o
									modelo de i.a. Aguarde sua imagem ser criada. Você poderá
									clicar no botão de download para baixar a imagem ou escanear o
									qrcode para baixar no celular.
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
									<strong>Valores:</strong>Cada modelo mostra o custo por tokens
									e valores em reais por cada rquisição na tela inical do
									modelo.
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
