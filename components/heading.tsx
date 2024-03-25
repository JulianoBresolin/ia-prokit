import { cn } from "@/lib/utils";

interface HeadingProps {
	title: string;

	icon: any;
	iconColor?: string;
	bgColor?: string;
}
export default function Heading({
	title,

	icon: Icon,
	iconColor,
	bgColor,
}: HeadingProps) {
	return (
		<>
			<div className="px-2 py-2  lg:px-8 flex justify-center items-center gap-x-3 ">
				<div className={cn("p-2 w-fit rounded-full", bgColor)}>
					<Icon className={cn("w-8 h-8", iconColor)} />
				</div>
				<div>
					<h2 className="sm:text-xl md:text-2xl lg:text-3xl font-bold">
						{title}
					</h2>
				</div>
			</div>
		</>
	);
}
