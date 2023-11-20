"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";
import { useState, useEffect } from "react";

export const MobileSidebar = ({
	apiLimitCount = 0,
	apiLimitCountReq = 0,
	isPro = false,
}: {
	apiLimitCount: number;
	apiLimitCountReq: number;
	isPro: boolean;
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return (
		<>
			<Sheet>
				<SheetTrigger>
					<Menu className="md:hidden" />
				</SheetTrigger>
				<SheetContent side="left" className="p-0">
					<Sidebar
						isPro={isPro}
						apiLimitCount={apiLimitCount}
						apiLimitCountReq={apiLimitCountReq}
					/>
				</SheetContent>
			</Sheet>
		</>
	);
};
