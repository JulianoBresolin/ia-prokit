import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
	const imageUrl = "https://www.iaprokit.com.br/01-conversacao.jpg";
	try {
		const { data, error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: ["delivered@resend.dev"],
			subject: "Hello world",
			react: EmailTemplate({ firstName: "John", imageUrl }),
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json(data);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}

//curl -X POST https://e702-191-177-138-95.ngrok-free.app/api/send
//curl -X POST http://localhost:3000/api/send
//curl -X POST https://www.iaprokit.com.br/api/send
