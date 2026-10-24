import {
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE,
	currencyConverter
} from "@/entities/commission";

import type { TMonetaryValueBackend } from "../types";
import type { IMonetaryValue } from "../types/supplier-money.types";

export const mapMonetaryToBackend = (
	data: IMonetaryValue
): TMonetaryValueBackend => ({
	val: data.val,
	currency: currencyConverter.to(data.currency)!
});

export const mapMonetaryFromBackend = (
	value?: TMonetaryValueBackend | null
): IMonetaryValue => ({
	val: value?.val ?? 0,
	currency: currencyConverter.from(value?.currency) ?? DEFAULT_EVENT_CURRENCY
});

export type { ENUM_CURRENCY_OPTIONS_TYPE };
