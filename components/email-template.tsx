// ai-saas\ia-prokit\components\email-template.tsx
import * as React from "react";

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
			<a href={imageUrl}>
				<img alt="img" src={imageUrl} width="100" height="100" />
			</a>
		</h1>
	</div>
);
