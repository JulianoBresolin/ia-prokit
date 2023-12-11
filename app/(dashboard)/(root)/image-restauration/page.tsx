"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageDown, Send, Download } from "lucide-react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";
import { Card, CardFooter } from "@/components/ui/card";

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
		<div>
			<Heading
				title="Restaurar imagens"
				description="Restaure fotos antigas."
				icon={ImageDown}
				iconColor="text-yellow-300"
				bgColor="bg-yellow-300/10"
			/>
			<div className="flex flex-col justify-center items-center gap-4 w-full">
				<SingleImageDropzone
					width={200}
					height={200}
					value={file}
					onChange={handleFileChange}
				/>
				<Button
					size="icon"
					className="w-[200px] bg-blue-500 text-white font-bold py-2 px-4 rounded"
					onClick={handleUpload}
				>
					<Send />
				</Button>
			</div>
			<div>
				{isLoading && (
					<div className="p-20">
						<Loader />
					</div>
				)}
				{!img && !isLoading && <Empty label="Sem imagens geradas." />}
				{img && (
					<div className="flex justify-center pt-6">
						<Card className="rounded-lg overflow-hidden  h-full w-[400px]">
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
									variant="secondary"
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
