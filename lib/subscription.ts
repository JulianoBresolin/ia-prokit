import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
	const { userId } = auth();

	if (!userId) {
		return false;
	}

	const userSubscription = await prismadb.userSubscription.findUnique({
		where: {
			userId: userId,
		},
		select: {
			stripeSubscriptionId: true,
			period_end: true,
			stripeCustomerId: true,
			stripePriceId: true,
		},
	});

	if (!userSubscription) {
		return false;
	}

	const isValid =
		userSubscription.stripePriceId &&
		userSubscription.period_end?.getTime()! + DAY_IN_MS;

	return !!isValid;
};
