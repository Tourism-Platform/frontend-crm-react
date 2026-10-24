import type { IPaginationResponse } from "@/shared/types";

import type {
	IOperatorCurrencyRate,
	IOperatorCurrencyRateFilters
} from "../types";
import type {
	TOperatorCurrencyRateBackend,
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

/** Бэк отдаёт весь список без фильтров и пагинации — считаем на клиенте */
export const filterOperatorCurrencyRates = (
	rates: IOperatorCurrencyRate[],
	{ page, limit, fromCurrency }: IOperatorCurrencyRateFilters
): IPaginationResponse<IOperatorCurrencyRate> => {
	const filtered = rates.filter(
		(rate) => !fromCurrency || rate.from_currency === fromCurrency
	);
	const start = (page - 1) * limit;

	return {
		data: filtered.slice(start, start + limit),
		total: filtered.length
	};
};
