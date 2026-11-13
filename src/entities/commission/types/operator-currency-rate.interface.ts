import { FxRateScope } from "@/shared/api";
import type { IPaginationRequest } from "@/shared/types";

import type { ENUM_CURRENCY_OPTIONS_TYPE } from "./currency.types";

/** Какие валюты обходит список: все поддерживаемые или только принимаемые оператором */
export const ENUM_OPERATOR_CURRENCY_RATE_SCOPE = {
	ALL: FxRateScope.All,
	ACCEPTED: FxRateScope.Accepted
} as const;

export type ENUM_OPERATOR_CURRENCY_RATE_SCOPE_TYPE = FxRateScope;

/** Параметры запроса курсов: фильтрует бэк, пагинации нет */
export interface IOperatorCurrencyRateQuery {
	fromCurrency?: ENUM_CURRENCY_OPTIONS_TYPE[];
	toCurrency?: ENUM_CURRENCY_OPTIONS_TYPE[];
	scope?: ENUM_OPERATOR_CURRENCY_RATE_SCOPE_TYPE;
}

export interface IOperatorCurrencyRate {
	/** Ключ строки таблицы: бэк не отдаёт id, пара валют уникальна */
	id: string;
	from_currency: ENUM_CURRENCY_OPTIONS_TYPE;
	to_currency: ENUM_CURRENCY_OPTIONS_TYPE;
	rate: number;
	rate_with_margin: number;
	rate_date: string | null;
}

export const ENUM_OPERATOR_CURRENCY_RATE_FILTER = {
	FROM_CURRENCY: "fromCurrency",
	TO_CURRENCY: "toCurrency",
	SCOPE: "scope"
} as const;

export type ENUM_OPERATOR_CURRENCY_RATE_FILTER_TYPE =
	(typeof ENUM_OPERATOR_CURRENCY_RATE_FILTER)[keyof typeof ENUM_OPERATOR_CURRENCY_RATE_FILTER];

/** Фильтры формы: по одной валюте с каждой стороны, в запрос уходят массивом */
export interface IOperatorCurrencyRateFilters extends IPaginationRequest {
	fromCurrency?: ENUM_CURRENCY_OPTIONS_TYPE;
	toCurrency?: ENUM_CURRENCY_OPTIONS_TYPE;
	scope?: ENUM_OPERATOR_CURRENCY_RATE_SCOPE_TYPE;
}
