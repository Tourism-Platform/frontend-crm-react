import { describe, expect, it } from "vitest";

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";

import {
	ENUM_SUPPLIER_FEE_FIELD,
	type ISupplierFeeFormRow,
	createEmptySupplierFeeRow
} from "../types";

import {
	mapSupplierFeeFromBackend,
	mapSupplierFeeToBackend,
	mapSupplierFeesFromBackend,
	mapSupplierFeesToBackend
} from "./supplier-fee.converters";

describe("supplier-fee.converters", () => {
	it("defaults empty fee currency to USD", () => {
		expect(
			createEmptySupplierFeeRow()[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]
		).toBe("USD");
	});

	it("maps a single fee from backend", () => {
		expect(
			mapSupplierFeeFromBackend({
				name: "VAT",
				cost: { val: 12, currency: ENUM_CURRENCY_BACKEND.USD },
				description: "tax"
			})
		).toEqual({
			[ENUM_SUPPLIER_FEE_FIELD.NAME]: "VAT",
			[ENUM_SUPPLIER_FEE_FIELD.COST]: 12,
			[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: "USD",
			[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: "tax"
		});
	});

	it("maps fees list from backend including empty", () => {
		expect(mapSupplierFeesFromBackend(null)).toEqual([]);
		expect(mapSupplierFeesFromBackend([])).toEqual([]);
		expect(
			mapSupplierFeesFromBackend([
				{
					name: "VAT",
					cost: { val: 12, currency: ENUM_CURRENCY_BACKEND.USD },
					description: null
				},
				{
					name: "City tax",
					cost: { val: 3000, currency: ENUM_CURRENCY_BACKEND.UZS },
					description: "per stay"
				}
			])
		).toHaveLength(2);
	});

	it("round-trips fee rows to backend", () => {
		const rows: ISupplierFeeFormRow[] = [
			{
				...createEmptySupplierFeeRow(),
				[ENUM_SUPPLIER_FEE_FIELD.NAME]: "VAT",
				[ENUM_SUPPLIER_FEE_FIELD.COST]: 12,
				[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: "USD"
			},
			{
				...createEmptySupplierFeeRow(),
				[ENUM_SUPPLIER_FEE_FIELD.NAME]: "City tax",
				[ENUM_SUPPLIER_FEE_FIELD.COST]: 3000,
				[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: "UZS",
				[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: "per stay"
			}
		];

		expect(mapSupplierFeesToBackend(rows)).toEqual([
			{
				name: "VAT",
				description: null,
				cost: { val: 12, currency: ENUM_CURRENCY_BACKEND.USD }
			},
			{
				name: "City tax",
				description: "per stay",
				cost: { val: 3000, currency: ENUM_CURRENCY_BACKEND.UZS }
			}
		]);
		expect(mapSupplierFeeToBackend(rows[0])).toEqual({
			name: "VAT",
			description: null,
			cost: { val: 12, currency: ENUM_CURRENCY_BACKEND.USD }
		});
	});

	it("maps empty fees list to null on write", () => {
		expect(mapSupplierFeesToBackend([])).toBeNull();
		expect(mapSupplierFeesToBackend(null)).toBeNull();
		expect(mapSupplierFeesToBackend(undefined)).toBeNull();
	});
});
