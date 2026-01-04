import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import { PRICING_VISIBILITY_LABELS } from "@/entities/tour";

import { ENUM_FINANCE_FORM, type TFinanceForm } from "../types";

export const FINANCE_FORM_LIST = (): TFinanceForm[] => [
	{
		label: "finance.form.fields.currencyType.label",
		placeholder: "finance.form.fields.currencyType.placeholder",
		key: ENUM_FINANCE_FORM.CURRENCY_TYPE,
		fieldType: "select",
		options: CURRENCY_OPTIONS
	},
	{
		label: "finance.form.fields.pricingVisibility.label",
		placeholder: "finance.form.fields.pricingVisibility.placeholder",
		key: ENUM_FINANCE_FORM.PRICING_VISIBILITY,
		fieldType: "select",
		options: useValueToTranslateLabel(PRICING_VISIBILITY_LABELS)
	}
];
