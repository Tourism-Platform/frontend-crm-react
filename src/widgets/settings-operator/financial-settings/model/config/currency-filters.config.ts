import type { SelectPickerOption } from "@/shared/ui";

import { ENUM_OPERATOR_CURRENCY_RATE_FILTER } from "@/entities/commission";

import type { TForm } from "../types";

/** currencyOptions — from_currency из курсов: default_currency среди них не бывает */
export const CURRENCY_RATE_FILTERS_LIST = (
	currencyOptions: SelectPickerOption[]
): TForm[] => [
	{
		key: ENUM_OPERATOR_CURRENCY_RATE_FILTER.FROM_CURRENCY,
		label: "currency.filters.from_currency.label",
		placeholder: "currency.filters.from_currency.placeholder",
		fieldType: "select",
		options: currencyOptions
	}
];
