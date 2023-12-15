import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
	return (
		<>
			<div className="text-white space-y-5 pb-36 px-10 ">
				<h1 className="text-4xl font-bold text-center">Perguntas Frequentes</h1>
				<Accordion type="single" collapsible className="w-full">
					<AccordionItem value="item-1">
						<AccordionTrigger>Como funciona?</AccordionTrigger>
						<AccordionContent>
							Você faz o cadastro e pode usar até um limite de até 10
							requisições sem precisar adicionar cartão de crédito ou fazer
							pagamento. Depois que atingir o limite de 10 requisições, o
							sistema vai bloquear o acesso para usar os modelos. Você pode
							fazer a inscrição para o plano Pro , no plano Pro o acesso é
							liberado e você paga por uso de tokens.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>O que é token?</AccordionTrigger>
						<AccordionContent>
							Tokens de uso do chat de modelo de IA são unidades de significado
							no texto que são usadas para representar as mensagens trocadas
							entre o usuário e o modelo. Eles permitem que o modelo entenda e
							responda às suas mensagens, bem como rastreie o histórico da
							conversa. Quando você envia uma mensagem, ela é dividida em tokens
							pelo modelo. O modelo então usa esses tokens para entender a
							mensagem e gerar uma resposta. Por exemplo, se você enviar a
							mensagem &quot;Qual é a capital do Brasil?&quot;, os tokens seriam
							&quot;Qual&quot;, &quot;é&quot;, &quot;a&quot; ,
							&quot;capital&quot; , &quot;do&quot;, &quot;Brasil&quot;. O modelo
							então entenderia que você está perguntando qual é a capital do
							Brasil e geraria uma resposta como &quot;A capital do Brasil é
							Brasília&quot;. Cada token da pergunta gera um valor que é somado
							a resposta pelo modelo de i.a com isso você obtem o total de
							tokens que usou.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>
							Funciona no celular e no tablet?
						</AccordionTrigger>
						<AccordionContent>
							Sim você pode utilizar o site no seu smartphone ou tablet como no
							seu computador. basta fazer o login e selecionar o modelo de i.a
							que desejar.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4">
						<AccordionTrigger>Quais profissionais podem usar?</AccordionTrigger>
						<AccordionContent>
							Todos os profissionois podem usar. Os modelos de i.a são um dos
							mais avançados do mercado atual.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-5">
						<AccordionTrigger>Tem garantia?</AccordionTrigger>
						<AccordionContent>
							Não tem garantia de uso e as respostas dos modelos de i.a podem
							não ser 100% precisas. Mas devido aos avanços tecnológicos, a cada
							atualização as respostas dos modelos de i.a tem se tornado mais
							precisas e acertivas.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	);
}
