import Image from "next/image";

export const Loader = () => {
	return (
		<div className="h-full flex flex-col gap-y-4 items-center justify-center">
			<div className=" relative animate-bounce">
				<Image alt="Loader" src="/Loader.png" width={60} height={86} />
			</div>
			<p className="text-sm text-muted-foreground">Processando...</p>
		</div>
	);
};
