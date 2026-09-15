import { describe, expect, it } from "vitest";

import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_SUPPLIER_SURCHARGE,
	ENUM_SUPPLIER_TYPE,
	ENUM_SUPPLIER_VARIANT_CHARGE,
	ENUM_TRANSFER_PRICING,
	ENUM_TRANSFER_PRODUCT_EXPENSE_TYP,
	ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD,
	ENUM_VEHICLE_BODY_TYPE,
	type ITransferProduct,
	type ITransferVariant
} from "../../types";

import { mapTransferProductToEditForm } from "./transfer-product-edit-form.converters";
import {
	alignTransferPerCarExpenses,
	mapTransferEditFormToPricingSwitch
} from "./transfer-product-pricing.converters";

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
	typ: ENUM_SUPPLIER_TYPE.TRANSFER,
	name: "Airport fleet",
	pricing: ENUM_TRANSFER_PRICING.PER_CAR,
	charge: null,
	imagePaths: [],
	primaryImagePath: null,
	variants: [VARIANT]
};

describe("mapTransferEditFormToPricingSwitch", () => {
	it("builds ToPerCar from expenses aligned by index", () => {
		const values = mapTransferProductToEditForm(PRODUCT);
		values.pricing.expenses = {
			typ: ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR,
			cars: [
				{
					cost: 55,
					fees: [],
					currency: DEFAULT_EVENT_CURRENCY,
					markup: {
						typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
						value: "10"
					}
				}
			]
		};

		expect(mapTransferEditFormToPricingSwitch(values)).toMatchObject({
			typ: "transfer",
			to: "per_car",
			cars: [
				{
					variant_id: "v1",
					charge: {
						typ: "fixed",
						cost: { val: 55, currency: DEFAULT_EVENT_CURRENCY },
						markup: { typ: "percentage", percentage: 0.1 }
					}
				}
			]
		});
	});

	it("maps checkbox off to markup null", () => {
		const values = mapTransferProductToEditForm(PRODUCT);
		values.pricing.add_margin_separately = false;

		const result = mapTransferEditFormToPricingSwitch(values);

		expect(
			result.to === "per_car" ? result.cars[0].charge.markup : undefined
		).toBeNull();
	});

	it("builds ToPerCarCategory without category ids", () => {
		const values = mapTransferProductToEditForm({
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
								markup: {
									typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
									percentage: 0.1
								}
							}
						}
					]
				}
			]
		});

		expect(mapTransferEditFormToPricingSwitch(values)).toEqual({
			typ: "transfer",
			to: "per_car_category",
			cars: [
				{
					variant_id: "v1",
					categories: [
						{
							name: "economy",
							charge: {
								typ: "fixed",
								cost: {
									val: 30,
									currency: DEFAULT_EVENT_CURRENCY
								},
								fees: null,
								markup: {
									typ: "percentage",
									percentage: 0.1
								}
							}
						}
					]
				}
			]
		});
	});

	it("builds ToWholeTransfer from total_price", () => {
		const values = mapTransferProductToEditForm({
			...PRODUCT,
			pricing: ENUM_TRANSFER_PRICING.WHOLE,
			charge: {
				typ: ENUM_SUPPLIER_VARIANT_CHARGE.FIXED,
				cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY },
				fees: null,
				markup: {
					typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
					percentage: 0.1
				}
			}
		});

		expect(mapTransferEditFormToPricingSwitch(values)).toMatchObject({
			typ: "transfer",
			to: "whole",
			charge: {
				typ: "fixed",
				cost: { val: 400, currency: DEFAULT_EVENT_CURRENCY },
				markup: { typ: "percentage", percentage: 0.1 }
			}
		});
	});
});

describe("alignTransferPerCarExpenses", () => {
	it("keeps cars and expenses the same length", () => {
		const aligned = alignTransferPerCarExpenses({
			priceBasedOnClass: false,
			carsListLength: 2,
			current: {
				typ: ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR,
				[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]: [
					{
						cost: 10,
						fees: [],
						currency: DEFAULT_EVENT_CURRENCY,
						markup: null
					}
				]
			}
		});

		expect(aligned.typ).toBe(ENUM_TRANSFER_PRODUCT_EXPENSE_TYP.PER_CAR);
		expect(
			aligned[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS]
		).toHaveLength(2);
		expect(
			aligned[ENUM_TRANSFER_PRODUCT_PER_CAR_EXPENSES_FIELD.CARS][0]
		).toMatchObject({ cost: 10 });
	});
});
