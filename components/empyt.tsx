import Image from "next/image";

interface EmpytProps {
	label: string;
}

export default function Empty({ label }: EmpytProps) {
	return (
		<>
			<div className="h-full flex flex-col items-center justify-center">
				<div className="relative max-w-full h-48 w-48">
					<Image src="/empty.png" fill alt="Empty" />
				</div>
				<p className="text-white/70 text-md text-center">{label}</p>
			</div>
		</>
	);
}
