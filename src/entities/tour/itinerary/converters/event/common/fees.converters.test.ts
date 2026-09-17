import { describe, expect, it } from "vitest";

import { Currency } from "@/shared/api";

import {
	ENUM_FEE_FIELD,
	type IFeeFormRow,
	createEmptyFeeRow
} from "../../../types";

import {
	mapFeeFromBackend,
	mapFeeToBackend,
	mapFeesFromBackend,
	mapFeesToBackend
} from "./fees.converters";

describe("fees.converters", () => {
	it("maps a single fee from backend", () => {
		expect(
			mapFeeFromBackend({
				name: "VAT",
				cost: { val: 12, currency: Currency.USD },
				description: "tax"
			})
		).toEqual({
			[ENUM_FEE_FIELD.NAME]: "VAT",
			[ENUM_FEE_FIELD.COST]: 12,
			[ENUM_FEE_FIELD.CURRENCY]: "USD",
			[ENUM_FEE_FIELD.DESCRIPTION]: "tax"
		});
	});

	it("maps fees list from backend including empty", () => {
		expect(mapFeesFromBackend(null)).toEqual([]);
		expect(mapFeesFromBackend([])).toEqual([]);
		expect(
			mapFeesFromBackend([
				{ name: "VAT", cost: { val: 12, currency: Currency.USD } },
				{
					name: "City tax",
					cost: { val: 3000, currency: Currency.UZS },
					description: "per stay"
				}
			])
		).toHaveLength(2);
	});

	it("round-trips fee rows to backend", () => {
		const rows: IFeeFormRow[] = [
			{
				...createEmptyFeeRow(),
				[ENUM_FEE_FIELD.NAME]: "VAT",
				[ENUM_FEE_FIELD.COST]: 12,
				[ENUM_FEE_FIELD.CURRENCY]: "USD"
			},
			{
				...createEmptyFeeRow(),
				[ENUM_FEE_FIELD.NAME]: "City tax",
				[ENUM_FEE_FIELD.COST]: 3000,
				[ENUM_FEE_FIELD.CURRENCY]: "UZS",
				[ENUM_FEE_FIELD.DESCRIPTION]: "per stay"
			}
		];

		expect(mapFeesToBackend(rows)).toEqual([
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
		expect(mapFeeToBackend(rows[0])).toEqual({
			name: "VAT",
			description: null,
			cost: { val: 12, currency: Currency.USD }
		});
	});

	it("maps empty fees list to null on write", () => {
		expect(mapFeesToBackend([])).toBeNull();
		expect(mapFeesToBackend(null)).toBeNull();
		expect(mapFeesToBackend(undefined)).toBeNull();
	});
});
