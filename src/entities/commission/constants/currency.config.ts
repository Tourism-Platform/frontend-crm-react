import type { TOptionsKeys } from "@/shared/config";
import { valueToLabel } from "@/shared/utils";

import {
	ENUM_CURRENCY_OPTIONS,
	ENUM_OPERATOR_CURRENCY_RATE_SCOPE,
	type ENUM_OPERATOR_CURRENCY_RATE_SCOPE_TYPE
} from "../types";

export const CURRENCY_LABELS = {
	[ENUM_CURRENCY_OPTIONS.UZS]: "UZS",
	[ENUM_CURRENCY_OPTIONS.USD]: "USD",
	[ENUM_CURRENCY_OPTIONS.EUR]: "EUR",
	[ENUM_CURRENCY_OPTIONS.RUB]: "RUB",
	[ENUM_CURRENCY_OPTIONS.GBP]: "GBP",
	[ENUM_CURRENCY_OPTIONS.CNY]: "CNY"
} as const;

export const CURRENCY_OPTIONS = valueToLabel(CURRENCY_LABELS);

export const OPERATOR_CURRENCY_RATE_SCOPE_LABELS: Record<
	ENUM_OPERATOR_CURRENCY_RATE_SCOPE_TYPE,
	TOptionsKeys
> = {
	[ENUM_OPERATOR_CURRENCY_RATE_SCOPE.ALL]: "finance.currencyRates.scopes.all",
	[ENUM_OPERATOR_CURRENCY_RATE_SCOPE.ACCEPTED]:
		"finance.currencyRates.scopes.accepted"
};
