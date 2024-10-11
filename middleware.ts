import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/webhook",
		"/public",
		"/api/edgestore/init",
		"/politica-de-privacidade",
		"/api/cron",
		"/api/replicate-webhook",
		"api/send",
	],
	ignoredRoutes: ["/api/send"],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
