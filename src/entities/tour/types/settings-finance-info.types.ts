import { z } from "zod";

import type { SETTINGS_FINANCE_FORM_SCHEMA } from "../schema";

export const ENUM_SETTINGS_FINANCE_FORM = {
	CURRENCY_TYPE: "currencyType",
	PRICING_VISIBILITY: "pricingVisibility"
} as const;

export type ENUM_SETTINGS_FINANCE_FORM_TYPE =
	(typeof ENUM_SETTINGS_FINANCE_FORM)[keyof typeof ENUM_SETTINGS_FINANCE_FORM];

export type TSettingsFinanceFormSchema = z.infer<
	typeof SETTINGS_FINANCE_FORM_SCHEMA
>;
