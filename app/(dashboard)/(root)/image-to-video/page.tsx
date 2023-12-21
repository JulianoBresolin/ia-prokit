"use client";

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Video, Send } from "lucide-react";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";

import HelpChatImgToVideo from "@/components/help-chat-img-to-video";

export default function ImageToVideo() {
	const proModal = useProModal();
	const router = useRouter();
	const [file, setFile] = useState<File>();
	const { edgestore } = useEdgeStore();
	const [Urls, setUrls] = useState<{ url: string }>();
	const [video, setvideo] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);

	const handleUpload = async () => {
		if (file) {
			try {
				setvideo(undefined);
				setIsLoading(true);
				const res = await edgestore.publicFiles.upload({
					file,
				});

				setUrls({
					url: res.url,
				});

				const response = await axios.post("/api/image-to-video", {
					prompt: res.url,
				});

				setvideo(response.data);
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
			<div className="flex justify-between gap-4 pr-4">
				<Heading
					title="Imagem para Video"
					description="Crie videos interessantes apartir de suas imagens estáticas."
					icon={Video}
					iconColor="text-cyan-300"
					bgColor="bg-cyan-300/10"
				/>
				<div>
					<HelpChatImgToVideo />
				</div>
			</div>

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
				<div className="flex justify-center pt-6">
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
		</div>
	);
}
