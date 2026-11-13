import type { SelectPickerOption } from "@/shared/ui";

import {
	ENUM_OPERATOR_CURRENCY_RATE_FILTER,
	type ENUM_OPERATOR_CURRENCY_RATE_FILTER_TYPE
} from "@/entities/commission";

import type { TForm } from "../types";

/** Валюты — из полного списка курсов, охват — all/accepted бэка */
export const CURRENCY_RATE_FILTERS_LIST = (
	options: Record<
		ENUM_OPERATOR_CURRENCY_RATE_FILTER_TYPE,
		SelectPickerOption[]
	>
): TForm[] => [
	{
		key: ENUM_OPERATOR_CURRENCY_RATE_FILTER.FROM_CURRENCY,
		label: "currency.filters.from_currency.label",
		placeholder: "currency.filters.from_currency.placeholder",
		fieldType: "select",
		options: options[ENUM_OPERATOR_CURRENCY_RATE_FILTER.FROM_CURRENCY]
	},
	{
		key: ENUM_OPERATOR_CURRENCY_RATE_FILTER.TO_CURRENCY,
		label: "currency.filters.to_currency.label",
		placeholder: "currency.filters.to_currency.placeholder",
		fieldType: "select",
		options: options[ENUM_OPERATOR_CURRENCY_RATE_FILTER.TO_CURRENCY]
	},
	{
		key: ENUM_OPERATOR_CURRENCY_RATE_FILTER.SCOPE,
		label: "currency.filters.scope.label",
		placeholder: "currency.filters.scope.placeholder",
		fieldType: "select",
		options: options[ENUM_OPERATOR_CURRENCY_RATE_FILTER.SCOPE]
	}
];
