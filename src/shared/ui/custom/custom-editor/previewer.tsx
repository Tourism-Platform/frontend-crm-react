import TextAlign from "@tiptap/extension-text-align";
import { generateHTML } from "@tiptap/html";
import { type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import parse from "html-react-parser";
import { type FC, useMemo } from "react";

interface IPreviewerProps {
	json: JSONContent;
}

export const Previewer: FC<IPreviewerProps> = ({ json }) => {
	const outPut = useMemo(() => {
		return generateHTML(json, [
			StarterKit,
			TextAlign.configure({
				types: ["heading", "paragraph", "bulletList", "orderedList"]
			})
		]);
	}, [json]);

	return (
		<div
			className="prose dark:prose-invert 
  [&_h1]:text-4xl [&_h1]:font-bold
  [&_h2]:text-3xl [&_h2]:font-semibold
  [&_h3]:text-2xl [&_h3]:font-semibold
  [&_h4]:text-xl [&_h4]:font-semibold
  [&_ul]:list-disc [&_ul]:ml-4 
  [&_ol]:list-decimal [&_ol]:ml-4 
  prose-li:marker:text-primary"
		>
			{parse(outPut)}
		</div>
	);
};
