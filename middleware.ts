import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/api/webhook, /RepotedUsage,/((?!.*\\..*|_next).*)",
		"/",
		"/(api|trpc)",
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)"],
};
