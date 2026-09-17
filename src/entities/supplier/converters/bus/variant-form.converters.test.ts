import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import { BUS_VARIANT_FORM_SCHEMA } from "../../schema/bus/variant.schema";
import { ENUM_VEHICLE_BODY_TYPE } from "../../types";

import {
	emptyBusVariantForm,
	mapBusVariantFormToWrite
} from "./variant-form.converters";

describe("mapBusVariantFormToWrite", () => {
	it("maps fixed charge", () => {
		const write = mapBusVariantFormToWrite({
			...emptyBusVariantForm(),
			name: "Coach",
			cost: 25
		});

		expect(write).toEqual({
			name: "Coach",
			bodyType: ENUM_VEHICLE_BODY_TYPE.BUS,
			pax: 1,
			description: null,
			expenses: {
				typ: "fixed",
				cost: { val: 25, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});
	});

	it("maps null cost to zero", () => {
		const write = mapBusVariantFormToWrite({
			...emptyBusVariantForm(),
			name: "Coach",
			cost: null
		});

		expect(write.expenses).toMatchObject({
			typ: "fixed",
			cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY }
		});
	});
});

describe("BUS_VARIANT_FORM_SCHEMA", () => {
	it("rejects empty name", () => {
		expect(
			BUS_VARIANT_FORM_SCHEMA.safeParse(emptyBusVariantForm()).success
		).toBe(false);
	});

	it("accepts a named variant", () => {
		expect(
			BUS_VARIANT_FORM_SCHEMA.safeParse({
				...emptyBusVariantForm(),
				name: "Coach"
			}).success
		).toBe(true);
	});
});
