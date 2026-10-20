import {
	CURRENCY_OPTIONS,
	ENUM_OPERATOR_CURRENCY_RATE_FILTER
} from "@/entities/commission";

import type { TForm } from "../types";

export const CURRENCY_RATE_FILTERS_LIST: TForm[] = [
	{
		key: ENUM_OPERATOR_CURRENCY_RATE_FILTER.FROM_CURRENCY,
		label: "currency.filters.from_currency.label",
		placeholder: "currency.filters.from_currency.placeholder",
		fieldType: "select",
		options: CURRENCY_OPTIONS
	},
	{
		key: ENUM_OPERATOR_CURRENCY_RATE_FILTER.TO_CURRENCY,
		label: "currency.filters.to_currency.label",
		placeholder: "currency.filters.to_currency.placeholder",
		fieldType: "select",
		options: CURRENCY_OPTIONS
	}
];
