import { describe, expect, it } from "vitest";

import { ENUM_HOUSING_ROOM_TYPES_BACKEND } from "@/entities/supplier/types/supplier-backend-enum.types";

import { resolveRoomPax, resolveRoomTyp } from "./housing-room-pax.helpers";

describe("resolveRoomTyp", () => {
	it("keeps a known backend type", () => {
		expect(resolveRoomTyp("triple")).toBe(
			ENUM_HOUSING_ROOM_TYPES_BACKEND.TRIPLE
		);
	});

	it("falls back to double for a new or unknown room", () => {
		expect(resolveRoomTyp(undefined)).toBe(
			ENUM_HOUSING_ROOM_TYPES_BACKEND.DOUBLE
		);
		expect(resolveRoomTyp("penthouse")).toBe(
			ENUM_HOUSING_ROOM_TYPES_BACKEND.DOUBLE
		);
	});
});

describe("resolveRoomPax", () => {
	it.each([
		[ENUM_HOUSING_ROOM_TYPES_BACKEND.SINGLE, 1],
		[ENUM_HOUSING_ROOM_TYPES_BACKEND.DOUBLE, 2],
		[ENUM_HOUSING_ROOM_TYPES_BACKEND.TWIN, 2],
		[ENUM_HOUSING_ROOM_TYPES_BACKEND.TRIPLE, 3],
		[ENUM_HOUSING_ROOM_TYPES_BACKEND.QUADRUPLE, 4]
	])("fixes pax for %s to %i whatever was stored", (typ, pax) => {
		expect(resolveRoomPax(typ, 7)).toBe(pax);
	});

	it("keeps the stored pax for suite and family", () => {
		expect(resolveRoomPax(ENUM_HOUSING_ROOM_TYPES_BACKEND.SUITE, 5)).toBe(
			5
		);
		expect(resolveRoomPax(ENUM_HOUSING_ROOM_TYPES_BACKEND.FAMILY, 6)).toBe(
			6
		);
	});

	it("uses 2 for suite / family without a stored pax", () => {
		expect(
			resolveRoomPax(ENUM_HOUSING_ROOM_TYPES_BACKEND.SUITE, null)
		).toBe(2);
	});
});
