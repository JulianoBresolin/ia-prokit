"use client";

import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import Heading from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";
import Empty from "@/components/empyt";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const CodePage = () => {
	const ProModal = useProModal();
	const router = useRouter();

	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
		stop,
		setMessages,
	} = useChat({
		api: "/api/code",
		onResponse: (error: any) => {
			if (error?.status === 403) {
				ProModal.onOpen();
			}
		},
		onFinish: () => {
			router.refresh();
		},
		onError: () => {
			toast.error("Something went wrong");
		},
	});

	const handleClearChat = () => {
		setMessages([]);
	};

	return (
		<>
			<div className="h-[83vh] overflow-hidden">
				<div>
					<Heading
						title="Geração de Códigos"
						description="O mais avancado e inteligente gerador de Códigos."
						icon={Code}
						iconColor="text-green-700"
						bgColor="bg-green-700/10"
					/>
					<form
						onSubmit={isLoading ? stop : handleSubmit}
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
						<div className="col-span-12 lg:col-span-10">
							<div className="m-0 p-0">
								<Input
									placeholder="Um botão verde com texto 'Clique Aqui' em formato HTML"
									value={input}
									className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<Button
							type="submit"
							disabled={!input}
							className="col-span-12 lg:col-span-2 w-full"
						>
							{isLoading ? "Stop" : <Send />}
						</Button>
					</form>
					{messages.length > 0 && (
						<div className=" text-right w-full   pr-3">
							<Button size="sm" onClick={handleClearChat} variant="outline">
								Limpar Chat
							</Button>
						</div>
					)}
				</div>

				<div className="border-2 overflow-y-auto max-h-[75%] text-black space-y-4 mt-4  pb-32 lg:pb-20 scroll-smooth ">
					{messages.length === 0 && <Empty label="Sem códigos! " />}

					{messages.map((m) => (
						<div
							key={m.id}
							className={cn(
								"p-8 w-full flex items-start justify-start gap-x-8 rounded-lg",
								m.role === "user"
									? "bg-white border border-black/10"
									: "bg-muted"
							)}
						>
							{m.role === "user" ? <UserAvatar /> : <BotAvatar />}
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
								{m.content || " "}
							</ReactMarkdown>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default CodePage;
