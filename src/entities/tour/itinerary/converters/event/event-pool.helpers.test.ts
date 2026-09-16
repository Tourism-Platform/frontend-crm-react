import { describe, expect, it } from "vitest";

import { type HousingDetailsOutput } from "@/shared/api";

import {
	canRemovePoolMember,
	getEventPool,
	getMainPoolMember,
	getPoolMember,
	isProductPoolMember
} from "./event-pool.helpers";

const PLAN = { duration: 1, check_in: null, check_out: null };

const INLINE_SPEC = {
	pricing: "per_room" as const,
	images: [],
	name: "Hotel A",
	location: null,
	stars: 3,
	typs: [],
	amenities: [],
	policy: null,
	categories: []
};

const details = (pool: HousingDetailsOutput["pool"]): HousingDetailsOutput => ({
	plan: PLAN,
	pool
});

const inlineMember = (
	id: string,
	isMain: boolean
): HousingDetailsOutput["pool"][number] => ({
	id,
	is_main: isMain,
	supply: { source: "inline", supplier_id: null },
	spec: INLINE_SPEC
});

const productMember = (
	id: string,
	isMain: boolean
): HousingDetailsOutput["pool"][number] => ({
	id,
	is_main: isMain,
	supply: {
		source: "product",
		product_id: "product-1",
		supplier: { id: "sup-1", name: "Supplier" },
		scope: { typ: "all" },
		override: null
	},
	spec: {
		...INLINE_SPEC,
		name: "Product hotel"
	}
});

describe("event-pool.helpers", () => {
	it("returns an empty pool when details are missing", () => {
		expect(getEventPool(undefined)).toEqual([]);
		expect(getPoolMember(undefined)).toBeUndefined();
		expect(getMainPoolMember(undefined)).toBeUndefined();
		expect(canRemovePoolMember(undefined)).toBe(false);
	});

	it("returns the main member when supplyId is omitted", () => {
		const read = details([
			inlineMember("a", false),
			inlineMember("b", true)
		]);
		expect(getPoolMember(read)?.id).toBe("b");
	});

	it("finds a member by supply id", () => {
		const read = details([
			inlineMember("a", true),
			inlineMember("b", false)
		]);
		expect(getPoolMember(read, "b")?.id).toBe("b");
	});

	it("falls back to main when supplyId is missing from the pool", () => {
		const read = details([
			inlineMember("a", false),
			inlineMember("b", true)
		]);
		expect(getPoolMember(read, "gone")?.id).toBe("b");
	});

	it("falls back to pool[0] when supplyId is unknown and no main is set", () => {
		const read = details([
			inlineMember("a", false),
			inlineMember("b", false)
		]);
		expect(getPoolMember(read, "gone")?.id).toBe("a");
	});

	it("prefers is_main for the public-card member, then falls back to pool[0]", () => {
		const withMain = details([
			inlineMember("a", false),
			inlineMember("b", true)
		]);
		expect(getMainPoolMember(withMain)?.id).toBe("b");

		const withoutMain = details([
			inlineMember("a", false),
			inlineMember("b", false)
		]);
		expect(getMainPoolMember(withoutMain)?.id).toBe("a");
	});

	it("narrows product-linked members", () => {
		const read = details([
			inlineMember("a", true),
			productMember("b", false)
		]);
		expect(isProductPoolMember(getPoolMember(read, "a"))).toBe(false);
		expect(isProductPoolMember(getPoolMember(read, "b"))).toBe(true);
	});

	it("forbids removing the last member", () => {
		expect(canRemovePoolMember(details([inlineMember("a", true)]))).toBe(
			false
		);
		expect(
			canRemovePoolMember(
				details([inlineMember("a", true), inlineMember("b", false)])
			)
		).toBe(true);
	});
});
