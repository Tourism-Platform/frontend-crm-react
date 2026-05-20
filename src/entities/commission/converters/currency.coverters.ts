import { Currency } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_CURRENCY_OPTIONS,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "../types";

const MAP_CURENCY: Record<ENUM_CURRENCY_OPTIONS_TYPE, Currency> = {
	[ENUM_CURRENCY_OPTIONS.UZS]: Currency.UZS,
	[ENUM_CURRENCY_OPTIONS.USD]: Currency.USD,
	[ENUM_CURRENCY_OPTIONS.EUR]: Currency.EUR,
	[ENUM_CURRENCY_OPTIONS.RUB]: Currency.RUB,
	[ENUM_CURRENCY_OPTIONS.GBP]: Currency.GBP
};

export const currencyConverter = createEnumMapper<
	ENUM_CURRENCY_OPTIONS_TYPE,
	Currency
>(MAP_CURENCY);
