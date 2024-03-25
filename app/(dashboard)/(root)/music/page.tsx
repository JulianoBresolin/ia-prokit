"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { BiMusic } from "react-icons/bi";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Loader } from "@/components/Loader";
import Empty from "@/components/empyt";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";
import HelpChatReq from "@/components/help-chat-req";

const MusicPage = () => {
	const proModal = useProModal();
	const router = useRouter();
	const [music, setMusic] = useState("");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const response = await axios.post("/api/music", values);
			console.log(response);

			setMusic(response.data);
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
		<div className="h-[85vh]  flex flex-col justify-between overflow-hidden">
			<div className="flex  bg-[#847375] justify-between gap-4 pr-4 items-center">
				<Heading
					title="Gerar Música"
					icon={BiMusic}
					iconColor="text-[#FFD9DF]"
					bgColor="bg-[#8D495A]"
				/>
				<div>
					<HelpChatReq Service="Música" Value="10" />
				</div>
			</div>
			<div className=" overflow-y-auto max-h-[85vh]  text-white space-y-4 mt-4  pb-32 lg:pb-32 scroll-smooth ">
				<div className="px-4 lg:px-8">
					{isLoading && (
						<div className="p-20">
							<Loader />
						</div>
					)}
					{!music && !isLoading && (
						<Empty label="Sem Música, comece a criar agora mesmo!" />
					)}
					{music && (
						<audio controls className="w-full mt-8">
							<source src={music} />
						</audio>
					)}
				</div>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
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
					<FormField
						name="prompt"
						render={({ field }) => (
							<FormItem className="col-span-12 lg:col-span-10">
								<FormControl className="m-0 p-0">
									<Input
										className="bg-[#310937] px-2 text-white  border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
										disabled={isLoading}
										placeholder="Piano solo com violino"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						className="col-span-12 lg:col-span-2 w-full"
						variant="Enviar"
						type="submit"
						disabled={isLoading}
						size="icon"
					>
						<div className="flex items-center justify-center gap-2 font-bold text-lg">
							<Send /> Enviar
						</div>
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default MusicPage;
