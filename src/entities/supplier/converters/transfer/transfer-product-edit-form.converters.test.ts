import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_TRANSFER_PRICING,
	ENUM_TRANSFER_PRODUCT_EXPENSE_TYP,
	ENUM_TRANSFER_PRODUCT_PRICING_TYPE,
	ENUM_VEHICLE_BODY_TYPE,
	type ITransferProduct,
	type ITransferVariant
} from "../../types";

import { mapTransferProductToEditForm } from "./transfer-product-edit-form.converters";

const VARIANT: ITransferVariant = {
	id: "v1",
	name: "Sedan",
	bodyType: ENUM_VEHICLE_BODY_TYPE.SEDAN,
	pax: 3,
	description: null,
	expenses: {
		typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
		cost: { val: 40, currency: DEFAULT_EVENT_CURRENCY },
		fees: null,
		markup: {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: 0.1
		}
	},
	categories: []
};

const PRODUCT: ITransferProduct = {
	id: "p1",
	supplierId: "s1",
	supplierName: null,
	typ: ENUM_SUPPLIER_TYPE.TRANSFER,
	name: "Airport fleet",
	pricing: ENUM_TRANSFER_PRICING.PER_CAR,
	charge: null,
	imagePaths: [],
	primaryImagePath: null,
	variants: [VARIANT]
};

describe("mapTransferProductToEditForm", () => {
	it("defaults empty product pricing to flat_rate", () => {
		expect(mapTransferProductToEditForm(null).pricing.pricing_type).toBe(
			ENUM_TRANSFER_PRODUCT_PRICING_TYPE.FLAT_RATE
		);
		expect(
			mapTransferProductToEditForm(undefined).pricing.pricing_type
		).toBe(ENUM_TRANSFER_PRODUCT_PRICING_TYPE.FLAT_RATE);
	});

	it("maps per_car variants onto cars and expenses by index", () => {
		const form = mapTransferProductToEditForm(PRODUCT);

		expect(form.general.name).toBe("Airport fleet");
		expect(form.cars.cars[0]).toMatchObject({
			variant_id: "v1",
			name: "Sedan",
			car_name: ENUM_VEHICLE_BODY_TYPE.SEDAN,
			pax: 3
		});
		expect(form.pricing).toMatchObject({
			pricing_type: ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_CAR,
			price_based_on_class: false,
			add_margin_separately: true,
			expenses: {
				typ: ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR,
				cars: [
					{
						cost: 40,
						markup: {
							typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
							value: "10"
						}
					}
				]
			}
		});
	});

	it("maps per_car_category as per_car plus the class checkbox", () => {
		const form = mapTransferProductToEditForm({
			...PRODUCT,
			pricing: ENUM_TRANSFER_PRICING.PER_CAR_CATEGORY,
			variants: [
				{
					...VARIANT,
					expenses: null,
					categories: [
						{
							id: "c1",
							name: "economy",
							expenses: {
								typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
								cost: {
									val: 30,
									currency: DEFAULT_EVENT_CURRENCY
								},
								fees: null,
								markup: null
							}
						}
					]
				}
			]
		});

		expect(form.pricing.pricing_type).toBe(
			ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_CAR
		);
		expect(form.pricing.price_based_on_class).toBe(true);
		expect(form.pricing.expenses).toMatchObject({
			typ: ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR_CATEGORY,
			cars: [{ categories: [{ name: "economy", cost: 30 }] }]
		});
	});

	it("maps whole + fixed to flat_rate", () => {
		const form = mapTransferProductToEditForm({
			...PRODUCT,
			pricing: ENUM_TRANSFER_PRICING.WHOLE,
			charge: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: null
			}
		});

		expect(form.pricing).toMatchObject({
			pricing_type: ENUM_TRANSFER_PRODUCT_PRICING_TYPE.FLAT_RATE,
			price_based_on_class: false,
			total_price: 400,
			add_margin_separately: false
		});
	});

	it("maps whole + per_person to per_person", () => {
		const form = mapTransferProductToEditForm({
			...PRODUCT,
			pricing: ENUM_TRANSFER_PRICING.WHOLE,
			charge: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: { val: 25, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: {
					typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
					percentage: 0.1
				}
			}
		});

		expect(form.pricing).toMatchObject({
			pricing_type: ENUM_TRANSFER_PRODUCT_PRICING_TYPE.PER_PERSON,
			total_price: 25,
			add_margin_separately: true,
			markup: { typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE, value: "10" }
		});
	});
});
