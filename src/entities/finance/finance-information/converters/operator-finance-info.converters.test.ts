import { describe, expect, it } from "vitest";

import {
	ENUM_CURRENCY_BACKEND,
	ENUM_CURRENCY_OPTIONS
} from "@/entities/commission/types/currency.types";
import { OPERATOR_FINANCIAL_MOCK } from "@/entities/user/operator/mock/operator-financial.mock";

import {
	mapOperatorFinanceInfoToBackend,
	mapOperatorFinanceInfoToFrontend
} from "./operator-finance-info.converters";

describe("mapOperatorFinanceInfoToFrontend", () => {
	it("maps accepted currencies and fx margin as percent", () => {
		expect(
			mapOperatorFinanceInfoToFrontend(OPERATOR_FINANCIAL_MOCK)
		).toMatchObject({
			defaultCurrency: ENUM_CURRENCY_OPTIONS.USD,
			acceptedCurrencies: [
				ENUM_CURRENCY_OPTIONS.USD,
				ENUM_CURRENCY_OPTIONS.EUR,
				ENUM_CURRENCY_OPTIONS.UZS
			],
			fxMargin: 2
		});
	});

	it("rounds fx margin percent without float noise", () => {
		const toPercent = (fx_margin: string) =>
			mapOperatorFinanceInfoToFrontend({
				...OPERATOR_FINANCIAL_MOCK,
				fx_margin
			}).fxMargin;

		expect(toPercent("0.07")).toBe(7);
		expect(toPercent("0.29")).toBe(29);
		expect(toPercent("0.0125")).toBe(1.25);
	});
});

describe("mapOperatorFinanceInfoToBackend", () => {
	it("sends accepted currencies and fx margin as a fraction", () => {
		expect(
			mapOperatorFinanceInfoToBackend({
				acceptedCurrencies: [
					ENUM_CURRENCY_OPTIONS.UZS,
					ENUM_CURRENCY_OPTIONS.CNY
				],
				fxMargin: 2.5
			})
		).toEqual({
			accepted_currencies: [
				ENUM_CURRENCY_BACKEND.UZS,
				ENUM_CURRENCY_BACKEND.CNY
			],
			fx_margin: "0.025"
		});
	});

	it("rounds fx margin fraction without float noise", () => {
		expect(mapOperatorFinanceInfoToBackend({ fxMargin: 7 })).toEqual({
			fx_margin: "0.07"
		});
		expect(mapOperatorFinanceInfoToBackend({ fxMargin: 0.3 })).toEqual({
			fx_margin: "0.003"
		});
	});

	it("keeps zero margin and omits untouched fields", () => {
		expect(mapOperatorFinanceInfoToBackend({ fxMargin: 0 })).toEqual({
			fx_margin: "0"
		});
		expect(mapOperatorFinanceInfoToBackend({ vatEnabled: true })).toEqual({
			vat_enabled: true
		});
	});
});
