import { z } from "zod";

import type { OPERATOR_TAX_SETTINGS_SCHEMA } from "../schema";

export const ENUM_FORM_OPERATOR_TAX_SETTINGS = {
	VAT_ENABLED: "vatEnabled",
	VAT_RATE: "vatRate",
	PROFIT_TAX_ENABLED: "profitTaxEnabled",
	PROFIT_TAX_RATE: "profitTaxRate"
} as const;

export type ENUM_FORM_OPERATOR_TAX_SETTINGS_TYPE =
	(typeof ENUM_FORM_OPERATOR_TAX_SETTINGS)[keyof typeof ENUM_FORM_OPERATOR_TAX_SETTINGS];

export type TOperatorTaxSettingsSchema = z.infer<
	typeof OPERATOR_TAX_SETTINGS_SCHEMA
>;
