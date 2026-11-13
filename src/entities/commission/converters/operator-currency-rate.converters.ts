import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import type {
	IOperatorCurrencyRate,
	IOperatorCurrencyRateQuery
} from "../types";
import type {
	TOperatorCurrencyRateBackend,
	TOperatorCurrencyRateQuery,
	TOperatorCurrencyRateResponse
} from "../types/operator-currency-rate-backend.interface";

import { currencyConverter } from "./currency.converters";

export const mapOperatorCurrencyRateToFrontend = (
	data: TOperatorCurrencyRateBackend
): IOperatorCurrencyRate => ({
	id: `${data.from_currency}-${data.to_currency}`,
	from_currency: currencyConverter.from(data.from_currency)!,
	to_currency: currencyConverter.from(data.to_currency)!,
	rate: Number(data.rate),
	rate_with_margin: Number(data.rate_with_margin),
	rate_date: data.rate_date
});

export const mapOperatorCurrencyRateListToFrontend = (
	data: TOperatorCurrencyRateResponse
): IOperatorCurrencyRate[] => data.map(mapOperatorCurrencyRateToFrontend);

export const mapOperatorCurrencyRateQueryToBackend = (
	query: IOperatorCurrencyRateQuery
): TOperatorCurrencyRateQuery => ({
	...(!!query.fromCurrency?.length && {
		from_currency: currencyConverter.toMany(query.fromCurrency)
	}),
	...(!!query.toCurrency?.length && {
		to_currency: currencyConverter.toMany(query.toCurrency)
	}),
	...(query.scope && { scope: query.scope })
});

/** Бэк фильтрует по валютам, но не пагинирует — страницу режем на клиенте */
export const paginateOperatorCurrencyRates = (
	rates: IOperatorCurrencyRate[],
	{ page, limit }: IPaginationRequest
): IPaginationResponse<IOperatorCurrencyRate> => {
	const start = (page - 1) * limit;

	return {
		data: rates.slice(start, start + limit),
		total: rates.length
	};
};
