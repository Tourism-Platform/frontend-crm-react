import { CurrencyCode } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_CURRENCY_OPTIONS,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "../types";

const MAP_CURENCY: Partial<Record<ENUM_CURRENCY_OPTIONS_TYPE, CurrencyCode>> = {
	[ENUM_CURRENCY_OPTIONS.USD]: CurrencyCode.USD,
	[ENUM_CURRENCY_OPTIONS.EUR]: CurrencyCode.EUR
};

export const currencyConverter = createEnumMapper<
	ENUM_CURRENCY_OPTIONS_TYPE,
	CurrencyCode
>(MAP_CURENCY);
