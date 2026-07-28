import { describe, expect, it } from "vitest";

import { enqueueByKey, findNewestOptionId } from "../helpers/add-option-queue";
import { findItemLocation } from "../helpers/find-item-location";
import { removeItemFromData } from "../helpers/remove-item";
import type { TOptionsData } from "../types";

describe("findNewestOptionId", () => {
	it("returns the single new option id", () => {
		const prevIds = new Set(["a", "b"]);
		expect(
			findNewestOptionId(prevIds, [{ id: "a" }, { id: "b" }, { id: "c" }])
		).toBe("c");
	});

	it("returns distinct ids across serialized prevIds updates", () => {
		const first = findNewestOptionId(new Set(["a"]), [
			{ id: "a" },
			{ id: "b" }
		]);
		expect(first).toBe("b");

		const second = findNewestOptionId(new Set(["a", "b"]), [
			{ id: "a" },
			{ id: "b" },
			{ id: "c" }
		]);
		expect(second).toBe("c");
		expect(second).not.toBe(first);
	});
});

describe("enqueueByKey", () => {
	it("runs jobs for the same key sequentially", async () => {
		const queues = new Map<string, Promise<void>>();
		const order: number[] = [];

		const first = enqueueByKey(queues, "parent-1", async () => {
			order.push(1);
			await new Promise((resolve) => setTimeout(resolve, 30));
			order.push(2);
		});

		const second = enqueueByKey(queues, "parent-1", async () => {
			order.push(3);
		});

		await Promise.all([first, second]);
		expect(order).toEqual([1, 2, 3]);
	});

	it("runs jobs for different keys in parallel", async () => {
		const queues = new Map<string, Promise<void>>();
		let aStarted = false;
		let bStartedWhileAPending = false;

		const a = enqueueByKey(queues, "parent-a", async () => {
			aStarted = true;
			await new Promise((resolve) => setTimeout(resolve, 40));
		});

		const b = enqueueByKey(queues, "parent-b", async () => {
			bStartedWhileAPending = aStarted;
		});

		await Promise.all([a, b]);
		expect(bStartedWhileAPending).toBe(true);
	});

	it("continues the queue after a failed job and still rejects the failed promise", async () => {
		const queues = new Map<string, Promise<void>>();
		const order: string[] = [];

		const failed = enqueueByKey(queues, "parent-1", async () => {
			order.push("fail");
			throw new Error("boom");
		});

		const next = enqueueByKey(queues, "parent-1", async () => {
			order.push("ok");
		});

		await expect(failed).rejects.toThrow("boom");
		await next;
		expect(order).toEqual(["fail", "ok"]);
	});
});

describe("rollback nested option sibling", () => {
	it("removes only the failed temp item", () => {
		const optionsData: TOptionsData = {
			"opt-1": {
				tripDetails: [],
				dayOrder: [1],
				days: {
					1: [
						{
							id: "parent",
							block_id: "parent",
							backendId: "parent-be",
							eventType: "multiply-option",
							title: "Multi",
							items: [
								{
									id: "a",
									block_id: "temp-a",
									backendId: "backend-a",
									eventType: "activity",
									title: "A"
								},
								{
									id: "b",
									block_id: "temp-b",
									eventType: "activity",
									title: "B"
								}
							]
						}
					]
				}
			}
		};

		const loc = findItemLocation(optionsData, "temp-b");
		expect(loc).not.toBeNull();

		const next = removeItemFromData(optionsData, loc!);
		const items = next["opt-1"].days[1][0].items;

		expect(items).toHaveLength(1);
		expect(items?.[0]?.block_id).toBe("temp-a");
	});
});
