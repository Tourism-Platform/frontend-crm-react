import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api";

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
	it("maps a single fee from backend", () => {
		expect(
			mapSupplierFeeFromBackend({
				name: "VAT",
				cost: { val: 12, currency: Currency.USD },
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
					cost: { val: 12, currency: Currency.USD },
					description: null
				},
				{
					name: "City tax",
					cost: { val: 3000, currency: Currency.UZS },
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
				cost: { val: 12, currency: Currency.USD }
			},
			{
				name: "City tax",
				description: "per stay",
				cost: { val: 3000, currency: Currency.UZS }
			}
		]);
		expect(mapSupplierFeeToBackend(rows[0])).toEqual({
			name: "VAT",
			description: null,
			cost: { val: 12, currency: Currency.USD }
		});
	});

	it("maps empty fees list to null on write", () => {
		expect(mapSupplierFeesToBackend([])).toBeNull();
		expect(mapSupplierFeesToBackend(null)).toBeNull();
		expect(mapSupplierFeesToBackend(undefined)).toBeNull();
	});
});
