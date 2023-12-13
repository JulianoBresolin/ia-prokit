import { cn } from "@/lib/utils";

interface HeadingProps {
	title: string;
	description: string;
	icon: any;
	iconColor?: string;
	bgColor?: string;
}
export default function Heading({
	title,
	description,
	icon: Icon,
	iconColor,
	bgColor,
}: HeadingProps) {
	return (
		<>
			<div className="px-2 mb-2 lg:px-8 flex items-center gap-x-3 lg:mb-8">
				<div className={cn("p-2 w-fit rounded-full", bgColor)}>
					<Icon className={cn("w-8 h-8", iconColor)} />
				</div>
				<div>
					<h2 className="sm:text-xl md:text-2xl lg:text-3xl font-bold">
						{title}
					</h2>
					<p className="sm:text-xs/4 md:text-sm/4 lg:text-md text-muted-foreground">
						{description}
					</p>
				</div>
			</div>
		</>
	);
}
