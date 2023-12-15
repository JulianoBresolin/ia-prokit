"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Send, Video } from "lucide-react";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/Loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";
import HelpChatReq from "@/components/help-chat-req";
import { formSchema } from "./constants";

const VideoPage = () => {
	const proModal = useProModal();
	const router = useRouter();
	const [video, setvideo] = useState<string>();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setvideo(undefined);

			const response = await axios.post("/api/video", values);
			console.log(response);

			setvideo(response.data[0]);
			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen();
			} else {
				toast.error("Something went wrong.");
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<div className="flex justify-between gap-4 pr-4">
				<Heading
					title="Gerar Video"
					description="Crie videos interessantes."
					icon={Video}
					iconColor="text-cyan-300"
					bgColor="bg-cyan-300/10"
				/>
				<div>
					<HelpChatReq Service="Video" Value="20" />
				</div>
			</div>

			<div className="px-4 lg:px-8">
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
							name="prompt"
							render={({ field }) => (
								<FormItem className="col-span-12 lg:col-span-10">
									<FormControl className="m-0 p-0">
										<Input
											className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
											disabled={isLoading}
											placeholder="nemo nadando em um rio"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button
							className="col-span-12 lg:col-span-2 w-full"
							type="submit"
							disabled={isLoading}
							size="icon"
						>
							<Send />
						</Button>
					</form>
				</Form>
				{isLoading && (
					<div className="p-20">
						<Loader />
					</div>
				)}
				{!video && !isLoading && <Empty label="Sem videos criados." />}
				{video && (
					<video
						className="w-[50%] aspect-video mt-8 rounded-lg border bg-black "
						controls
					>
						<source src={video} />
					</video>
				)}
			</div>
		</div>
	);
};

export default VideoPage;