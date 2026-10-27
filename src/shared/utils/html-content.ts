const HTML_TAG_REGEXP = /<[a-z][\s\S]*>/i;

const HTML_ESCAPE_MAP: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;"
};

export const escapeHtml = (value: string): string =>
	value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char] ?? char);

export const isHtmlContent = (value: string): boolean =>
	HTML_TAG_REGEXP.test(value);

/** Пусто, если после удаления тегов не осталось текста и нет картинок */
export const isHtmlEmpty = (value: string): boolean =>
	value
		.replace(/<style[\s\S]*?<\/style>/gi, "")
		.replace(/<[^>]*>/g, "")
		.replace(/&nbsp;/g, " ")
		.trim() === "" && !/<img\b/i.test(value);

/** Текст без тегов — для коротких подписей (превью поста в списке) */
export const getHtmlText = (value: string): string =>
	value
		.replace(/<style[\s\S]*?<\/style>/gi, "")
		.replace(/<[^>]*>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/\s+/g, " ")
		.trim();
