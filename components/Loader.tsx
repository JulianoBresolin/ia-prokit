import Image from "next/image";

export const Loader = () => {
	return (
		<div className="h-full flex flex-col gap-y-4 items-center justify-center">
			<div className=" relative animate-spin">
				<Image alt="Loader" src="/loader2.png" width={60} height={40} />
			</div>
			<p className="text-sm text-muted-foreground">Processando...</p>
		</div>
	);
};
