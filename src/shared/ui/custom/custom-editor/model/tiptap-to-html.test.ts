import { describe, expect, it } from "vitest";

import { tiptapToHtml } from "./tiptap-to-html";

const doc = (text: string) =>
	JSON.stringify({
		type: "doc",
		content: [
			{
				type: "paragraph",
				attrs: { textAlign: null },
				content: [{ type: "text", text }]
			}
		]
	});

describe("tiptapToHtml", () => {
	it("turns the editor JSON document into HTML", () => {
		expect(tiptapToHtml(doc("https://t.me/durov/1"))).toBe(
			"<p>https://t.me/durov/1</p>"
		);
	});

	it("keeps HTML from the backend as is", () => {
		expect(tiptapToHtml("<p><strong>Hi</strong></p>")).toBe(
			"<p><strong>Hi</strong></p>"
		);
	});

	it("keeps plain text and an empty value as is", () => {
		expect(tiptapToHtml("Hello")).toBe("Hello");
		expect(tiptapToHtml("")).toBe("");
	});
});
