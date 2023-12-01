"use client";

import { useChat } from "ai/react";
import { Send } from "lucide-react";
import { MessageSquare } from "lucide-react";
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
import { useEffect, useRef } from "react";
const Chat = () => {
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
		api: "/api/conversation",
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
			<div className="h-[83vh] overflow-hidden">
				<div>
					<Heading
						title="Conversação"
						description="O Chat mais avançado de I.A"
						icon={MessageSquare}
						iconColor="text-violet-500"
						bgColor="bg-violet-500/10"
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
									placeholder="Escreva um post para redes sociais..  "
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

				<div
					ref={containerRef}
					className="border-2 overflow-y-auto max-h-[75%] text-black space-y-4 mt-4  pb-32 lg:pb-20 scroll-smooth "
				>
					{messages.length === 0 && <Empty label="Sem Mensagens" />}

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

							<p className="text-sm ">{m.content}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Chat;
