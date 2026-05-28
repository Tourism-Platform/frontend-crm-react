import type { ENUM_CURRENCY_OPTIONS_TYPE } from "./currency.types";

export interface IOperatorCurrencyRate {
	id: string;
	from_currency: ENUM_CURRENCY_OPTIONS_TYPE;
	to_currency: ENUM_CURRENCY_OPTIONS_TYPE;
	rate: number;
	valid_from: string;
}
