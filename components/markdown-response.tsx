import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";

interface MarkdownResponseProps {
	content: string;
}

const MarkdownResponse: React.FC<MarkdownResponseProps> = ({ content }) => {
	return (
		<ReactMarkdown
			components={{
				code({ node, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");
					return match ? (
						<SyntaxHighlighter
							{...props}
							style={atomDark}
							wrapLongLines
							language={match[1]}
							PreTag="div"
							ref={null}
						>
							{String(children).replace(/\n$/, "")}
						</SyntaxHighlighter>
					) : (
						<code {...props} className={className}>
							{children}
						</code>
					);
				},
			}}
			className="text-sm overflow-hidden leading-7"
		>
			{content || ""}
		</ReactMarkdown>
	);
};

export default MarkdownResponse;
