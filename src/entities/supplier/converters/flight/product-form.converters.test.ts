import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FLIGHT_PRICING,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	type IFlightProduct
} from "../../types";

import {
	mapFlightProductPricingToUpdate,
	mapFlightProductToGeneralForm,
	mapFlightProductToUpdate
} from "./product-form.converters";

const PRODUCT: IFlightProduct = {
	id: "p1",
	supplierId: "s1",
	supplierName: null,
	typ: ENUM_SUPPLIER_TYPE.FLIGHT,
	name: "HY TAS–SKD",
	pricing: ENUM_FLIGHT_PRICING.PER_FARE,
	charge: null,
	hops: [
		{
			airlineCode: "HY",
			flightNumber: 601,
			departureAirportCode: "TAS",
			arrivalAirportCode: "SKD",
			departureLocation: null,
			arrivalLocation: null,
			departureTerminal: null,
			departureGate: null,
			amenities: []
		}
	],
	imagePaths: [],
	primaryImagePath: null,
	variants: []
};

describe("mapFlightProductPricingToUpdate", () => {
	it("sends per_fare without a route charge", () => {
		expect(
			mapFlightProductPricingToUpdate(PRODUCT, {
				pricing: ENUM_FLIGHT_PRICING.PER_FARE,
				chargeTyp: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: 90,
				currency: DEFAULT_EVENT_CURRENCY,
				fees: []
			})
		).toMatchObject({
			typ: "flight",
			details: {
				pricing: "per_fare",
				name: "HY TAS–SKD"
			}
		});
		expect(
			mapFlightProductPricingToUpdate(PRODUCT, {
				pricing: ENUM_FLIGHT_PRICING.PER_FARE,
				chargeTyp: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: 90,
				currency: DEFAULT_EVENT_CURRENCY,
				fees: []
			}).details
		).not.toHaveProperty("charge");
	});

	it("sends whole with a route charge", () => {
		expect(
			mapFlightProductPricingToUpdate(PRODUCT, {
				pricing: ENUM_FLIGHT_PRICING.WHOLE,
				chargeTyp: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: 400,
				currency: DEFAULT_EVENT_CURRENCY,
				fees: []
			})
		).toMatchObject({
			typ: "flight",
			details: {
				pricing: "whole",
				name: "HY TAS–SKD",
				charge: {
					typ: "fixed",
					cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY },
					fees: null,
					markup: null
				}
			}
		});
	});
});

describe("mapFlightProductToUpdate", () => {
	it("uses the pricing mapper when pricing and existing are set", () => {
		expect(
			mapFlightProductToUpdate({
				supplierId: PRODUCT.supplierId,
				productId: PRODUCT.id,
				values: mapFlightProductToGeneralForm(PRODUCT),
				existing: PRODUCT,
				pricing: {
					pricing: ENUM_FLIGHT_PRICING.WHOLE,
					chargeTyp: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
					cost: 400,
					currency: DEFAULT_EVENT_CURRENCY,
					fees: []
				}
			})
		).toMatchObject({
			details: {
				pricing: "whole",
				charge: {
					typ: "fixed",
					cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY }
				}
			}
		});
	});

	it("uses the general mapper when pricing is omitted", () => {
		expect(
			mapFlightProductToUpdate({
				supplierId: PRODUCT.supplierId,
				productId: PRODUCT.id,
				values: mapFlightProductToGeneralForm(PRODUCT),
				existing: PRODUCT
			})
		).toMatchObject({
			details: {
				pricing: "per_fare",
				name: "HY TAS–SKD"
			}
		});
	});
});
