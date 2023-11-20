// api-limit.ts
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

// Função para incrementar o contador de tokens usados por um usuário autenticado.
export const incrementApiLimitTokens = async (tokensUsed: number) => {
	// Verifica se o usuário está autenticado. Se não estiver, a função retorna imediatamente.
	const { userId } = auth();
	if (!userId) {
		return;
	}

	// Procura o registro de token usado pelo usuário no banco de dados.
	const userApiLimit = await prismadb.userApiLimit.findUnique({
		where: { userId: userId },
	});

	// Se o registro de token usado pelo usuário já existe, atualiza o contador.
	if (userApiLimit) {
		await prismadb.userApiLimit.update({
			where: { userId: userId },
			data: { count: userApiLimit.count + tokensUsed },
		});
	} else {
		// Se o registro de token usado pelo usuário não existe, cria um novo registro com a quantidade de tokens usados.
		await prismadb.userApiLimit.create({
			data: { userId: userId, count: tokensUsed },
		});
	}
};

// Função para verificar se um usuário atingiu o limite de tokens gratuitos.

export const getApiLimitCountTokens = async () => {
	// Obtém o ID do usuário autenticado usando a função "auth()".
	const { userId } = auth();

	// Verifica se o usuário está autenticado. Se não estiver, a função retorna 0.
	if (!userId) {
		return 0;
	}

	// Procura o limite de API atual do usuário no banco de dados.
	const userApiLimit = await prismadb.userApiLimit.findUnique({
		where: { userId },
	});

	// Se o limite de API do usuário não existe, retorna 0.
	if (!userApiLimit) {
		return 0;
	}

	// Caso contrário, retorna o valor atual do contador.
	return userApiLimit.count;
};

export const incrementApiLimitReq = async () => {
	const { userId } = auth();

	if (!userId) {
		return;
	}

	const userApiLimit = await prismadb.userApiLimit.findUnique({
		where: { userId: userId },
	});

	if (userApiLimit) {
		await prismadb.userApiLimit.update({
			where: { userId: userId },
			data: { countReq: userApiLimit.countReq + 1 },
		});
	} else {
		await prismadb.userApiLimit.create({
			data: { userId: userId, countReq: 1 },
		});
	}
};

export const checkApiLimitReq = async () => {
	const { userId } = auth();

	if (!userId) {
		return false;
	}

	const userApiLimit = await prismadb.userApiLimit.findUnique({
		where: { userId: userId },
	});

	if (!userApiLimit || userApiLimit.countReq < MAX_FREE_COUNTS) {
		return true;
	} else {
		return false;
	}
};

export const getApiLimitCountReq = async () => {
	const { userId } = auth();

	if (!userId) {
		return 0;
	}

	const userApiLimit = await prismadb.userApiLimit.findUnique({
		where: {
			userId,
		},
	});

	if (!userApiLimit) {
		return 0;
	}

	return userApiLimit.countReq;
};

/*export const checkIncrement = async (tokensUsed: number) => {
	// Verifica se o usuário está autenticado. Se não estiver, a função retorna "false".
	const { userId } = auth();
	if (!userId) {
		return false;
	}

	// Procura o registro de token usado pelo usuário no banco de dados.
	const userApiLimit = await prismadb.userApiLimit.findUnique({
		where: { userId: userId },
	});

	if (
		(!userApiLimit && tokensUsed < MAX_FREE_COUNTS) || // Primeira requisição passa se o usuário não tem registro e tokensUsed está dentro do limite gratuito
		(userApiLimit &&
			(userApiLimit.count + tokensUsed < MAX_FREE_COUNTS ||
				userApiLimit.count + tokensUsed / MAX_FREE_COUNTS < 1))
	) {
		return true;
	} else {
		// Caso contrário, retorna "false".
		return false;
	}
};
*/
