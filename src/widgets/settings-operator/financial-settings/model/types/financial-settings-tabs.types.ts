import type { ComponentType } from "react";

import type { TFinancialSettingsPageOperatorKeys } from "@/shared/config";

export const ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB = {
	GENERAL: "general",
	PAYMENT_SETTINGS: "payment_settings",
	TAX_SETTINGS: "tax_settings",
	CURRENCY: "currency"
} as const;

export type ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB_TYPE =
	(typeof ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB)[keyof typeof ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB];

export interface IFinancialSettingsOperatorTab {
	type: ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB_TYPE;
	label: TFinancialSettingsPageOperatorKeys;
	slot: ComponentType;
}
