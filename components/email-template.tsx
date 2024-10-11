// ai-saas\ia-prokit\components\email-template.tsx
import * as React from "react";
import Image from "next/image";
interface EmailTemplateProps {
	firstName: string;
	imageUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	imageUrl,
}) => (
	<div>
		<h1>
			Welcome, {firstName} !
			<Image
				width={200}
				height={200}
				src={imageUrl}
				alt="output"
				sizes="100vw"
			/>
		</h1>
	</div>
);
