// api-limit.ts
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
//import { startCronJob } from "@/lib/RepotedUsage";

export const incrementPro = async (totalTokens: number) => {
	const { userId } = auth();

	if (!userId) {
		return;
	}

	const userApi = await prismadb.userSubscription.findUnique({
		where: {
			userId: userId,
		},
	});

	if (userApi) {
		await prismadb.userSubscription.update({
			where: { userId: userId },
			data: {
				stripeCustomerCount: userApi.stripeCustomerCount + totalTokens,
			},
		});

		if (userApi.stripeCustomerCount + totalTokens > 0 && userApi.reported) {
			await prismadb.userSubscription.update({
				where: { userId: userId },
				data: {
					reported: false,
				},
			});
		}

		//startCronJob();
	}

	return 0;
};

export const getApiCountPro = async () => {
	// Obtém o ID do usuário autenticado usando a função "auth()".
	const { userId } = auth();

	// Verifica se o usuário está autenticado. Se não estiver, a função retorna 0.
	if (!userId) {
		return 0;
	}

	// Procura o limite de API atual do usuário no banco de dados.
	const UserApiCountPro = await prismadb.userSubscription.findUnique({
		where: { userId },
	});

	// Se o limite de API do usuário não existe, retorna 0.
	if (!UserApiCountPro) {
		return 0;
	}

	// Caso contrário, retorna o valor atual do contador.
	return UserApiCountPro.stripeCustomerCount;
};
