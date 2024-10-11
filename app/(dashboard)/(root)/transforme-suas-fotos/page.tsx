"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Send, Download } from "lucide-react";
import { BsPersonBoundingBox } from "react-icons/bs";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import Empty from "@/components/empyt";
import { useProModal } from "@/hooks/use-pro-modal";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import HelpChatImgRest from "@/components/help-chat-img-rest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { photoStyle, formSchema, forceStyle, amountOptions } from "./constants";

export default function FaceImage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			photoStyle: "Photographic (Default)",
			forceStyle: "15",
			amountOptions: "1",
			prompt: "",
		},
	});
	const proModal = useProModal();
	const router = useRouter();
	const [file1, setFile1] = useState<File>();
	const [file2, setFile2] = useState<File>();
	const [file3, setFile3] = useState<File>();
	const [file4, setFile4] = useState<File>();
	const { edgestore } = useEdgeStore();
	const [Urls, setUrls] = useState<{ url: string }[]>([]);
	const [images, setImages] = useState<string[]>([]);

	const isLoading = form.formState.isSubmitting;
	const uploadImages = async () => {
		const files = [file1, file2, file3, file4].filter(Boolean); // Filtra os arquivos não nulos

		if (!files.length) {
			toast.error("Nenhuma imagem selecionada para upload.");
			return [];
		}

		try {
			const uploadedUrls = await Promise.all(
				files.map(async (file) => {
					if (file) {
						const res = await edgestore.publicFiles.upload({ file });
						return { url: res.url };
					}
					return { url: "" };
				})
			);
			return uploadedUrls;
		} catch (error) {
			toast.error("Erro ao fazer upload das imagens.");
			return [];
		}
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setImages([]); // Limpa as imagens ao começar o upload
			const uploadedUrls = await uploadImages();

			if (!uploadedUrls.length) {
				return; // Se não houver URLs carregadas, sai da função
			}

			setUrls(uploadedUrls);

			// Faz a requisição para a API com os dados do formulário e URLs das imagens carregadas
			const response = await axios.post("/api/transforme-suas-fotos", {
				...values,
				input_images: uploadedUrls.map((file) => file.url),
			});

			// Verifica se a resposta contém um array de URLs de imagens
			if (response.data && Array.isArray(response.data)) {
				setImages(response.data); // Define as URLs das imagens retornadas
			} else {
				toast.error("Nenhuma imagem retornada pela API.");
			}

			form.reset(); // Reseta o formulário após o sucesso
		} catch (error: any) {
			if (error?.response?.status === 403) {
				proModal.onOpen(); // Abre o modal caso haja erro de autorização
			} else {
				toast.error("Algo deu errado.");
			}
		} finally {
			router.refresh();
		}
	};

	const handleFileChange1 = (file?: File) => {
		setFile1(file);
	};

	const handleFileChange2 = (file?: File) => {
		setFile2(file);
	};

	const handleFileChange3 = (file?: File) => {
		setFile3(file);
	};

	const handleFileChange4 = (file?: File) => {
		setFile4(file);
	};

	return (
		<div className="h-auto flex flex-col justify-between rounded-lg text-white">
			<div className="flex bg-[#847375] justify-between gap-4 pr-4 items-center">
				<Heading
					title="Transforme suas Fotos"
					icon={BsPersonBoundingBox}
					iconColor="text-[#FFD9DF]"
					bgColor="bg-[#8D495A]"
				/>
				<div>
					<HelpChatImgRest />
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="rounded-lg 
               
                w-full 
              
                focus-within:shadow-sm
               
                gap-4 "
				>
					<div className=" flex items-center justify-center flex-wrap gap-2 lg:m-2 ">
						<div className="flex items-center justify-center flex-wrap gap-2 ">
							<SingleImageDropzone
								className="bg-[#310937]"
								width={100}
								height={100}
								value={file1}
								onChange={handleFileChange1}
								dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }}
							/>
							<SingleImageDropzone
								className="bg-[#310937]"
								width={100}
								height={100}
								value={file2}
								onChange={handleFileChange2}
								dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }}
							/>
							<SingleImageDropzone
								className="bg-[#310937]"
								width={100}
								height={100}
								value={file3}
								onChange={handleFileChange3}
								dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }}
							/>
							<SingleImageDropzone
								className="bg-[#310937]"
								width={100}
								height={100}
								value={file4}
								onChange={handleFileChange4}
								dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }}
							/>
						</div>
						<div className="  flex items-center justify-center flex-col gap-2 pb-2">
							<FormField
								control={form.control}
								name="photoStyle"
								render={({ field }) => (
									<FormItem className="col-span-12  lg:col-span-2  w-[390px] ">
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger className="w-full h-28 border-0 outline-none bg-[#310937] text-white">
													<SelectValue placeholder="Selecione um estilo de imagem" />
												</SelectTrigger>
											</FormControl>

											<SelectContent className="bg-[#310937] text-white overflow-y-auto h-60 lg:h-80  ">
												{photoStyle.map((option) => (
													<SelectItem key={option.value} value={option.value}>
														<div className=" w-full gap-8 flex flex-row items-center justify-between ">
															<span>
																{" "}
																<Image
																	src={option.src}
																	alt="logo"
																	width={90}
																	height={90}
																/>
															</span>

															<span>{option.label}</span>
														</div>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-2  ">
								<div>
									<FormField
										control={form.control}
										name="forceStyle"
										render={({ field }) => (
											<FormItem className="col-span-12  lg:col-span-2 w-48">
												<Select
													disabled={isLoading}
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="w-full border-0 outline-none bg-[#310937] text-white">
															<SelectValue placeholder="forçar estilo 15X" />
														</SelectTrigger>
													</FormControl>
													<SelectContent className="bg-[#310937] text-white ">
														{forceStyle.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																{option.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div>
									<FormField
										control={form.control}
										name="amountOptions"
										render={({ field }) => (
											<FormItem className="col-span-12 lg:col-span-2 w-48">
												<Select
													disabled={isLoading}
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="w-full border-0 outline-none bg-[#310937] text-white">
															<SelectValue placeholder="1 Imagem" />
														</SelectTrigger>
													</FormControl>
													<SelectContent className="bg-[#310937] text-white ">
														{amountOptions.map((option) => (
															<SelectItem
																key={option.value}
																value={option.value}
															>
																{option.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className=" flex items-center justify-center flex-wrap gap-2 px-4 lg:px-48">
						<FormField
							control={form.control}
							name="prompt"
							render={({ field }) => (
								<FormItem className="flex-grow w-full lg:w-auto">
									<FormControl>
										<Input
											className="w-full border-0 outline-none bg-[#310937] px-2 text-white focus-visible:ring-0 focus-visible:ring-transparent"
											placeholder="o texto funciona melhor em inglês"
											{...field}
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className="w-full  lg:col-span-2 lg:w-40"
							variant="Enviar"
							type="submit"
							size="icon"
							disabled={isLoading}
						>
							<div className="flex items-center justify-center gap-2 font-bold text-lg">
								<Send /> Enviar
							</div>
						</Button>
					</div>
				</form>
			</Form>
			<div className=" max-h-[85vh] space-y-4 mt-4 scroll-smooth">
				{images.length === 0 && !isLoading && (
					<Empty label="Sem Imagens, comece a criar agora mesmo!" />
				)}
				{!images && !isLoading && (
					<Empty label="Envie suas fotos para restaurar." />
				)}

				<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 mx-4">
					{images.map((urls) => (
						<Card
							key={urls}
							className="rounded-lg bg-[#310937] overflow-hidden"
						>
							<div className="relative aspect-square">
								<Image fill alt="Generated" src={urls} />
							</div>
							<CardFooter className="p-2">
								<Button
									onClick={() => window.open(urls)}
									variant="default"
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
	);
}