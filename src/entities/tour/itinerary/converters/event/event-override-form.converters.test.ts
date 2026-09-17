import { describe, expect, it } from "vitest";

import { Currency, RouteOverrideInputTypEnum } from "@/shared/api";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_EVENT_BACKEND } from "../../types/event-backend-enum.types";
import {
	ENUM_FORM_OVERRIDE_PRODUCT as ENUM_FORM,
	ENUM_OVERRIDE_PRICING_ARM,
	ENUM_OVERRIDE_UNIT_CHARGE
} from "../../types/event-override-form.types";
import { ENUM_FLIGHT_MARKUP_TYP } from "../../types/flight/pricing.types";

import {
	mapEventOverrideToBackend,
	mapEventOverrideToForm
} from "./event-override-form.converters";
import { type IOverrideUnitOption } from "./event-override-units.helpers";

const FIXED_CHARGE = {
	typ: "fixed" as const,
	cost: { val: 95, currency: Currency.USD },
	fees: null,
	extra_costs: [],
	markup: null
};

const UNITS: IOverrideUnitOption[] = [
	{ id: "unit-1", label: "Unit one" },
	{ id: "unit-2", label: "Unit two" }
];

describe("mapEventOverrideToForm", () => {
	it("builds defaults with an empty row per spec unit", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.TRAIN,
			null,
			UNITS
		);

		expect(values[ENUM_FORM.PRICING_ARM]).toBe(
			ENUM_OVERRIDE_PRICING_ARM.WHOLE
		);
		expect(values[ENUM_FORM.UNITS]).toEqual([
			expect.objectContaining({ unit_id: "unit-1", total_price: null }),
			expect.objectContaining({ unit_id: "unit-2", total_price: null })
		]);
	});

	it("reads the housing whole arm (policy + base charge)", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.HOUSING,
			{
				typ: "housing",
				policy: {
					check_in_from: "10:00",
					check_out_until: "12:00",
					early_check_in: [],
					late_check_out: []
				},
				rates: {
					pricing: "whole",
					price: { base: FIXED_CHARGE, seasons: [] }
				}
			},
			[]
		);

		expect(values[ENUM_FORM.PRICING_ARM]).toBe(
			ENUM_OVERRIDE_PRICING_ARM.WHOLE
		);
		expect(values[ENUM_FORM.TOTAL_PRICE]).toBe(95);
		expect(values[ENUM_FORM.CURRENCY]).toBe(ENUM_CURRENCY_OPTIONS.USD);
		expect(values[ENUM_FORM.CHECK_IN_FROM]).toBe("10:00");
		expect(values[ENUM_FORM.CHECK_OUT_UNTIL]).toBe("12:00");
	});

	it("reads the route per_fare arm into unit rows", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.TRAIN,
			{
				typ: RouteOverrideInputTypEnum.Train,
				rates: {
					pricing: "per_fare",
					fares: [{ fare_id: "unit-2", charge: FIXED_CHARGE }]
				}
			},
			UNITS
		);

		expect(values[ENUM_FORM.PRICING_ARM]).toBe(
			ENUM_OVERRIDE_PRICING_ARM.PER_FARE
		);
		expect(values[ENUM_FORM.UNITS][0].total_price).toBeNull();
		expect(values[ENUM_FORM.UNITS][1]).toMatchObject({
			unit_id: "unit-2",
			charge_typ: ENUM_OVERRIDE_UNIT_CHARGE.FIXED,
			total_price: 95
		});
	});

	it("reads the transfer per_car_category arm", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.TRANSFER,
			{
				typ: "transfer",
				rates: {
					pricing: "per_car_category",
					categories: [
						{ category_id: "unit-1", charge: FIXED_CHARGE }
					]
				}
			},
			UNITS
		);

		expect(values[ENUM_FORM.PRICING_ARM]).toBe(
			ENUM_OVERRIDE_PRICING_ARM.PER_CAR_CATEGORY
		);
		expect(values[ENUM_FORM.UNITS][0].total_price).toBe(95);
	});

	it("activity always lands on the offerings arm", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.ACTIVITY,
			null,
			UNITS
		);

		expect(values[ENUM_FORM.PRICING_ARM]).toBe(
			ENUM_OVERRIDE_PRICING_ARM.WHOLE
		);

		const filled = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.ACTIVITY,
			{
				typ: "activity",
				rates: {
					offerings: [{ offering_id: "unit-1", charge: FIXED_CHARGE }]
				}
			},
			UNITS
		);

		expect(filled[ENUM_FORM.PRICING_ARM]).toBe(
			ENUM_OVERRIDE_PRICING_ARM.OFFERINGS
		);
		expect(filled[ENUM_FORM.UNITS][0].total_price).toBe(95);
	});
});

