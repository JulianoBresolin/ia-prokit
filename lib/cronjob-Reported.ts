import { reportUsageToStripe } from "@/lib/RepotedUsage";
import { CronJob } from "cron";

export const startCronJob = () => {
	new CronJob(
		"*/1 * * * *", // Expressão cron
		async () => {
			try {
				console.log("Tarefa agendada iniciada.");
				await reportUsageToStripe();
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
startCronJob();
