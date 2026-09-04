import { describe, expect, it, vi } from "vitest";

import { fetchImageAsFile } from "./fetch-image-as-file";

describe("fetchImageAsFile", () => {
	it("returns a File with extension when the url has none", async () => {
		const blob = new Blob(["img"], { type: "image/jpeg" });
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				blob: () => Promise.resolve(blob)
			})
		);

		const file = await fetchImageAsFile(
			"https://cdn.example/public/event-library/image/abc"
		);

		expect(file).toBeInstanceOf(File);
		expect(file.name).toBe("abc.jpg");
		expect(file.type).toBe("image/jpeg");
		expect(fetch).toHaveBeenCalledWith(
			"https://cdn.example/public/event-library/image/abc",
			{ cache: "no-store" }
		);
		vi.unstubAllGlobals();
	});

	it("falls back to image/jpeg when blob type is empty", async () => {
		const blob = new Blob(["img"], { type: "" });
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				blob: () => Promise.resolve(blob)
			})
		);

		const file = await fetchImageAsFile("https://cdn.example/image/abc");

		expect(file.type).toBe("image/jpeg");
		expect(file.name).toBe("abc.jpg");
		vi.unstubAllGlobals();
	});

	it("throws when fetch is not ok", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: false,
				blob: () => Promise.resolve(new Blob(["x"]))
			})
		);

		await expect(
			fetchImageAsFile("https://cdn.example/missing")
		).rejects.toThrow("Failed to read image");
		vi.unstubAllGlobals();
	});

	it("throws when blob is empty", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				blob: () => Promise.resolve(new Blob())
			})
		);

		await expect(
			fetchImageAsFile("https://cdn.example/image/abc")
		).rejects.toThrow("Failed to read image");
		vi.unstubAllGlobals();
	});
});
