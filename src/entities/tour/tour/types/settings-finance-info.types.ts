import { z } from "zod";

import type { SETTINGS_FINANCE_FORM_SCHEMA } from "../schema";

export const ENUM_SETTINGS_FINANCE_FORM = {
	CURRENCY_TYPE: "currencyType",
	FOC_TIERS: "focTiers"
} as const;

export const ENUM_FOC_TIER_FIELD = {
	MIN_PAX: "minPax",
	FREE: "free"
} as const;

export type ENUM_SETTINGS_FINANCE_FORM_TYPE =
	(typeof ENUM_SETTINGS_FINANCE_FORM)[keyof typeof ENUM_SETTINGS_FINANCE_FORM];

export type ENUM_FOC_TIER_FIELD_TYPE =
	(typeof ENUM_FOC_TIER_FIELD)[keyof typeof ENUM_FOC_TIER_FIELD];

export type TSettingsFinanceFormSchema = z.infer<
	typeof SETTINGS_FINANCE_FORM_SCHEMA
>;
