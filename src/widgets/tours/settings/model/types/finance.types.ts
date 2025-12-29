import type { TTourSettingsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

export const ENUM_FINANCE_FORM = {
	CURRENCY_TYPE: "currencyType",
	PRICING_VISIBILITY: "pricingVisibility"
} as const;

export type ENUM_FINANCE_FORM_TYPE =
	(typeof ENUM_FINANCE_FORM)[keyof typeof ENUM_FINANCE_FORM];

export type TFinanceForm = TFormField<
	TTourSettingsPageKeys,
	ENUM_FINANCE_FORM_TYPE
>;
