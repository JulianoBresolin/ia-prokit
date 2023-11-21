import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toaster-provider";
import { CrispProvider } from "@/components/crisp-provider";
import { checkSubscription } from "@/lib/subscription";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "IA-Prokit",
	description: "Kit de Ferramentas de IA",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const isPro = await checkSubscription();
	return (
		<ClerkProvider>
			<html lang="en">
				<CrispProvider />
				<body className={inter.className}>
					<ModalProvider isPro={isPro} />
					<ToasterProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
