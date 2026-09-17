import { describe, expect, it } from "vitest";

import {
	Currency,
	type HotelOverrideOutput,
	type HousingDetailsOutput,
	RouteOverrideInputTypEnum,
	RouteOverrideOutputTypEnum
} from "@/shared/api";

import type { TEventDetailsBackend } from "../../../types";
import { mapHousingOverrideFromBackend } from "../accommodation/housing-override.converters";
import { mapActivityOverrideFromBackend } from "../activity/activity-override.converters";
import { mapBusOverrideFromBackend } from "../transport/bus-override.converters";
import { mapRouteOverrideFromBackend } from "../transport/route-override.converters";
import { mapTransferOverrideFromBackend } from "../transport/transfer-override.converters";

import { mapEventOverrideFromDetails } from "./event-override.converters";

const FIXED_CHARGE_OUTPUT = {
	typ: "fixed" as const,
	cost: { val: 95, currency: Currency.USD },
	fees: null,
	extra_costs: [],
	markup: null
};

const PER_PERSON_CHARGE_OUTPUT = {
	typ: "per_person" as const,
	cost_per_person: { val: 20, currency: Currency.USD },
	fees: null,
	extra_costs: [],
	markup: null
};

describe("mapHousingOverrideFromBackend", () => {
	it("null-in → null", () => {
		expect(mapHousingOverrideFromBackend(null)).toBeNull();
		expect(mapHousingOverrideFromBackend(undefined)).toBeNull();
	});

	it("passes the whole arm through (Output → Input)", () => {
		const override = {
			typ: "housing" as const,
			policy: {
				check_in_from: "10:00",
				check_out_until: null,
				early_check_in: [],
				late_check_out: []
			},
			rates: {
				pricing: "whole" as const,
				price: { base: FIXED_CHARGE_OUTPUT, seasons: [] }
			}
		};

		const input = mapHousingOverrideFromBackend(override);

		expect(input).toEqual({
			typ: "housing",
			policy: override.policy,
			rates: override.rates
		});
	});

	it("passes the per_room arm through", () => {
		const override = {
			typ: "housing" as const,
			policy: null,
			rates: {
				pricing: "per_room" as const,
				rooms: [
					{
						room_id: "room-1",
						rate: { base: FIXED_CHARGE_OUTPUT, seasons: [] }
					}
				]
			}
		};

		const input = mapHousingOverrideFromBackend(override);

		expect(input).toEqual({
			typ: "housing",
			policy: null,
			rates: override.rates
		});
	});
});

describe("mapRouteOverrideFromBackend", () => {
	it("null-in → null", () => {
		expect(mapRouteOverrideFromBackend(null)).toBeNull();
		expect(mapRouteOverrideFromBackend(undefined)).toBeNull();
	});

	it("maps the Output typ enum onto the Input typ enum (flight)", () => {
		const input = mapRouteOverrideFromBackend({
			typ: RouteOverrideOutputTypEnum.Flight,
			rates: { pricing: "whole", charge: FIXED_CHARGE_OUTPUT }
		});

		expect(input?.typ).toBe(RouteOverrideInputTypEnum.Flight);
		expect(input?.rates).toEqual({
			pricing: "whole",
			charge: FIXED_CHARGE_OUTPUT
		});
	});

	it("passes the per_fare arm through (train)", () => {
		const input = mapRouteOverrideFromBackend({
			typ: RouteOverrideOutputTypEnum.Train,
			rates: {
				pricing: "per_fare",
				fares: [
					{ fare_id: "fare-1", charge: FIXED_CHARGE_OUTPUT },
					{ fare_id: "fare-2", charge: PER_PERSON_CHARGE_OUTPUT }
				]
			}
		});

		expect(input?.typ).toBe(RouteOverrideInputTypEnum.Train);
		expect(input?.rates).toMatchObject({
			pricing: "per_fare",
			fares: [{ fare_id: "fare-1" }, { fare_id: "fare-2" }]
		});
	});
});

describe("mapBusOverrideFromBackend", () => {
	it("null-in → null", () => {
		expect(mapBusOverrideFromBackend(null)).toBeNull();
	});

	it("passes the whole arm through", () => {
		const input = mapBusOverrideFromBackend({
			typ: "bus",
			rates: { pricing: "whole", charge: PER_PERSON_CHARGE_OUTPUT }
		});

		expect(input).toEqual({
			typ: "bus",
			rates: { pricing: "whole", charge: PER_PERSON_CHARGE_OUTPUT }
		});
	});

	it("passes the per_vehicle arm through", () => {
		const input = mapBusOverrideFromBackend({
			typ: "bus",
			rates: {
				pricing: "per_vehicle",
				vehicles: [{ vehicle_id: "v-1", charge: FIXED_CHARGE_OUTPUT }]
			}
		});

		expect(input?.rates).toMatchObject({
			pricing: "per_vehicle",
			vehicles: [{ vehicle_id: "v-1" }]
		});
	});
});

