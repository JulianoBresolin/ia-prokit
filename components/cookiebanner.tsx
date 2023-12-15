"use client";

import Link from "next/link";
import { hasCookie, setCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function CookieBanner() {
	const [showConsent, setShowConsent] = useState(true);

	useEffect(() => {
		setShowConsent(hasCookie("localConsent"));
	}, []);

	const acceptCookie = () => {
		setShowConsent(true);
		setCookie("localConsent", "true", {});
	};

	if (showConsent) {
		return null;
	}

	return (
		<div
			className={` z-30 my-20 mb-40 lg:mb-10 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 
                        flex px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4 bg-indigo-200 rounded-lg shadow`}
		>
			<div className="text-center bold text-lg text-black hover:text-purple-800">
				<Link href="/politica-de-privacidade">
					<p>Este site usa cookies. Clique aqui para saber mais.</p>
				</Link>
			</div>

			<div className="transitionscreens flex flex-col justify-center items-center gap-2 md:flex-row font-bold">
				<Button
					className="bntPrimaryCookiesAcpt"
					onClick={() => acceptCookie()}
				>
					Aceitar Cookies
				</Button>
			</div>
		</div>
	);
}
