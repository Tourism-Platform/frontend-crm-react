import { describe, expect, it } from "vitest";

import { GeneralVenueInputSubTypEnum } from "@/shared/api";

import { ENUM_EVENT_BACKEND } from "../../../types";

import {
	mapAddPoolMemberToBackend,
	mapEmptyEventDetailsToWrite,
	mapEmptyPoolMemberNew,
	mapEventDetailsWriteOrEmpty,
	mapInlinePoolMemberWithSupplier,
	mapProductPoolMemberNew
} from "./empty-event-details.converters";

describe("mapEmptyEventDetailsToWrite", () => {
	it.each([
		[ENUM_EVENT_BACKEND.HOUSING, { pricing: "per_room" }],
		[ENUM_EVENT_BACKEND.FLIGHT, { pricing: "per_fare" }],
		[ENUM_EVENT_BACKEND.TRAIN, { pricing: "per_fare" }],
		[ENUM_EVENT_BACKEND.BUS, { pricing: "per_vehicle" }],
		[ENUM_EVENT_BACKEND.TRANSFER, { pricing: "per_car" }]
	] as const)("states a one-member inline %s pool", (typ, spec) => {
		expect(mapEmptyEventDetailsToWrite(typ)).toEqual({
			pool: [{ supply: { source: "inline", spec } }]
		});
		expect(JSON.stringify(mapEmptyEventDetailsToWrite(typ))).not.toContain(
			"is_main"
		);
	});

	it("states inline sightseeing activity spec", () => {
		const details = mapEmptyEventDetailsToWrite(
			ENUM_EVENT_BACKEND.ACTIVITY
		);
		expect(details).toMatchObject({
			pool: [
				{
					supply: {
						source: "inline",
						spec: {
							sub_typ: GeneralVenueInputSubTypEnum.Sightseeing
						}
					}
				}
			]
		});
	});

	it.each([
		ENUM_EVENT_BACKEND.GUIDE,
		ENUM_EVENT_BACKEND.SUPPLEMENTARY
	] as const)("states inline empty spec for %s", (typ) => {
		expect(mapEmptyEventDetailsToWrite(typ)).toEqual({
			pool: [{ supply: { source: "inline", spec: {} } }]
		});
	});

	it("omits pool for information — the server creates a member", () => {
		expect(mapEmptyEventDetailsToWrite(ENUM_EVENT_BACKEND.REF)).toEqual({});
	});

	it("returns empty details for a multi slot", () => {
		expect(mapEmptyEventDetailsToWrite(ENUM_EVENT_BACKEND.OPTIONS)).toEqual(
			{}
		);
	});
});

describe("mapEmptyPoolMemberNew", () => {
	it("states typ and inline supply without is_main", () => {
		const member = mapEmptyPoolMemberNew(ENUM_EVENT_BACKEND.HOUSING);
		expect(member).toMatchObject({
			typ: ENUM_EVENT_BACKEND.HOUSING,
			supply: { source: "inline", spec: { pricing: "per_room" } }
		});
		expect(JSON.stringify(member)).not.toContain("is_main");
	});

	it("states an information member without a spec", () => {
		expect(mapEmptyPoolMemberNew(ENUM_EVENT_BACKEND.REF)).toEqual({
			typ: ENUM_EVENT_BACKEND.REF,
			supply: { source: "inline" }
		});
	});
});

describe("mapInlinePoolMemberWithSupplier", () => {
	it("keeps the empty housing shell and sets supplier_id", () => {
		const member = mapInlinePoolMemberWithSupplier(
			ENUM_EVENT_BACKEND.HOUSING,
			"sup-1"
		);
		expect(member).toMatchObject({
			typ: ENUM_EVENT_BACKEND.HOUSING,
			supply: {
				source: "inline",
				supplier_id: "sup-1",
				spec: { pricing: "per_room" }
			}
		});
		expect(JSON.stringify(member)).not.toContain("is_main");
	});

	it("links an information member without a spec", () => {
		expect(
			mapInlinePoolMemberWithSupplier(ENUM_EVENT_BACKEND.REF, "sup-2")
		).toEqual({
			typ: ENUM_EVENT_BACKEND.REF,
			supply: { source: "inline", supplier_id: "sup-2" }
		});
	});
});

describe("mapProductPoolMemberNew", () => {
	it("maps product link with optional scope", () => {
		expect(
			mapProductPoolMemberNew(ENUM_EVENT_BACKEND.HOUSING, {
				productId: "prod-1",
				scope: {
					typ: "only",
					ids: ["cat-1"],
					units: [],
					categories: []
				}
			})
		).toEqual({
			typ: ENUM_EVENT_BACKEND.HOUSING,
			supply: {
				source: "product",
				product_id: "prod-1",
				scope: {
					typ: "only",
					ids: ["cat-1"],
					units: [],
					categories: []
				}
			}
		});
	});
});

describe("mapAddPoolMemberToBackend", () => {
	it("dispatches empty / supplier / product intents", () => {
		expect(
			mapAddPoolMemberToBackend({
				kind: "empty",
				typ: ENUM_EVENT_BACKEND.REF
			})
		).toEqual(mapEmptyPoolMemberNew(ENUM_EVENT_BACKEND.REF));

		expect(
			mapAddPoolMemberToBackend({
				kind: "supplier",
				typ: ENUM_EVENT_BACKEND.REF,
				supplierId: "sup-9"
			})
		).toEqual(
			mapInlinePoolMemberWithSupplier(ENUM_EVENT_BACKEND.REF, "sup-9")
		);

		expect(
			mapAddPoolMemberToBackend({
				kind: "product",
				typ: ENUM_EVENT_BACKEND.HOUSING,
				link: { productId: "prod-2" }
			})
		).toEqual(
			mapProductPoolMemberNew(ENUM_EVENT_BACKEND.HOUSING, {
				productId: "prod-2"
			})
		);
	});
});

describe("mapEventDetailsWriteOrEmpty", () => {
	it("keeps a body that already states a pool", () => {
		const details = {
			pool: [
				{
					supply: {
						source: "product" as const,
						product_id: "product-1"
					}
				}
			]
		};
		expect(
			mapEventDetailsWriteOrEmpty(ENUM_EVENT_BACKEND.HOUSING, details)
		).toBe(details);
	});

	it("fills pool on an empty body and keeps plan", () => {
		expect(
			mapEventDetailsWriteOrEmpty(ENUM_EVENT_BACKEND.HOUSING, {
				plan: { duration: 2 }
			})
		).toEqual({
			plan: { duration: 2 },
			pool: [
				{ supply: { source: "inline", spec: { pricing: "per_room" } } }
			]
		});
	});
});
