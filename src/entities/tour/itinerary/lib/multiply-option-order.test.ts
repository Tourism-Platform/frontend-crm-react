import { describe, expect, it } from "vitest";

import {
	getMultiplyOptionsOrder,
	getRemovedMultiplyOptions,
	hasMultiplyOptionsOrderChanged
} from "./multiply-option-order";

describe("getMultiplyOptionsOrder", () => {
	it("builds the order from option row IDs (never indices)", () => {
		expect(
			getMultiplyOptionsOrder([
				{ id: "uuid-b" },
				{ id: "uuid-a" },
				{ id: "uuid-c" }
			])
		).toEqual({ order: ["uuid-b", "uuid-a", "uuid-c"] });
	});
});

describe("hasMultiplyOptionsOrderChanged", () => {
	it("detects reordering among surviving options", () => {
		expect(
			hasMultiplyOptionsOrderChanged(
				[{ id: "a" }, { id: "b" }],
				[{ id: "b" }, { id: "a" }]
			)
		).toBe(true);

		expect(
			hasMultiplyOptionsOrderChanged(
				[{ id: "a" }, { id: "b" }],
				[{ id: "a" }, { id: "b" }]
			)
		).toBe(false);
	});
});

describe("getRemovedMultiplyOptions", () => {
	it("returns options missing from current form state", () => {
		const removed = getRemovedMultiplyOptions(
			[{ id: "a" }, { id: "b" }, { id: "c" }],
			[{ id: "a" }, { id: "c" }]
		);

		expect(removed.map((item) => item.id)).toEqual(["b"]);
	});
});
