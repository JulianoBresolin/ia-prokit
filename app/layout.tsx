import "./globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toaster-provider";
import { CrispProvider } from "@/components/crisp-provider";
import { checkSubscription } from "@/lib/subscription";
import Clarity from "@/components/Clarity";
import { EdgeStoreProvider } from "@/lib/edgestore";
import CookieBanner from "@/components/cookiebanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	metadataBase: new URL("https://www.iaprokit.com.br"),
	title: "I.A Prokit",
	description:
		"Desperte a revolução da criatividade com o seu kit de ferramentas de Inteligência Artificial.",
	canonical: "/",
	icon: {
		icon: "/favicon.ico",
	},
	verification: {
		google: "Iqyg4JwyPmFqdG3rQUBSisq-92xy-SG2xvbmGaEwYmU",
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		title: "I.A Prokit",
		description:
			"Liberte seu potencial criativo com ferramentas avançadas de Inteligência Artificial. Transforme ideias em realidade!",
		url: "/",
		siteName: "I.A Prokit",
		images: [
			{
				url: "https://www.iaprokit.com.br/og_image.png",
				width: 1200,
				height: 627,
			},
			{
				url: "https://www.iaprokit.com.br/og_image2.png",
				width: 300,
				height: 300,
			},
			{
				url: "https://www.iaprokit.com.br/og_image3.png",
				width: 150,
				height: 150,
			},
		],
	},
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
				<Clarity />
				<CrispProvider />
				<body className={inter.className}>
					<ModalProvider isPro={isPro} />
					<ToasterProvider />
					<EdgeStoreProvider>{children}</EdgeStoreProvider>
					<CookieBanner />
				</body>
			</html>
		</ClerkProvider>
	);
}
