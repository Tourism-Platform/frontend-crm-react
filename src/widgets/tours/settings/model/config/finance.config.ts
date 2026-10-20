import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_FOC_TIER_FIELD,
	ENUM_PACKAGE_MARKUP_TYP,
	ENUM_SETTINGS_FINANCE_FORM
} from "@/entities/tour";

import type { TFinanceForm, TFocTierForm } from "../types";

export const FINANCE_FORM_LIST = (): TFinanceForm[] => [
	{
		label: "finance.form.fields.currencyType.label",
		placeholder: "finance.form.fields.currencyType.placeholder",
		key: ENUM_SETTINGS_FINANCE_FORM.CURRENCY_TYPE,
		fieldType: "select",
		options: CURRENCY_OPTIONS
	}
];

export const FOC_TIER_FORM_LIST = (): TFocTierForm[] => [
	{
		label: "finance.form.fields.foc.minPax.label",
		placeholder: "finance.form.fields.foc.minPax.placeholder",
		key: ENUM_FOC_TIER_FIELD.MIN_PAX,
		fieldType: "input",
		type: "number",
		min: 1,
		step: "1"
	},
	{
		label: "finance.form.fields.foc.free.label",
		placeholder: "finance.form.fields.foc.free.placeholder",
		key: ENUM_FOC_TIER_FIELD.FREE,
		fieldType: "input",
		type: "number",
		min: 1,
		step: "1"
	}
];

export const TOUR_MARKUP_TYPE_OPTIONS = [
	{ label: "Fx", value: ENUM_PACKAGE_MARKUP_TYP.FIXED },
	{ label: "%", value: ENUM_PACKAGE_MARKUP_TYP.PERCENTAGE }
] as const;

export const TOUR_MARKUP_FIELD = {
	key: ENUM_SETTINGS_FINANCE_FORM.MARKUP,
	label: "finance.form.fields.markup.label",
	placeholder: "finance.form.fields.markup.placeholder",
	selectOptions: TOUR_MARKUP_TYPE_OPTIONS
} as const;
