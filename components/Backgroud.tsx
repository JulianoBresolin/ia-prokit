"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LandingHero } from "./landing-hero";
import bga from "./../public/fundo.png";
import bgafix from "./../public/background-image.png";

export default function Background() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: any) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	const parallaxStylea = {
		transform: `translate(${-mousePosition.x * 0.02}px, ${
			-mousePosition.y * 0.02
		}px)`,
	};

	const parallaxStyleb = {
		transform: `translate(${mousePosition.x * 0.02}px, ${
			mousePosition.y * 0.02
		}px)`,
	};

	return (
		<div className="parallax-container flex justify-center items-center w-[95%] h-[90vh] ">
			<LandingHero />
			<div
				className="hidden absolute z-10 parallax-content  md:flex justify-center items-center opacity-60 md:opacity-60  "
				style={parallaxStylea}
			>
				<Image
					src={"/icones-img-1.png"}
					width={1243}
					height={586}
					alt="background-a"
					quality={90}
					className="object-cover"
				/>
			</div>
			<div
				className=" hidden parallax-content md:flex justify-center items-center opacity-60"
				style={parallaxStyleb}
			>
				<Image
					src={bga}
					width={1330}
					height={819}
					alt="background-b"
					quality={90}
					placeholder="blur"
					className="object-cover"
					priority
				/>
			</div>
			<div
				id="background"
				className="z-10  opacity-50  w-[80vw] h-auto  md:hidden"
			>
				<Image
					src={bgafix}
					fill={true}
					alt="background"
					quality={100}
					placeholder="blur"
					className="object-cover"
				/>
			</div>
		</div>
	);
}
