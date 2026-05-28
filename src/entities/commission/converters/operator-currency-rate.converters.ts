import type { IPaginationResponse } from "@/shared/types";

import type {
	IOperatorCurrencyRate,
	TOperatorCurrencyRateCreateSchema
} from "../types";
import type {
	TOperatorCurrencyRateBackend,
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

export const mapOperatorCurrencyRateListToFrontend = (
	data: TOperatorCurrencyRateResponse
): IPaginationResponse<IOperatorCurrencyRate> => ({
	data: data.map(mapOperatorCurrencyRateToFrontend),
	total: 100
});

export const mapOperatorCurrencyRateToBackend = (
	data: TOperatorCurrencyRateCreateSchema
): TOperatorCurrencyRateCreateBackend => ({
	from_currency: currencyConverter.to(data.from_currency)!,
	to_currency: currencyConverter.to(data.to_currency)!,
	rate: String(data.rate)
});
