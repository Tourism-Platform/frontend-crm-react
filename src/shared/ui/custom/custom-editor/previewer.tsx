import TextAlign from "@tiptap/extension-text-align";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import parse from "html-react-parser";
import { type FC, useMemo } from "react";

import { cn } from "@/shared/lib";

import {
	plainTextToTipTapDoc,
	resolveTipTapDoc
} from "./model/parse-tiptap-doc";

const extensions = [
	StarterKit,
	TextAlign.configure({
		types: ["heading", "paragraph", "bulletList", "orderedList"]
	})
];

interface IPreviewerProps {
	text?: string | null;
	className?: string;
}

const parseTipTapHtml = (value: string): string => {
	let html: string;

	try {
		html = generateHTML(resolveTipTapDoc(value), extensions);
	} catch {
		html = generateHTML(plainTextToTipTapDoc(value), extensions);
	}

	// generateHTML (XMLSerializer) emits empty <p></p> / <p xmlns="..."></p>
	// without <br>, which collapse under Tailwind Preflight.
	return html.replace(/<p(\s[^>]*)?><\/p>/g, "<p$1><br /></p>");
};

export const Previewer: FC<IPreviewerProps> = ({ text, className }) => {
	const outPut = useMemo(() => {
		if (!text?.trim()) return null;
		return parseTipTapHtml(text);
	}, [text]);

	if (!outPut) return null;

	return (
		<div
			className={cn(
				"[&_h1]:text-4xl",
				"[&_h1]:font-bold",
				"[&_h2]:text-3xl",
				"[&_h2]:font-semibold",
				"[&_h3]:text-2xl",
				"[&_h3]:font-semibold",
				"[&_h4]:text-xl",
				"[&_h4]:font-semibold",
				"[&_ul]:list-disc",
				"[&_ul]:ml-4",
				"[&_ul]:my-2",
				"[&_ol]:list-decimal",
				"[&_ol]:ml-4",
				"[&_ol]:my-2",
				"[&_li]:my-0.5",
				className
			)}
		>
			{parse(outPut)}
		</div>
	);
};
