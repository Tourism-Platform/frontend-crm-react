import { describe, expect, it, vi } from "vitest";

import { isSameBody } from "./is-same-body";
import { createSaveQueue } from "./save-queue";

const deferred = () => {
	let resolve!: () => void;
	const promise = new Promise<void>((r) => (resolve = r));
	return { promise, resolve };
};

describe("createSaveQueue", () => {
	it("runs one request at a time and collapses a burst into one tail", async () => {
		const first = deferred();
		const save = vi
			.fn<(body: string) => Promise<void>>()
			.mockImplementationOnce(() => first.promise)
			.mockResolvedValue(undefined);
		const queue = createSaveQueue(save);

		const done = queue.push("a");
		queue.push("b");
		queue.push("c");
		expect(save).toHaveBeenCalledTimes(1);

		first.resolve();
		await done;

		expect(save.mock.calls).toEqual([["a"], ["c"]]);
		expect(queue.isBusy).toBe(false);
	});

	it("rejects the caller when the save fails", async () => {
		const queue = createSaveQueue(() => Promise.reject(new Error("500")));
		await expect(queue.push("a")).rejects.toThrow("500");
		expect(queue.isBusy).toBe(false);
	});
});

describe("isSameBody", () => {
	it("ignores key order and undefined keys", () => {
		expect(isSameBody({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 })).toBe(
			true
		);
		expect(isSameBody({ a: 1, b: undefined }, { a: 1 })).toBe(true);
	});

	it("respects array order and values", () => {
		expect(isSameBody({ cars: [1, 2] }, { cars: [2, 1] })).toBe(false);
		expect(isSameBody({ a: null }, { a: 0 })).toBe(false);
	});
});
