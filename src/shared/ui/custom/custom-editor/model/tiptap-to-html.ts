import TextAlign from "@tiptap/extension-text-align";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

import { tryParseTipTapDoc } from "./parse-tiptap-doc";

/** Те же расширения, что у CustomEditor: иначе часть разметки потеряется */
const EDITOR_EXTENSIONS = [
	StarterKit,
	TextAlign.configure({ types: ["heading", "paragraph"] })
];

/** generateHTML вне браузера (XMLSerializer) добавляет xmlns к каждому тегу */
const XMLNS_ATTR = / xmlns="[^"]*"/g;

/**
 * HTML из значения CustomEditor. Редактор хранит JSON-документ tiptap, а
 * бэкенд и превью ждут HTML; уже HTML или обычный текст возвращается как есть
 */
export const tiptapToHtml = (value: string): string => {
	const doc = tryParseTipTapDoc(value);
	return doc
		? generateHTML(doc, EDITOR_EXTENSIONS).replace(XMLNS_ATTR, "")
		: value;
};
