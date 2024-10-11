import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/api/webhook",
		"/public",
		"/api/edgestore/init",
		"/politica-de-privacidade",
		"/api/cron",
		"/api/send",
		"/api/replicate-webhook",
		"/api/replicate-webhook-email",
	],
	ignoredRoutes: [
		"/api/send",
		"/api/replicate-webhook",
		"/api/replicate-webhook-email",
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
