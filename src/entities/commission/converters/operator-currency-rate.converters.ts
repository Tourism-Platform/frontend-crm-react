import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

import type {
	IOperatorCurrencyRate,
	IOperatorCurrencyRateFilters,
	TOperatorCurrencyRateCreateSchema
} from "../types";
import type {
	TOperatorCurrencyRateBackend,
	TOperatorCurrencyRateBackendQuery,
	TOperatorCurrencyRateCreateBackend,
	TOperatorCurrencyRateResponse
} from "../types/operator-currency-rate-backend.interface";

import { currencyConverter } from "./currency.coverters";

export const mapOperatorCurrencyRateToFrontend = (
	data: TOperatorCurrencyRateBackend
): IOperatorCurrencyRate => ({
	id: data.id,
	from_currency: data.from_currency,
	to_currency: data.to_currency,
	rate: Number(data.rate),
	valid_from: data.valid_from
});

export const mapOperatorCurrencyRateFiltersToBackend = (
	filters: IOperatorCurrencyRateFilters
): TOperatorCurrencyRateBackendQuery => ({
	...(filters.page > 1 && { skip: (filters.page - 1) * filters.limit }),
	...(filters.limit && { limit: filters.limit }),
	...(filters.fromCurrency && {
		from_currency: currencyConverter.to(filters.fromCurrency)
	}),
	...(filters.toCurrency && {
		to_currency: currencyConverter.to(filters.toCurrency)
	})
});

export const mapOperatorCurrencyRateListToFrontend = (
	data: TOperatorCurrencyRateResponse
): IPaginationResponse<IOperatorCurrencyRate> => ({
	data: data.map(mapOperatorCurrencyRateToFrontend),
	total: TEMP_LIST_TOTAL
});

export const mapOperatorCurrencyRateToBackend = (
	data: TOperatorCurrencyRateCreateSchema
): TOperatorCurrencyRateCreateBackend => ({
	from_currency: currencyConverter.to(data.from_currency)!,
	to_currency: currencyConverter.to(data.to_currency)!,
	rate: String(data.rate)
});
