import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api/generated/Api";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_HOTEL_PRICING,
	ENUM_HOTEL_PRODUCT_EXPENSE_TYP,
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE,
	type IHotelProduct,
	type IHotelVariant
} from "../../types";

import { mapHotelProductToEditForm } from "./hotel-product-edit-form.converters";
import { mapHotelEditFormToPricingSwitch } from "./hotel-product-pricing.converters";

const VARIANT: IHotelVariant = {
	id: "v1",
	name: "Deluxe",
	rooms: [
		{
			id: "r1",
			typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
			pax: 2,
			name: "Deluxe Double",
			description: null,
			expenses: {
				typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
				cost: { val: 120, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: {
					typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
					percentage: 0.1
				}
			},
			rates: [],
			images: []
		}
	]
};

const PRODUCT: IHotelProduct = {
	id: "p1",
	supplierId: "s1",
	typ: ENUM_SUPPLIER_TYPE.HOTEL,
	name: "Hyatt",
	pricing: ENUM_HOTEL_PRICING.PER_ROOM,
	details: {
		location: null,
		stars: 5,
		amenities: [],
		policy: null
	},
	stayRate: null,
	imagePaths: [],
	primaryImagePath: null,
	variants: [VARIANT]
};

describe("mapHotelEditFormToPricingSwitch", () => {
	it("builds ToPerRoom from expenses aligned by index", () => {
		const values = mapHotelProductToEditForm(PRODUCT);
		values.pricing.expenses = {
			typ: ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM,
			rooms: [
				{
					cost: 155,
					fees: [],
					currency: DEFAULT_EVENT_CURRENCY,
					markup: {
						typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
						value: "10"
					}
				}
			]
		};

		expect(mapHotelEditFormToPricingSwitch(values, PRODUCT)).toMatchObject({
			typ: "hotel",
			to: "per_room",
			rooms: [
				{
					room_id: "r1",
					rate: {
						base: {
							typ: "fixed",
							cost: {
								val: 155,
								currency: DEFAULT_EVENT_CURRENCY
							},
							markup: { typ: "percentage", percentage: 0.1 }
						}
					}
				}
			]
		});
	});

	it("builds ToWholeHotel from flat_rate", () => {
		const values = mapHotelProductToEditForm({
			...PRODUCT,
			pricing: ENUM_HOTEL_PRICING.WHOLE,
			stayRate: {
				base: {
					typ: "fixed",
					cost: { val: 400, currency: Currency.USD },
					fees: null,
					extra_costs: [],
					markup: null
				},
				seasons: []
			}
		});
		values.pricing.total_price = 500;
		values.pricing.currency = DEFAULT_EVENT_CURRENCY;

		expect(
			mapHotelEditFormToPricingSwitch(values, {
				...PRODUCT,
				pricing: ENUM_HOTEL_PRICING.WHOLE,
				stayRate: {
					base: {
						typ: "fixed",
						cost: { val: 400, currency: Currency.USD },
						fees: null,
						extra_costs: [],
						markup: null
					},
					seasons: []
				}
			})
		).toMatchObject({
			typ: "hotel",
			to: "whole",
			price: {
				base: {
					typ: "fixed",
					cost: { val: 500, currency: DEFAULT_EVENT_CURRENCY }
				}
			}
		});
	});
});
