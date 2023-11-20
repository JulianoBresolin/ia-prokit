"use client";
import Heading from "@/components/heading";
import { Code } from "lucide-react";
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
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
export default function CodePage() {
	const [isChatBlocked, setIsChatBlocked] = useState(false);
	const ProModal = useProModal();
	const router = useRouter();
	const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionMessageParam = {
				role: "user",
				content: values.prompt,
			};
			const newMessages = [...messages, userMessage];
			const response = await axios.post("/api/code", {
				messages: newMessages,
			});
			setMessages((current) => [...current, userMessage, response.data]);

			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403 || form.formState.isSubmitting) {
				// Abre um modal se o status da resposta for 403 (problema de autorização).
				ProModal.onOpen();
				setIsChatBlocked(true);
			} else {
				toast.error("Something went wrong.");
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<>
			<Heading
				title="Geração de Códigos"
				description="O mais avancado e inteligente gerador de Códigos."
				icon={Code}
				iconColor="text-green-700"
				bgColor="bg-green-700/10"
			/>
			<div className="px-4 lg:px-8">
				<div>
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
							<FormField
								control={form.control}
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												disabled={isChatBlocked}
												placeholder="Um botão verde com texto 'Clique Aqui' em formato HTML"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								type="submit"
								disabled={isChatBlocked}
								size="icon"
							>
								Gerar Código
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
							<Loader />
						</div>
					)}
					{messages.length === 0 && !isLoading && (
						<Empty label="Sem códigos! " />
					)}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									"p-8 w-full flex items-start gap-x-8 rounded-lg",
									message.role === "user"
										? "bg-white border border-black/10"
										: "bg-muted"
								)}
							>
								{message.role === "user" ? <UserAvatar /> : <BotAvatar />}
								<ReactMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div className="overflow-auto w-full my-2 text-green-900 bg-white p-2 rounded-lg">
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code
												className="text-white bg-green-900 rounded-lg p-1"
												{...props}
											/>
										),
									}}
									className=" text-sm overflow-hidden leading-7"
								>
									{message.content || " "}
								</ReactMarkdown>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
