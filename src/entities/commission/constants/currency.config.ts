import { valueToLabel } from "@/shared/utils";

import { ENUM_CURRENCY_OPTIONS } from "../types";

export const CURRENCY_LABELS = {
	[ENUM_CURRENCY_OPTIONS.USD]: "USD",
	[ENUM_CURRENCY_OPTIONS.EUR]: "EUR",
	[ENUM_CURRENCY_OPTIONS.GBP]: "GBP"
} as const;

export const CURRENCY_OPTIONS = valueToLabel(CURRENCY_LABELS);
