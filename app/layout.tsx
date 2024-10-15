import "./globals.css";

import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/modal-provider";
import { checkSubscription } from "@/lib/subscription";
import { EdgeStoreProvider } from "@/lib/edgestore";
import dynamic from "next/dynamic";
import { ToasterProvider } from "@/components/toaster-provider";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });
const Clarity = dynamic(() => delay(import("@/components/Clarity")));
const CookieBanner = dynamic(() => delay(import("@/components/cookiebanner")));

function delay(promise: Promise<any>) {
	return new Promise((resolve) => {
		setTimeout(resolve, 7000);
	}).then(() => promise);
}
export const metadata = {
	metadataBase: new URL("https://www.iaprokit.com.br"),
	title: "I.A Prokit",
	description:
		"Desperte a revolução da criatividade com o seu kit de ferramentas de Inteligência Artificial.",

	icon: {
		icon: "/favicon.ico",
	},
	verification: {
		google: "v7AYUFvkjdBCr-hA6JoU93emZegruGdOdw8A0RtpzKc",
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

				<body className={roboto.className}>
					<ModalProvider isPro={isPro} />
					<ToasterProvider />
					<EdgeStoreProvider>{children}</EdgeStoreProvider>
					<CookieBanner />
				</body>
			</html>
		</ClerkProvider>
	);
}