describe("mapTransferOverrideFromBackend", () => {
	it("null-in → null", () => {
		expect(mapTransferOverrideFromBackend(null)).toBeNull();
	});

	it("passes the whole arm through", () => {
		const input = mapTransferOverrideFromBackend({
			typ: "transfer",
			rates: { pricing: "whole", charge: FIXED_CHARGE_OUTPUT }
		});

		expect(input?.rates).toMatchObject({ pricing: "whole" });
	});

	it("passes the per_car arm through", () => {
		const input = mapTransferOverrideFromBackend({
			typ: "transfer",
			rates: {
				pricing: "per_car",
				cars: [{ car_id: "car-1", charge: FIXED_CHARGE_OUTPUT }]
			}
		});

		expect(input?.rates).toMatchObject({
			pricing: "per_car",
			cars: [{ car_id: "car-1" }]
		});
	});

	it("passes the per_car_category arm through", () => {
		const input = mapTransferOverrideFromBackend({
			typ: "transfer",
			rates: {
				pricing: "per_car_category",
				categories: [
					{ category_id: "cat-1", charge: FIXED_CHARGE_OUTPUT }
				]
			}
		});

		expect(input?.rates).toMatchObject({
			pricing: "per_car_category",
			categories: [{ category_id: "cat-1" }]
		});
	});
});

describe("mapActivityOverrideFromBackend", () => {
	it("null-in → null", () => {
		expect(mapActivityOverrideFromBackend(null)).toBeNull();
	});

	it("passes the offerings through", () => {
		const input = mapActivityOverrideFromBackend({
			typ: "activity",
			rates: {
				offerings: [
					{ offering_id: "off-1", charge: PER_PERSON_CHARGE_OUTPUT }
				]
			}
		});

		expect(input).toEqual({
			typ: "activity",
			rates: {
				offerings: [
					{ offering_id: "off-1", charge: PER_PERSON_CHARGE_OUTPUT }
				]
			}
		});
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

	const buildHousingDetails = (
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

	/** Dispatch reads only `supply.override` — the spec shape is irrelevant here. */
	const buildDetails = (override: unknown): TEventDetailsBackend =>
		({
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
					spec: {}
				}
			]
		}) as unknown as TEventDetailsBackend;

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
		expect(
			mapEventOverrideFromDetails(buildHousingDetails(null))
		).toBeNull();
	});

	it("reads a housing override from supply.override", () => {
		const input = mapEventOverrideFromDetails(
			buildHousingDetails({
				typ: "housing",
				policy: null,
				rates: {
					pricing: "whole",
					price: { base: FIXED_CHARGE_OUTPUT, seasons: [] }
				}
			})
		);

		expect(input).toMatchObject({
			typ: "housing",
			rates: { pricing: "whole" }
		});
	});

	it("dispatches train and flight onto the route reader", () => {
		expect(
			mapEventOverrideFromDetails(
				buildDetails({
					typ: RouteOverrideOutputTypEnum.Train,
					rates: { pricing: "whole", charge: FIXED_CHARGE_OUTPUT }
				})
			)?.typ
		).toBe(RouteOverrideInputTypEnum.Train);

		expect(
			mapEventOverrideFromDetails(
				buildDetails({
					typ: RouteOverrideOutputTypEnum.Flight,
					rates: { pricing: "whole", charge: FIXED_CHARGE_OUTPUT }
				})
			)?.typ
		).toBe(RouteOverrideInputTypEnum.Flight);
	});

	it("dispatches bus, transfer and activity onto their readers", () => {
		expect(
			mapEventOverrideFromDetails(
				buildDetails({
					typ: "bus",
					rates: { pricing: "whole", charge: FIXED_CHARGE_OUTPUT }
				})
			)?.typ
		).toBe("bus");

		expect(
			mapEventOverrideFromDetails(
				buildDetails({
					typ: "transfer",
					rates: { pricing: "whole", charge: FIXED_CHARGE_OUTPUT }
				})
			)?.typ
		).toBe("transfer");

		expect(
			mapEventOverrideFromDetails(
				buildDetails({
					typ: "activity",
					rates: {
						offerings: [
							{
								offering_id: "off-1",
								charge: FIXED_CHARGE_OUTPUT
							}
						]
					}
				})
			)?.typ
		).toBe("activity");
	});
});
