import { ReportUsageToStripe } from "./RepotedUsage";
import { CronJob } from "cron";

export const StartCronJob = () => {
	new CronJob(
		"50 23 * * *", // Expressão cron
		async () => {
			try {
				console.log("Tarefa agendada iniciada.");
				await ReportUsageToStripe();
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
StartCronJob();
