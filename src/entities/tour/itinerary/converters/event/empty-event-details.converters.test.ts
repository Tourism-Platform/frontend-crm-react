import { describe, expect, it } from "vitest";

import { ENUM_EVENT_BACKEND } from "../../types";

import {
	mapEmptyEventDetailsToWrite,
	mapEventDetailsWriteOrEmpty
} from "./empty-event-details.converters";

describe("mapEmptyEventDetailsToWrite", () => {
	it.each([
		[ENUM_EVENT_BACKEND.HOUSING, { pricing: "per_room" }],
		[ENUM_EVENT_BACKEND.FLIGHT, { pricing: "per_fare" }],
		[ENUM_EVENT_BACKEND.TRAIN, { pricing: "per_fare" }],
		[ENUM_EVENT_BACKEND.BUS, { pricing: "per_vehicle" }],
		[ENUM_EVENT_BACKEND.TRANSFER, { pricing: "per_car" }]
	] as const)("states inline %s spec", (typ, spec) => {
		expect(mapEmptyEventDetailsToWrite(typ)).toEqual({
			supply: { source: "inline", spec }
		});
	});

	it("states inline sightseeing activity spec", () => {
		const details = mapEmptyEventDetailsToWrite(
			ENUM_EVENT_BACKEND.ACTIVITY
		);
		expect(details).toMatchObject({
			supply: { source: "inline", spec: { sub_typ: "sightseeing" } }
		});
	});

	it.each([
		ENUM_EVENT_BACKEND.GUIDE,
		ENUM_EVENT_BACKEND.SUPPLEMENTARY
	] as const)("states inline empty spec for %s", (typ) => {
		expect(mapEmptyEventDetailsToWrite(typ)).toEqual({
			supply: { source: "inline", spec: {} }
		});
	});

	it("states inline supply without spec for information", () => {
		expect(mapEmptyEventDetailsToWrite(ENUM_EVENT_BACKEND.REF)).toEqual({
			supply: { source: "inline" }
		});
	});

	it("returns empty details for a multi slot", () => {
		expect(mapEmptyEventDetailsToWrite(ENUM_EVENT_BACKEND.OPTIONS)).toEqual(
			{}
		);
	});
});

describe("mapEventDetailsWriteOrEmpty", () => {
	it("keeps a body that already states supply", () => {
		const details = {
			supply: {
				source: "product" as const,
				product_id: "product-1"
			}
		};
		expect(
			mapEventDetailsWriteOrEmpty(ENUM_EVENT_BACKEND.HOUSING, details)
		).toBe(details);
	});

	it("fills supply on an empty body and keeps plan", () => {
		expect(
			mapEventDetailsWriteOrEmpty(ENUM_EVENT_BACKEND.HOUSING, {
				plan: { duration: 2 }
			})
		).toEqual({
			plan: { duration: 2 },
			supply: { source: "inline", spec: { pricing: "per_room" } }
		});
	});
});
