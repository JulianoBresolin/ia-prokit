import Image from "next/image";
import Link from "next/link";
import "../globals.css";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="h-full  bg-[#191113] ">
				<nav className="p-4 z-30 px-10 lg:px-72 relative bg-transparent flex items-center justify-between">
					<Link href="/" className="flex items-center">
						<div className="relative  mr-4">
							<Image
								width={230}
								height={49}
								alt="Logo"
								src="/iaprokit-logo.png"
							/>
						</div>
					</Link>
				</nav>
				<div className="flex items-center justify-center mt-20">{children}</div>
			</div>
		</>
	);
}
