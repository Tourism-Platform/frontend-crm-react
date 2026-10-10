import { describe, expect, it } from "vitest";

import { HousingRoomTypes } from "@/shared/api";

import { resolveRoomPax, resolveRoomTyp } from "./housing-room-pax.helpers";

describe("resolveRoomTyp", () => {
	it("keeps a known backend type", () => {
		expect(resolveRoomTyp("triple")).toBe(HousingRoomTypes.Triple);
	});

	it("falls back to double for a new or unknown room", () => {
		expect(resolveRoomTyp(undefined)).toBe(HousingRoomTypes.Double);
		expect(resolveRoomTyp("penthouse")).toBe(HousingRoomTypes.Double);
	});
});

describe("resolveRoomPax", () => {
	it.each([
		[HousingRoomTypes.Single, 1],
		[HousingRoomTypes.Double, 2],
		[HousingRoomTypes.Twin, 2],
		[HousingRoomTypes.Triple, 3],
		[HousingRoomTypes.Quadruple, 4]
	])("fixes pax for %s to %i whatever was stored", (typ, pax) => {
		expect(resolveRoomPax(typ, 7)).toBe(pax);
	});

	it("keeps the stored pax for suite and family", () => {
		expect(resolveRoomPax(HousingRoomTypes.Suite, 5)).toBe(5);
		expect(resolveRoomPax(HousingRoomTypes.Family, 6)).toBe(6);
	});

	it("uses 2 for suite / family without a stored pax", () => {
		expect(resolveRoomPax(HousingRoomTypes.Suite, null)).toBe(2);
	});
});
