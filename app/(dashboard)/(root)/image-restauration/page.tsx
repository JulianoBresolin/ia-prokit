"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Send, Download } from "lucide-react";
import { BiImageAdd } from "react-icons/bi";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import Empty from "@/components/empyt";
import { useProModal } from "@/hooks/use-pro-modal";
import { Card, CardFooter } from "@/components/ui/card";
import HelpChatImgRest from "@/components/help-chat-img-rest";

export default function RestaureImage() {
	const proModal = useProModal();
	const router = useRouter();
	const [file, setFile] = useState<File>();
	const { edgestore } = useEdgeStore();
	const [Urls, setUrls] = useState<{ url: string }>();
	const [img, setImg] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);

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

				const response = await axios.post("/api/image-restauration", {
					prompt: res.url,
				});

				setImg(response.data);
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
		<div className="h-[85vh]  flex flex-col justify-between overflow-hidden">
			<div className="flex bg-[#847375] justify-between gap-4 pr-4 items-center">
				<Heading
					title="Restaurar Fotos"
					icon={BiImageAdd}
					iconColor="text-[#FFD9DF]"
					bgColor="bg-[#8D495A]"
				/>
				<div>
					<HelpChatImgRest />
				</div>
			</div>

			<div className="pt-8 flex flex-col justify-center items-center gap-4 w-full">
				<SingleImageDropzone
					className="bg-[#310937]"
					width={200}
					height={200}
					value={file}
					onChange={handleFileChange}
					dropzoneOptions={{ maxSize: 1024 * 1024 * 1 }}
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
			<div className=" overflow-y-auto  max-h-[85vh] space-y-4 mt-4   scroll-smooth ">
				{isLoading && (
					<div className="p-20">
						<Loader />
					</div>
				)}
				{!img && !isLoading && (
					<Empty label="Envie uma foto Antiga para Restaurar." />
				)}
				{img && (
					<div className=" flex justify-center pt-6">
						<Card className="rounded-lg  bg-[#310937] overflow-hidden  h-[200px] w-[200px]">
							<div className="relative ">
								<Image
									className="object-contain"
									width={400}
									height={300}
									alt="Generated"
									src={img}
								/>
							</div>
							<CardFooter className="p-2">
								<Button
									onClick={() => window.open(img)}
									variant="default"
									className="w-full"
								>
									<Download className="h-4 w-4 mr-2" />
									Download
								</Button>
							</CardFooter>
						</Card>
					</div>
				)}
			</div>
		</div>
	);
}
