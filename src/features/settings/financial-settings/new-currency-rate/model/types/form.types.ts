import { z } from "zod";

import type { TFinancialSettingsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { NEW_CURRENCY_RATE_SCHEMA } from "../config";

export type TForm = TFormField<
	TFinancialSettingsPageKeys,
	ENUM_FORM_NEW_CURRENCY_RATE_TYPE
>;

export const ENUM_FORM_NEW_CURRENCY_RATE = {
	CURRENCY: "currency",
	RATE: "rate"
} as const;

export type ENUM_FORM_NEW_CURRENCY_RATE_TYPE =
	(typeof ENUM_FORM_NEW_CURRENCY_RATE)[keyof typeof ENUM_FORM_NEW_CURRENCY_RATE];

export type TNewCurrencyRateSchema = z.infer<typeof NEW_CURRENCY_RATE_SCHEMA>;
