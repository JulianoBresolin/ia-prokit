"use client";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import Empty from "@/components/empyt";
import { Loader } from "@/components/Loader";
import UserAvatar from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

export default function Conversation() {
	const [isChatBlocked, setIsChatBlocked] = useState(false);
	// Usando o hook "useProModal" para obter um modal personalizado.
	const ProModal = useProModal();

	// Usando o hook "useRouter" para obter o roteador do Next.js.
	const router = useRouter();

	// Estado para armazenar as mensagens da conversa.
	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

	// Configuração do formulário usando o hook "useForm" do react-hook-form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	// Verifica se o formulário está sendo submetido.
	const isLoading = form.formState.isSubmitting;

	// Função de callback para lidar com o envio do formulário.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			// Cria uma mensagem do usuário com o texto fornecido.
			const userMessage: ChatCompletionMessageParam = {
				role: "user",
				content: values.prompt,
			};

			// Atualiza o array de mensagens com a nova mensagem do usuário.
			const newMessages = [...messages, userMessage];

			// Envia a mensagem do usuário para o servidor.
			const response = await axios.post("/api/conversation", {
				messages: newMessages,
			});

			// Adiciona a mensagem do usuário e a resposta do bot às mensagens.
			setMessages((current) => [...current, userMessage, response.data]);

			// Limpa o formulário.
			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403 || form.formState.isSubmitting) {
				// Abre um modal se o status da resposta for 403 (problema de autorização).
				ProModal.onOpen();
				setIsChatBlocked(true);
			} else {
				// Exibe uma notificação de erro genérico.
				toast.error("Something went wrong");
			}
		} finally {
			// Atualiza a rota (possivelmente para redirecionar após o envio).
			router.refresh();
		}
	};

	return (
		<>
			{/* Componente "Heading" para exibir um cabeçalho de conversa. */}
			<Heading
				title="Conversação"
				description="O Chat mais avançado de I.A"
				icon={MessageSquare}
				iconColor="text-violet-500"
				bgColor="bg-violet-500/10"
			/>

			<div className="px-4 lg:px-8">
				<div>
					{/* Formulário de envio de mensagens. */}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              "
						>
							{/* Campo de entrada de mensagem. */}
							<FormField
								control={form.control}
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												disabled={isChatBlocked}
												placeholder="Escreva um post para redes sociais..  "
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							{/* Botão de envio da mensagem. */}
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								type="submit"
								disabled={isChatBlocked}
								size="icon"
							>
								Enviar Mensagem
							</Button>
						</form>
					</Form>
				</div>

				<div className="space-y-4 mt-4">
					{/* Exibe um indicador de carregamento se o formulário estiver sendo enviado. */}
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}

					{/* Exibe uma mensagem se não houver mensagens na conversa. */}
					{messages.length === 0 && !isLoading && (
						<Empty label="Sem Mensagens" />
					)}

					<div className="flex flex-col-reverse gap-y-4">
						{/* Renderiza as mensagens da conversa. */}
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									"p-8 w-full flex items-start justify-between gap-x-8 rounded-lg",
									message.role === "user"
										? "bg-white border border-black/10"
										: "bg-muted"
								)}
							>
								{/* Exibe um avatar para o usuário ou o bot, dependendo do papel da mensagem. */}
								{message.role === "user" ? <UserAvatar /> : <BotAvatar />}

								{/* Exibe o conteúdo da mensagem. */}
								<p className="text-sm">{message.content}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
