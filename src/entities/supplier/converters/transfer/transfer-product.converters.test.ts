import { describe, expect, it } from "vitest";

import { Currency, VehicleBodyType } from "@/shared/api";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_TRANSFER_PRICING,
	ENUM_VEHICLE_BODY_TYPE
} from "../../types";

import {
	mapTransferVariantFromBackend,
	mapTransferVariantToWrite
} from "./transfer-product.converters";

describe("mapTransferVariantFromBackend", () => {
	it("maps a priced car", () => {
		expect(
			mapTransferVariantFromBackend({
				id: "v1",
				name: "Sedan",
				body_type: VehicleBodyType.Sedan,
				pax: 3,
				description: null,
				images: [],
				charge: {
					typ: "fixed",
					cost: { val: 40, currency: Currency.USD },
					fees: null,
					extra_costs: [],
					markup: null
				}
			})
		).toMatchObject({
			id: "v1",
			name: "Sedan",
			expenses: {
				typ: "fixed",
				cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY }
			},
			categories: []
		});
	});

	it("maps categorised classes", () => {
		expect(
			mapTransferVariantFromBackend({
				id: "v1",
				name: "Sedan",
				body_type: VehicleBodyType.Sedan,
				pax: 3,
				description: null,
				images: [],
				categories: [
					{
						id: "c1",
						name: "economy",
						charge: {
							typ: "fixed",
							cost: {
								val: 30,
								currency: Currency.USD
							},
							fees: null,
							extra_costs: [],
							markup: null
						}
					}
				]
			})
		).toMatchObject({
			expenses: null,
			categories: [
				{
					id: "c1",
					name: "economy",
					expenses: {
						typ: "fixed",
						cost: { val: 30, currency: DEFAULT_EVENT_CURRENCY }
					}
				}
			]
		});
	});
});

describe("mapTransferVariantToWrite", () => {
	const write = {
		name: "Sedan",
		bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
		pax: 3,
		description: null,
		expenses: {
			typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
			cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
			fees: null,
			markup: null
		},
		categories: [
			{
				id: "c1",
				name: "economy",
				expenses: {
					typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
					cost: { val: 30, currency: DEFAULT_EVENT_CURRENCY },
					fees: null,
					markup: null
				}
			}
		]
	};

	it("sends per_car without categories", () => {
		expect(
			mapTransferVariantToWrite(write, ENUM_TRANSFER_PRICING.PER_CAR)
		).toMatchObject({
			pricing: "per_car",
			charge: {
				typ: "fixed",
				cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY }
			}
		});
		expect(
			mapTransferVariantToWrite(write, ENUM_TRANSFER_PRICING.PER_CAR)
		).not.toHaveProperty("categories");
	});

	it("echoes category ids on per_car_category", () => {
		expect(
			mapTransferVariantToWrite(
				write,
				ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY
			)
		).toEqual({
			typ: "transfer",
			pricing: "per_car_category",
			name: "Sedan",
			body_type: "sedan",
			pax: 3,
			description: null,
			categories: [
				{
					id: "c1",
					name: "economy",
					charge: {
						typ: "fixed",
						cost: { val: 30, currency: DEFAULT_EVENT_CURRENCY },
						fees: null,
						markup: null
					}
				}
			]
		});
	});

	it("omits charge and categories on whole", () => {
		expect(
			mapTransferVariantToWrite(write, ENUM_TRANSFER_PRICING.WHOLE)
		).toEqual({
			typ: "transfer",
			pricing: "whole",
			name: "Sedan",
			body_type: "sedan",
			pax: 3,
			description: null
		});
	});
});
