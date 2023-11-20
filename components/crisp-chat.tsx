"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
	useEffect(() => {
		Crisp.configure("7bc3a03a-cd3b-41cf-9446-69122f7d65ed");
	}, []);

	return null;
};
