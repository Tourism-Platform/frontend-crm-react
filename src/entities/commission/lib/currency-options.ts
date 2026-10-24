import type { SelectPickerOption } from "@/shared/ui";

import { CURRENCY_OPTIONS } from "../constants";
import type { ENUM_CURRENCY_OPTIONS_TYPE } from "../types";

/** Опции селекта только для переданных валют, в порядке CURRENCY_OPTIONS */
export const pickCurrencyOptions = (
	currencies: readonly ENUM_CURRENCY_OPTIONS_TYPE[]
): SelectPickerOption[] =>
	CURRENCY_OPTIONS.filter(({ value }) =>
		currencies.includes(value as ENUM_CURRENCY_OPTIONS_TYPE)
	);
