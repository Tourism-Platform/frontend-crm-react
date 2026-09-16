import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api/generated/Api";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_HOTEL_PRICING,
	ENUM_HOTEL_PRODUCT_EXPENSE_TYP,
	ENUM_HOTEL_PRODUCT_PRICING_TYPE,
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE,
	type IHotelProduct,
	type IHotelVariant
} from "../../types";

import { mapHotelProductToEditForm } from "./hotel-product-edit-form.converters";

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
	supplierName: null,
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

describe("mapHotelProductToEditForm", () => {
	it("defaults empty product pricing to flat_rate", () => {
		expect(mapHotelProductToEditForm(null).pricing.pricing_type).toBe(
			ENUM_HOTEL_PRODUCT_PRICING_TYPE.FLAT_RATE
		);
		expect(mapHotelProductToEditForm(undefined).pricing.pricing_type).toBe(
			ENUM_HOTEL_PRODUCT_PRICING_TYPE.FLAT_RATE
		);
	});

	it("maps per_room variants onto rooms and expenses by index", () => {
		const form = mapHotelProductToEditForm(PRODUCT);

		expect(form.general.name).toBe("Hyatt");
		expect(form.rooms.rooms[0]).toMatchObject({
			variant_id: "v1",
			room_name: "Deluxe Double"
		});
		expect(form.pricing).toMatchObject({
			pricing_type: ENUM_HOTEL_PRODUCT_PRICING_TYPE.PER_ROOM,
			price_based_on_class: false,
			add_margin_separately: true,
			expenses: {
				typ: ENUM_HOTEL_PRODUCT_EXPENSE_TYP.PER_ROOM,
				rooms: [
					{
						cost: 120,
						markup: {
							typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
							value: "10"
						}
					}
				]
			}
		});
	});

	it("maps whole + fixed to flat_rate", () => {
		const form = mapHotelProductToEditForm({
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

		expect(form.pricing).toMatchObject({
			pricing_type: ENUM_HOTEL_PRODUCT_PRICING_TYPE.FLAT_RATE,
			price_based_on_class: false,
			total_price: 400,
			add_margin_separately: false
		});
	});

	it("maps whole + per_person to per_person", () => {
		const form = mapHotelProductToEditForm({
			...PRODUCT,
			pricing: ENUM_HOTEL_PRICING.WHOLE,
			stayRate: {
				base: {
					typ: "per_person",
					cost_per_person: {
						val: 25,
						currency: Currency.USD
					},
					fees: null,
					extra_costs: [],
					markup: {
						typ: "percentage",
						percentage: 0.1
					}
				},
				seasons: []
			}
		});

		expect(form.pricing).toMatchObject({
			pricing_type: ENUM_HOTEL_PRODUCT_PRICING_TYPE.PER_PERSON,
			total_price: 25,
			add_margin_separately: true,
			markup: { typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE, value: "10" }
		});
	});
});
