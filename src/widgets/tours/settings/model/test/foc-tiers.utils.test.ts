import { describe, expect, it } from "vitest";

import {
	appendFocTier,
	createEmptyFocTier,
	removeFocTierAt
} from "../lib/foc-tiers.utils";

describe("foc-tiers.utils", () => {
	it("creates an empty tier", () => {
		expect(createEmptyFocTier()).toEqual({
			minPax: null,
			free: null
		});
	});

	it("removes tier by index", () => {
		const tiers = [
			{ minPax: 10, free: 1 },
			{ minPax: 20, free: 2 }
		];

		expect(removeFocTierAt(tiers, 0)).toEqual([{ minPax: 20, free: 2 }]);
	});

	it("appends a new empty tier", () => {
		const tiers = [{ minPax: 132, free: 1 }];

		expect(appendFocTier(tiers)).toEqual([
			{ minPax: 132, free: 1 },
			{ minPax: null, free: null }
		]);
	});

	it("does not reuse old values after remove and append", () => {
		const fromBackend = [
			{ minPax: 132, free: 1 },
			{ minPax: 1214, free: 1 },
			{ minPax: 23423412, free: 243234 },
			{ minPax: 21, free: 12 }
		];

		const afterRemove = removeFocTierAt(fromBackend, 0);
		const afterAdd = appendFocTier(afterRemove);

		expect(afterAdd).toHaveLength(4);
		expect(afterAdd[3]).toEqual({ minPax: null, free: null });
	});
});
