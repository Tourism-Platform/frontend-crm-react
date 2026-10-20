import type { IPaginationRequest } from "@/shared/types";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "./currency.types";

export interface IOperatorCurrencyRate {
	id: string;
	from_currency: ENUM_CURRENCY_OPTIONS_TYPE;
	to_currency: ENUM_CURRENCY_OPTIONS_TYPE;
	rate: number;
	valid_from: string;
}

export const ENUM_OPERATOR_CURRENCY_RATE_FILTER = {
	FROM_CURRENCY: "fromCurrency",
	TO_CURRENCY: "toCurrency"
} as const;

export type ENUM_OPERATOR_CURRENCY_RATE_FILTER_TYPE =
	(typeof ENUM_OPERATOR_CURRENCY_RATE_FILTER)[keyof typeof ENUM_OPERATOR_CURRENCY_RATE_FILTER];

export interface IOperatorCurrencyRateFilters extends IPaginationRequest {
	fromCurrency?: ENUM_CURRENCY_OPTIONS_TYPE;
	toCurrency?: ENUM_CURRENCY_OPTIONS_TYPE;
}
