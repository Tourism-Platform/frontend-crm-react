"use client";

import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { type ControllerRenderProps, type FieldValues } from "react-hook-form";

import { MenuBar } from "./ui";

export interface ICustomEditorProps<T extends FieldValues> {
	field: ControllerRenderProps<T>;
	defaultValue?: string;
}

export const CustomEditor = <T extends FieldValues>({
	field,
	defaultValue
}: ICustomEditorProps<T>) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({ types: ["heading", "paragraph"] })
		],

		editorProps: {
			attributes: {
				class: "flex-1 overflow-auto min-h-[290px] p-4 rounded-t-lg [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 w-full   [&_h1]:text-4xl [&_h1]:font-bold  [&_h2]:text-3xl [&_h2]:font-semibold    [&_h3]:text-2xl [&_h3]:font-semibold  [&_h4]:text-xl [&_h4]:font-semibold"
			}
		},

		content: field?.value
			? JSON.parse(field?.value)
			: `<p>${defaultValue || ""}</p>`,
		onUpdate: ({ editor }) => {
			const text = JSON.stringify(editor?.getJSON());
			field.onChange(text);
		},

		immediatelyRender: false
	});

	return (
		<div className="w-full border border-input rounded-lg overflow-hidden dark:bg-input/30 min-h-[340px] flex flex-col  h-full">
			<div className="flex-1 overflow-auto">
				<EditorContent editor={editor} />
			</div>

			<MenuBar editor={editor} />
		</div>
	);
};
