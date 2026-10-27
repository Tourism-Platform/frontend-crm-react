import { escapeHtml, isHtmlContent } from "@/shared/utils";

/** Письма верстаются под светлый фон — превью не зависит от темы админки */
const BASE_STYLES = `
	html { overflow: hidden; }
	html, body { margin: 0; background: #ffffff; color: #111111; }
	body { padding: 16px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.5; word-wrap: break-word; }
	img { max-width: 100%; height: auto; }
	.plain-text { white-space: pre-wrap; }
`;

/** Готовит документ для iframe srcDoc: ссылки открываются в новой вкладке, обычный текст сохраняет переносы */
export const buildHtmlDocument = (value: string): string => {
	const body = isHtmlContent(value)
		? value
		: `<div class="plain-text">${escapeHtml(value)}</div>`;

	return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><base target="_blank" /><style>${BASE_STYLES}</style></head><body>${body}</body></html>`;
};
