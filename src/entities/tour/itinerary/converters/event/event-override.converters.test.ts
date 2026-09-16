import { describe, expect, it } from "vitest";

import {
	Currency,
	type HotelOverrideOutput,
	type HousingDetailsOutput,
	RouteOverrideOutputTypEnum
} from "@/shared/api";

import {
	getDefaultHousingOverrideForm,
	mapHousingEventOverrideToBackend,
	mapHousingOverrideFromBackend
} from "./accommodation/housing-override.converters";
import {
	mapEventOverrideFromDetails,
	mapEventOverrideToBackend
} from "./event-override.converters";
import {
	getDefaultTrainOverrideForm,
	mapTrainEventOverrideToBackend,
	mapTrainOverrideFromBackend
} from "./train-override.converters";

const FIXED_CHARGE = {
	typ: "fixed" as const,
	cost: { val: 95, currency: Currency.USD },
	fees: null,
	markup: null
};

const FIXED_CHARGE_OUTPUT = {
	...FIXED_CHARGE,
	extra_costs: []
};

describe("mapHousingEventOverrideToBackend", () => {
	it("writes the whole arm with the dialog rate", () => {
		const body = mapHousingEventOverrideToBackend({
			typ: "housing",
			rate: { base: FIXED_CHARGE, seasons: [] },
			policy: {
				checkInFrom: "10:00",
				checkOutUntil: "12:00",
				earlyCheckIn: [],
				lateCheckOut: []
			}
		});

		expect(body.typ).toBe("housing");
		expect(body.rates).toMatchObject({
			pricing: "whole",
			price: { base: { typ: "fixed", cost: { val: 95 } } }
		});
		expect(body.policy).toMatchObject({
			check_in_from: "10:00",
			check_out_until: "12:00"
		});
	});

	it("writes null rates when no rate is set", () => {
		const body = mapHousingEventOverrideToBackend(
			getDefaultHousingOverrideForm()
		);

		expect(body.rates).toBeNull();
	});
});

describe("mapHousingOverrideFromBackend", () => {
	it("null-in → null", () => {
		expect(mapHousingOverrideFromBackend(null)).toBeNull();
		expect(mapHousingOverrideFromBackend(undefined)).toBeNull();
	});

	it("reads the whole arm back into the dialog model", () => {
		const form = mapHousingOverrideFromBackend({
			typ: "housing",
			policy: {
				check_in_from: "10:00",
				check_out_until: null,
				early_check_in: [],
				late_check_out: []
			},
			rates: {
				pricing: "whole",
				price: { base: FIXED_CHARGE_OUTPUT, seasons: [] }
			}
		});

		expect(form?.typ).toBe("housing");
		expect(form?.rate?.base).toMatchObject({
			typ: "fixed",
			cost: { val: 95 }
		});
		expect(form?.policy?.checkInFrom).toBe("10:00");
	});

	it("per_room arm is not editable in the dialog → rate null", () => {
		const form = mapHousingOverrideFromBackend({
			typ: "housing",
			policy: null,
			rates: {
				pricing: "per_room",
				rooms: [
					{
						room_id: "room-1",
						rate: { base: FIXED_CHARGE_OUTPUT, seasons: [] }
					}
				]
			}
		});

		expect(form?.rate).toBeNull();
	});
});

describe("mapTrainEventOverrideToBackend", () => {
	it("writes the whole arm charge", () => {
		const body = mapTrainEventOverrideToBackend({
			typ: "train",
			charge: FIXED_CHARGE
		});

		expect(body.rates).toEqual({
			pricing: "whole",
			charge: FIXED_CHARGE
		});
	});

	it("throws instead of fabricating a charge", () => {
		expect(() =>
			mapTrainEventOverrideToBackend(getDefaultTrainOverrideForm())
		).toThrow();
	});
});

describe("mapTrainOverrideFromBackend", () => {
	it("reads the whole arm charge", () => {
		const form = mapTrainOverrideFromBackend({
			typ: RouteOverrideOutputTypEnum.Train,
			rates: { pricing: "whole", charge: FIXED_CHARGE_OUTPUT }
		});

		expect(form?.charge).toMatchObject({ typ: "fixed" });
	});

	it("per_fare arm is not editable in the dialog → charge null", () => {
		const form = mapTrainOverrideFromBackend({
			typ: RouteOverrideOutputTypEnum.Train,
			rates: {
				pricing: "per_fare",
				fares: [{ fare_id: "fare-1", charge: FIXED_CHARGE_OUTPUT }]
			}
		});

		expect(form?.charge).toBeNull();
	});
});

describe("mapEventOverrideFromDetails (contract 6: pool member override)", () => {
	const HOTEL_SPEC = {
		pricing: "whole" as const,
		images: [] as [],
		name: null,
		location: null,
		stars: null,
		typs: [] as [],
		amenities: [] as [],
		policy: null,
		price: { base: FIXED_CHARGE_OUTPUT, seasons: [] as [] },
		categories: [] as []
	};

	const buildDetails = (
		override: HotelOverrideOutput | null
	): HousingDetailsOutput => ({
		plan: {},
		pool: [
			{
				id: "11111111-1111-1111-1111-111111111111",
				is_main: true,
				supply: {
					source: "product",
					product_id: "p1",
					supplier: { id: "s1", name: "S" },
					scope: { typ: "all" },
					override
				},
				spec: HOTEL_SPEC
			}
		]
	});

	it("returns null for inline supply", () => {
		expect(
			mapEventOverrideFromDetails({
				plan: {},
				pool: [
					{
						id: "11111111-1111-1111-1111-111111111111",
						is_main: true,
						supply: { source: "inline", supplier_id: null },
						spec: HOTEL_SPEC
					}
				]
			})
		).toBeNull();
	});

	it("returns null when override is null", () => {
		expect(mapEventOverrideFromDetails(buildDetails(null))).toBeNull();
	});

	it("reads the override from supply.override", () => {
		const form = mapEventOverrideFromDetails(
			buildDetails({
				typ: "housing",
				policy: null,
				rates: {
					pricing: "whole",
					price: { base: FIXED_CHARGE_OUTPUT, seasons: [] }
				}
			})
		);

		expect(form?.typ).toBe("housing");
		if (form?.typ === "housing") {
			expect(form.rate?.base).toMatchObject({ typ: "fixed" });
		}
	});
});

describe("mapEventOverrideToBackend dispatch", () => {
	it("dispatches housing and train", () => {
		expect(
			mapEventOverrideToBackend({
				typ: "train",
				charge: FIXED_CHARGE
			}).rates
		).toEqual({ pricing: "whole", charge: FIXED_CHARGE });

		expect(
			mapEventOverrideToBackend(getDefaultHousingOverrideForm()).typ
		).toBe("housing");
	});
});
