"use client";
import Heading from "@/components/heading";
import { Download, Send } from "lucide-react";
import { BiImage } from "react-icons/bi";
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
import { useQRCode } from "next-qrcode";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Imagepage() {
	const ProModal = useProModal();
	const router = useRouter();
	const [images, setImages] = useState<string[]>([]);
	const [predictionStatus, setPredictionStatus] = useState<string>("");
	const { Canvas } = useQRCode();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: "",
			amount: "1",
			resolution: "1:1",
		},
	});

	const isLoading = form.formState.isSubmitting;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setImages([]);
			console.log(values);
			const response = await axios.post("/api/image", values);
			// Verifique se a resposta contém um array de imagens
			// Verifica se 'output' existe e contém URLs
			let prediction = response.data;
			setPredictionStatus(prediction.status);
			while (
				prediction.status !== "succeeded" &&
				prediction.status !== "failed"
			) {
				await sleep(5000);
				const statusResponse = await axios.get(`/api/image/${prediction.id}`);
				prediction = statusResponse.data;
				setPredictionStatus(prediction.status);

				if (statusResponse.status !== 200) {
					toast.error("Failed to fetch prediction status.");
					return;
				}
			}

			if (prediction.status === "succeeded") {
				const urls = prediction.output.map((url: string) => url); // Mapeia todas as URLs
				setImages(urls); // Define todas as URLs das imagens no estado
			} else {
				toast.error("Nenhuma imagem retornada pela API.");
			}
			form.reset();
		} catch (error: any) {
			if (error?.response?.status === 403) {
				// Abre um modal se o status da resposta for 403 (problema de autorização).
				ProModal.onOpen();
			} else {
				toast.error("Something went wrong");
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<>
			<div className="h-[90vh] flex flex-col justify-between overflow-hidden">
				<div>
					<div className="flex bg-[#847375] justify-between gap-4 pr-4 items-center">
						<Heading
							title="Gerar Imagens"
							icon={BiImage}
							iconColor="text-[#FFD9DF]"
							bgColor="bg-[#8D495A]"
						/>
						<div>
							<HelpChatImage />
						</div>
					</div>
				</div>

				<div className=" overflow-y-auto max-h-[85vh]  text-white space-y-4 mt-4   scroll-smooth ">
					{isLoading && (
						<div className="p-20 flex flex-col gap-4 items-center justify-center">
							<Loader />
							<p className="text-sm text-white">Status: {predictionStatus}</p>
						</div>
					)}
					{images.length === 0 && !isLoading && (
						<Empty label="Comece a criar iamgens surpreendentes esse modelo custa 50 tokens ou 0,42 centavos por requisição" />
					)}
					<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
						{images.map((urls) => (
							<Card
								key={urls}
								className="rounded-lg bg-[#310937] overflow-hidden"
							>
								<div className="relative aspect-square">
									<Image fill alt="Generated" src={urls} />
								</div>
								<CardFooter className=" grid grid-cols-1 p-4 ">
									<Button
										onClick={() => window.open(urls)}
										variant="default"
										className="w-full"
									>
										<Download className="h-4 w-4 mr-2" />
										Download
									</Button>
									<Accordion type="single" collapsible className="w-full">
										<AccordionItem value="item-1">
											<AccordionTrigger className="text-white text-sm">
												Download com QRcode
											</AccordionTrigger>
											<AccordionContent className="flex justify-center">
												<Canvas
													text={urls}
													options={{
														errorCorrectionLevel: "H",
														quality: 1,
														margin: 1,
														scale: 4,
														width: 80,
													}}
												/>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</CardFooter>
							</Card>
						))}
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
							control={form.control}
							name="prompt"
							render={({ field }) => (
								<FormItem className=" col-span-12 lg:col-span-6">
									<FormControl className="m-0 p-0">
										<Input
											className="border-0 outline-none 
												bg-[#310937] px-2 text-white focus-visible:ring-0 focus-visible:ring-transparent"
											disabled={isLoading}
											placeholder="um gato segurando uma placa que diz olá mundo"
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
								<FormItem className="col-span-12  lg:col-span-2 ">
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-[#310937] text-white ">
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-[#310937] text-white ">
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
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="bg-[#310937] text-white ">
												<SelectValue defaultValue={field.value} />
											</SelectTrigger>
										</FormControl>
										<SelectContent className="bg-[#310937] text-white ">
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
		</>
	);
}
