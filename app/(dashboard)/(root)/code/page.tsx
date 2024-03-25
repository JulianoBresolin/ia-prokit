"use client";

import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { BiCodeAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import Heading from "@/components/heading";
import { useProModal } from "@/hooks/use-pro-modal";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import HelpChat from "@/components/help-chat";
import MarkdownResponse from "@/components/markdown-response";
import Empty from "@/components/empyt";

const CodePage = () => {
	const ProModal = useProModal();
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);
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
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);
	const handleClearChat = () => {
		setMessages([]);
	};

	return (
		<>
			<div className="h-[85vh] flex flex-col justify-between overflow-hidden">
				<div>
					<div className="flex bg-[#847375] justify-between gap-4 pr-4 items-center">
						<Heading
							title="Gerar Códigos"
							icon={BiCodeAlt}
							iconColor="text-[#FFD9DF]"
							bgColor="bg-[#8D495A]"
						/>
						<div>
							<HelpChat />
						</div>
					</div>

					{messages.length > 0 && (
						<div className=" text-right w-full   pr-3">
							<Button size="sm" onClick={handleClearChat} variant="default">
								Limpar Chat
							</Button>
						</div>
					)}
				</div>

				<div
					ref={containerRef}
					className=" overflow-y-auto max-h-[85vh] text-white space-y-4 mt-4  pb-32 lg:pb-32 scroll-smooth "
				>
					{messages.length === 0 && <Empty label="como posso ajudar ? " />}

					{messages.map((m) => (
						<div
							key={m.id}
							className={cn(
								"p-8 w-full flex items-start justify-start gap-x-8 rounded-lg",
								m.role === "user"
									? "bg-[#524345] border border-black/10"
									: "bg-[#524345]"
							)}
						>
							{m.role === "user" ? <UserAvatar /> : <BotAvatar />}

							<MarkdownResponse content={m.content} />
						</div>
					))}
				</div>
				<form
					onSubmit={isLoading ? stop : handleSubmit}
					className="
				
					
                rounded-lg 
             
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
								placeholder="Escreva um post para redes sociais..  "
								value={input}
								className="border-0 outline-none bg-[#310937] text-white focus-visible:ring-0 focus-visible:ring-transparent"
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<Button
						variant="Enviar"
						type="submit"
						disabled={!input}
						className="col-span-12 lg:col-span-2 w-full"
					>
						{isLoading ? (
							"Stop"
						) : (
							<div className="flex items-center justify-center gap-2 font-bold text-lg">
								<Send /> Enviar
							</div>
						)}
					</Button>
				</form>
			</div>
		</>
	);
};

export default CodePage;
