// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAutosaveUploadImages } from "./use-autosave-upload-images";

vi.mock("./fetch-image-as-file", () => ({
	fetchImageAsFile: vi.fn(
		async (src: string) => new File([src], `${src}.png`)
	)
}));

const IMAGES = [
	{ id: "a", imagePath: "a", isPrimary: true },
	{ id: "b", imagePath: "b", isPrimary: false }
];

const file = (name: string) => new File([name], `${name}.png`);

const setup = (images = IMAGES, overrides: Record<string, unknown> = {}) => {
	const calls: string[] = [];
	const api = {
		addImages: vi.fn(async (files: File[]) => {
			calls.push(`add:${files.length}`);
			return files.map((_, i) => ({ id: `new-${i}` }));
		}),
		removeImage: vi.fn(async (id: string) => {
			calls.push(`remove:${id}`);
		}),
		setPrimaryImage: vi.fn(async (id: string) => {
			calls.push(`primary:${id}`);
		})
	};
	const hook = renderHook(() =>
		useAutosaveUploadImages({ images, ...api, ...overrides })
	);
	return { ...hook, api, calls };
};

const flush = async (ms = 0) => {
	await act(async () => {
		await vi.advanceTimersByTimeAsync(ms);
	});
};

beforeEach(() => {
	vi.useFakeTimers();
	globalThis.URL.createObjectURL = vi.fn(() => "blob:preview");
	globalThis.URL.revokeObjectURL = vi.fn();
});
afterEach(() => {
	cleanup();
	vi.useRealTimers();
});

describe("useAutosaveUploadImages", () => {
	it("uploads only the new files and makes the first one primary in an empty set", async () => {
		const { result, api } = setup([]);
		await act(async () => result.current.handleAdd([file("x"), file("y")]));
		await flush();

		expect(api.addImages).toHaveBeenCalledTimes(1);
		expect(api.addImages.mock.calls[0][0]).toHaveLength(2);
		expect(api.setPrimaryImage).toHaveBeenCalledWith("new-0");
		expect(api.removeImage).not.toHaveBeenCalled();
		expect(result.current.status).toBe("saved");
	});

	it("does not touch the primary when adding to a set that has one", async () => {
		const { result, api } = setup();
		await act(async () => result.current.handleAdd([file("x")]));
		await flush();

		expect(api.addImages).toHaveBeenCalledTimes(1);
		expect(api.setPrimaryImage).not.toHaveBeenCalled();
	});

	it("passes the primary on when the primary is removed", async () => {
		const { result, calls } = setup();
		await act(async () => result.current.handleRemove("a"));
		await flush();

		expect(calls).toEqual(["remove:a", "primary:b"]);
	});

	it("collapses reorders into one safe re-upload: new set first, old ones after", async () => {
		const { result, calls } = setup();
		const [a, b] = result.current.items;

		await act(async () => result.current.handleReorder([b, a]));
		await flush(500);
		await act(async () => result.current.handleReorder([b, a]));
		await flush(1000);

		expect(calls).toEqual([
			"add:2",
			"remove:b",
			"remove:a",
			"primary:new-0"
		]);
	});

	it("keeps the old images when the re-upload fails", async () => {
		const { result, api } = setup();
		api.addImages.mockRejectedValueOnce(new Error("413"));
		const [a, b] = result.current.items;

		await act(async () => result.current.handleReorder([b, a]));
		await flush(1000);

		expect(api.removeImage).not.toHaveBeenCalled();
		expect(result.current.status).toBe("error");
		expect(
			result.current.items.map(
				(item) => item.kind === "uploaded" && item.id
			)
		).toEqual(["a", "b"]);
	});

	it("sends nothing when the order is back to the server one", async () => {
		const { result, api } = setup();
		const [a, b] = result.current.items;

		await act(async () => result.current.handleReorder([b, a]));
		await act(async () => result.current.handleReorder([a, b]));
		await flush(1000);

		expect(api.addImages).not.toHaveBeenCalled();
	});

	it("is busy while an operation runs and sends nothing when disabled", async () => {
		let release!: () => void;
		const { result, api } = setup(IMAGES, {
			removeImage: vi.fn(
				() => new Promise<void>((resolve) => (release = resolve))
			)
		});
		await act(async () => result.current.handleRemove("b"));
		expect(result.current.isBusy).toBe(true);
		await act(async () => release());
		expect(result.current.isBusy).toBe(false);
		expect(api.addImages).not.toHaveBeenCalled();

		const disabled = setup([], { enabled: false });
		await act(async () => disabled.result.current.handleAdd([file("x")]));
		await flush();
		expect(disabled.api.addImages).not.toHaveBeenCalled();
	});
});
