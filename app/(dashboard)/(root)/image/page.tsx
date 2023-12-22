"use client";
import Heading from "@/components/heading";
import { ImageIcon, Download, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOptions, formSchema, resolutionsOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import HelpChatImage from "@/components/help-chat-image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Empty from "@/components/empyt";
import { Loader } from "@/components/Loader";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
export default function Imagepage() {
	const [isChatBlocked, setIsChatBlocked] = useState(false);
	const ProModal = useProModal();
	const router = useRouter();
	const [images, setImages] = useState<string[]>([]);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
			amount: "1",
			resolution: "256x256",
		},
	});

	const isLoading = form.formState.isSubmitting;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setImages([]);
			console.log(values);
			const response = await axios.post("/api/image", values);
			const urls = response.data.map((image: { url: string }) => image.url);

			setImages(urls);
			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403 || form.formState.isSubmitting) {
				// Abre um modal se o status da resposta for 403 (problema de autorização).
				ProModal.onOpen();
				setIsChatBlocked(true);
			} else {
				toast.error("Something went wrong");
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<>
			<div className="flex justify-between gap-4 pr-4">
				<Heading
					title="Gerar Imagens"
					description="Seja criativo e crie imagens extraordinárias."
					icon={ImageIcon}
					iconColor="text-pink-700"
					bgColor="bg-pink-700/10"
				/>
				<div>
					<HelpChatImage />
				</div>
			</div>
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
									<FormItem className="col-span-12 lg:col-span-6">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												disabled={isChatBlocked}
												placeholder="Um astronauta andando a cavalo em estilo fotorrealista."
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-2">
										<Select
											disabled={isChatBlocked}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{amountOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="resolution"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-2">
										<Select
											disabled={isChatBlocked}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{resolutionsOptions.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								type="submit"
								disabled={isChatBlocked}
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
					{images.length === 0 && !isLoading && (
						<Empty label="Sem imagens geradas." />
					)}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
						{images.map((src) => (
							<Card key={src} className="rounded-lg overflow-hidden">
								<div className="relative aspect-square">
									<Image fill alt="Generated" src={src} />
								</div>
								<CardFooter className="p-2">
									<Button
										onClick={() => window.open(src)}
										variant="secondary"
										className="w-full"
									>
										<Download className="h-4 w-4 mr-2" />
										Download
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
