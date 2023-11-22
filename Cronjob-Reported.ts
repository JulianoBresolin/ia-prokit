import { CronJob } from "cron";

export const StartCronJob = () => {
	new CronJob(
		"*/5 * * * *", // Expressão cron
		async () => {
			try {
				console.log("Tarefa agendada iniciada.");
			} catch (error) {
				console.error("Erro na tarefa agendada:", error);
			}
		},
		null,
		true,
		"America/Sao_Paulo",
		null, // context
		true // runOnInit
	);
	console.log("CronJob criado.");
};
