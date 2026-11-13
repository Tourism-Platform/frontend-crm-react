// @vitest-environment node
import { describe, expect, it } from "vitest";

import { removeOpenIndex } from "./remove-open-index";

describe("removeOpenIndex", () => {
	it("closes the removed item", () => {
		expect(removeOpenIndex([0, 2], 0)).toEqual([1]);
	});

	it("moves open items after the removed one up by one", () => {
		expect(removeOpenIndex([0, 2, 3], 1)).toEqual([0, 1, 2]);
	});

	it("keeps open items before the removed one", () => {
		expect(removeOpenIndex([0, 1], 3)).toEqual([0, 1]);
	});

	it("keeps an empty state empty", () => {
		expect(removeOpenIndex([], 0)).toEqual([]);
	});
});
