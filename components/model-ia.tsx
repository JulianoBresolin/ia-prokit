// components/ImageResolutionPage.tsx
"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Send, Download } from "lucide-react";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import Empty from "@/components/empyt";
import { useProModal } from "@/hooks/use-pro-modal";
import { Card, CardFooter } from "@/components/ui/card";
import HelpChatImgRest from "@/components/help-chat-img-rest";
import { useQRCode } from "next-qrcode";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ModelIa({
	title,
	icon,
	apiUrl,
	DescriptionModel,
	size,
}: {
	title: string;
	icon: React.ComponentType;
	apiUrl: string;
	DescriptionModel: string;
	size: number;
}) {
	const proModal = useProModal();
	const router = useRouter();
	const [file, setFile] = useState<File>();
	const { edgestore } = useEdgeStore();
	const [Urls, setUrls] = useState<{ url: string }>();
	const [img, setImg] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);
	const [predictionStatus, setPredictionStatus] = useState<string>("");
	const { Canvas } = useQRCode();

	const handleUpload = async () => {
		if (file) {
			try {
				setImg(undefined);
				setIsLoading(true);
				const res = await edgestore.publicFiles.upload({
					file,
				});

				setUrls({
					url: res.url,
				});

				const response = await axios.post(apiUrl, {
					prompt: res.url,
				});

				let prediction = response.data;
				setPredictionStatus(prediction.status);

				while (
					prediction.status !== "succeeded" &&
					prediction.status !== "failed"
				) {
					await sleep(5000);
					const statusResponse = await axios.get(`${apiUrl}/${prediction.id}`);
					prediction = statusResponse.data;
					setPredictionStatus(prediction.status);

					if (statusResponse.status !== 200) {
						toast.error("Failed to fetch prediction status.");
						return;
					}
				}

				if (prediction.status === "succeeded") {
					setImg(prediction.output);
				} else {
					toast.error("Prediction failed.");
				}
			} catch (error: any) {
				if (error?.response?.status === 403) {
					proModal.onOpen();
				} else {
					toast.error("Something went wrong.");
				}
			} finally {
				setIsLoading(false);
				router.refresh();
			}
		}
	};

	const handleFileChange = (file?: File) => {
		setFile(file);
	};

	return (
		<div className="h-[90vh] flex flex-col justify-start overflow-hidden gap-4">
			<div
				className={`flex justify-between gap-4 pr-4 items-center  bg-[#847375] `}
			>
				<Heading
					title={title}
					icon={icon}
					iconColor="text-[#FFD9DF]"
					bgColor="bg-[#8D495A]"
				/>
				<div>
					<HelpChatImgRest />
				</div>
			</div>

			<div className="flex flex-col justify-center items-center gap-4 w-full">
				<SingleImageDropzone
					className="bg-[#310937]"
					width={200}
					height={200}
					value={file}
					onChange={handleFileChange}
					dropzoneOptions={{ maxSize: 1024 * 1024 * (size as number) }}
				/>
				<Button
					size="icon"
					variant="Enviar"
					className="w-[200px]"
					onClick={handleUpload}
				>
					<div className="flex items-center justify-center gap-2 font-bold text-lg">
						<Send /> Enviar
					</div>
				</Button>
			</div>
			<div className="overflow-y-auto max-h-[85vh] space-y-4 mt-4 scroll-smooth flex flex-col items-center justify-center">
				{isLoading && (
					<div className="p-20">
						<Loader />
						<p className="text-sm text-white">Status: {predictionStatus}</p>
					</div>
				)}
				{!img && !isLoading && <Empty label={DescriptionModel} />}
				{img && (
					<Card className="rounded-lg bg-[#310937] w-full max-w-md mx-auto">
						<div className="relative aspect-[16/9] w-full">
							<Image
								fill
								alt="Generated"
								src={img}
								className="object-contain"
							/>
						</div>
						<CardFooter className=" grid grid-cols-1 p-4 ">
							<Button
								onClick={() => window.open(img)}
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
											text={img}
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
				)}
			</div>
		</div>
	);
}
