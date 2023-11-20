import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/((?!.*\\..*|_next).*)",
		"/",
		"/(api|trpc)(.*)",
		"/",
		"/api/webhook",
		"/dashboard",
		"/api/stripe",
		"/api/defer/helloWorld",
	],
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
