import type { FxRateCreateSchema, OperatorFxRateModel } from "@/shared/api";
import { createMockIdSequence } from "@/shared/api";

import { CURRENCY_MOCK, MOCK_OPERATOR_ID } from "./currency.mock";

const createFxRateStore = () =>
	new Map(CURRENCY_MOCK.map((rate) => [rate.id, structuredClone(rate)]));

let fxRateStore = createFxRateStore();
const fxRateIds = createMockIdSequence("e100", 1);

interface IFxRateFilter {
	fromCurrency: string | null;
	toCurrency: string | null;
}

/** Курсы от новых к старым, как на бэкенде */
export const listFxRates = ({ fromCurrency, toCurrency }: IFxRateFilter) =>
	[...fxRateStore.values()]
		.filter(
			(rate) =>
				(!fromCurrency || rate.from_currency === fromCurrency) &&
				(!toCurrency || rate.to_currency === toCurrency)
		)
		.sort((a, b) => b.valid_from.localeCompare(a.valid_from));

export const getFxRate = (fxRateId: string) => fxRateStore.get(fxRateId);

export const recordFxRate = (body: FxRateCreateSchema): OperatorFxRateModel => {
	const rate: OperatorFxRateModel = {
		id: fxRateIds.next(),
		operator_id: MOCK_OPERATOR_ID,
		from_currency: body.from_currency,
		to_currency: body.to_currency,
		rate: String(body.rate),
		valid_from: new Date().toISOString(),
		created_by: null
	};
	fxRateStore.set(rate.id, rate);
	return rate;
};

export const updateFxRate = (fxRateId: string, rateValue: number | string) => {
	const rate = fxRateStore.get(fxRateId);
	if (!rate) return undefined;
	rate.rate = String(rateValue);
	return rate;
};

export const deleteFxRate = (fxRateId: string) => fxRateStore.delete(fxRateId);

export const resetFxRateStore = () => {
	fxRateStore = createFxRateStore();
	fxRateIds.reset(1);
};