describe("mapEventOverrideToBackend", () => {
	it("builds the housing whole arm with policy", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.HOUSING,
			null,
			[]
		);
		values[ENUM_FORM.TOTAL_PRICE] = 120;
		values[ENUM_FORM.CHECK_IN_FROM] = "09:00";
		values[ENUM_FORM.CHECK_OUT_UNTIL] = "11:00";

		const body = mapEventOverrideToBackend(
			ENUM_EVENT_BACKEND.HOUSING,
			values
		);

		expect(body).toEqual({
			typ: "housing",
			policy: {
				check_in_from: "09:00",
				check_out_until: "11:00",
				early_check_in: [],
				late_check_out: []
			},
			rates: {
				pricing: "whole",
				price: {
					base: {
						typ: "fixed",
						cost: { val: 120, currency: Currency.USD },
						fees: null,
						extra_costs: [],
						markup: null
					},
					seasons: []
				}
			}
		});
	});

	it("builds the route per_fare arm and skips empty rows", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.TRAIN,
			null,
			UNITS
		);
		values[ENUM_FORM.PRICING_ARM] = ENUM_OVERRIDE_PRICING_ARM.PER_FARE;
		values[ENUM_FORM.UNITS][1].total_price = 75;

		const body = mapEventOverrideToBackend(
			ENUM_EVENT_BACKEND.TRAIN,
			values
		);

		expect(body).toEqual({
			typ: RouteOverrideInputTypEnum.Train,
			rates: {
				pricing: "per_fare",
				fares: [
					{
						fare_id: "unit-2",
						charge: {
							typ: "fixed",
							cost: { val: 75, currency: Currency.USD },
							fees: null,
							extra_costs: [],
							markup: null
						}
					}
				]
			}
		});
	});

	it("builds per-person fare charges when the row says so", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.FLIGHT,
			null,
			UNITS
		);
		values[ENUM_FORM.PRICING_ARM] = ENUM_OVERRIDE_PRICING_ARM.PER_FARE;
		values[ENUM_FORM.UNITS][0].charge_typ =
			ENUM_OVERRIDE_UNIT_CHARGE.PER_PERSON;
		values[ENUM_FORM.UNITS][0].total_price = 30;

		const body = mapEventOverrideToBackend(
			ENUM_EVENT_BACKEND.FLIGHT,
			values
		);

		expect(body).toMatchObject({
			typ: RouteOverrideInputTypEnum.Flight,
			rates: {
				pricing: "per_fare",
				fares: [
					{
						fare_id: "unit-1",
						charge: {
							typ: "per_person",
							cost_per_person: { val: 30, currency: Currency.USD }
						}
					}
				]
			}
		});
	});

	it("builds the bus per_vehicle arm with fixed charges only", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.BUS,
			null,
			UNITS
		);
		values[ENUM_FORM.PRICING_ARM] = ENUM_OVERRIDE_PRICING_ARM.PER_VEHICLE;
		values[ENUM_FORM.UNITS][0].total_price = 50;

		const body = mapEventOverrideToBackend(ENUM_EVENT_BACKEND.BUS, values);

		expect(body).toMatchObject({
			typ: "bus",
			rates: {
				pricing: "per_vehicle",
				vehicles: [{ vehicle_id: "unit-1" }]
			}
		});
	});

	it("builds the transfer per_car arm", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.TRANSFER,
			null,
			UNITS
		);
		values[ENUM_FORM.PRICING_ARM] = ENUM_OVERRIDE_PRICING_ARM.PER_CAR;
		values[ENUM_FORM.UNITS][1].total_price = 40;

		const body = mapEventOverrideToBackend(
			ENUM_EVENT_BACKEND.TRANSFER,
			values
		);

		expect(body).toMatchObject({
			typ: "transfer",
			rates: {
				pricing: "per_car",
				cars: [{ car_id: "unit-2" }]
			}
		});
	});

	it("builds the activity offerings arm", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.ACTIVITY,
			null,
			UNITS
		);
		values[ENUM_FORM.UNITS][0].total_price = 15;

		const body = mapEventOverrideToBackend(
			ENUM_EVENT_BACKEND.ACTIVITY,
			values
		);

		expect(body).toMatchObject({
			typ: "activity",
			rates: {
				offerings: [{ offering_id: "unit-1" }]
			}
		});
	});

	it("round-trips a housing per_room override", () => {
		const source = {
			typ: "housing" as const,
			policy: {
				check_in_from: "10:00",
				check_out_until: "12:00",
				early_check_in: [],
				late_check_out: []
			},
			rates: {
				pricing: "per_room" as const,
				rooms: [
					{
						room_id: "unit-1",
						rate: { base: FIXED_CHARGE, seasons: [] }
					}
				]
			}
		};

		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.HOUSING,
			source,
			UNITS
		);
		const body = mapEventOverrideToBackend(
			ENUM_EVENT_BACKEND.HOUSING,
			values
		);

		expect(body).toEqual({
			typ: "housing",
			policy: {
				check_in_from: "10:00",
				check_out_until: "12:00",
				early_check_in: [],
				late_check_out: []
			},
			rates: {
				pricing: "per_room",
				rooms: [
					{
						room_id: "unit-1",
						rate: { base: FIXED_CHARGE, seasons: [] }
					}
				]
			}
		});
	});

	it("round-trips a fixed markup on the whole arm", () => {
		const source = {
			typ: "bus" as const,
			rates: {
				pricing: "whole" as const,
				charge: {
					...FIXED_CHARGE,
					markup: {
						typ: "fixed" as const,
						cost: { val: 25, currency: Currency.USD }
					}
				}
			}
		};

		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.BUS,
			source,
			UNITS
		);

		expect(values[ENUM_FORM.ADD_MARGIN_SEPARATELY]).toBe(true);
		expect(values[ENUM_FORM.MARKUP]).toEqual({
			typ: ENUM_FLIGHT_MARKUP_TYP.FIXED,
			value: "25"
		});

		expect(
			mapEventOverrideToBackend(ENUM_EVENT_BACKEND.BUS, values)
		).toEqual(source);
	});

	it("round-trips a percentage markup on a unit row", () => {
		const source = {
			typ: "activity" as const,
			rates: {
				offerings: [
					{
						offering_id: "unit-1",
						charge: {
							...FIXED_CHARGE,
							markup: {
								typ: "percentage" as const,
								percentage: 0.1
							}
						}
					}
				]
			}
		};

		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.ACTIVITY,
			source,
			UNITS
		);

		expect(values[ENUM_FORM.ADD_MARGIN_SEPARATELY]).toBe(true);
		expect(values[ENUM_FORM.UNITS][0].markup).toEqual({
			typ: ENUM_FLIGHT_MARKUP_TYP.PERCENTAGE,
			value: "10"
		});
		expect(values[ENUM_FORM.UNITS][1].markup).toBeNull();

		const body = mapEventOverrideToBackend(
			ENUM_EVENT_BACKEND.ACTIVITY,
			values
		);

		expect(body).toEqual(source);
	});

	it("sends markup null when the margin flag is off", () => {
		const values = mapEventOverrideToForm(
			ENUM_EVENT_BACKEND.BUS,
			null,
			UNITS
		);
		values[ENUM_FORM.TOTAL_PRICE] = 80;
		values[ENUM_FORM.ADD_MARGIN_SEPARATELY] = false;
		values[ENUM_FORM.MARKUP] = {
			typ: ENUM_FLIGHT_MARKUP_TYP.FIXED,
			value: "15"
		};

		const body = mapEventOverrideToBackend(ENUM_EVENT_BACKEND.BUS, values);

		expect(body).toMatchObject({
			typ: "bus",
			rates: {
				pricing: "whole",
				charge: { markup: null }
			}
		});
	});
});
