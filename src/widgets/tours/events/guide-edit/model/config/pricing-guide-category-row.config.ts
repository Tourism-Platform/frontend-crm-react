import { useValueToTranslateLabel } from "@/shared/utils";

import { CURRENCY_OPTIONS } from "@/entities/commission";
import {
	ENUM_GUIDE_CATEGORY_ROW_FIELD,
	ENUM_GUIDE_PRICE_ROW_FIELD,
	LANGUAGES_LABELS
} from "@/entities/tour";

import { DEFAULT_EVENT_CURRENCY } from "../../../model";
import type { TGuidePricingFormField } from "../types";

export const PER_GUIDE_CATEGORY_ROW_FIELDS_LIST =
	(): TGuidePricingFormField[] => [
		{
			key: ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG,
			label: "form.pricing.form.per_guide.table.language",
			placeholder:
				"form.pricing.form.per_guide.fields.language.placeholder",
			fieldType: "select",
			options: useValueToTranslateLabel(LANGUAGES_LABELS)
		},
		{
			key: ENUM_GUIDE_CATEGORY_ROW_FIELD.COST,
			label: "form.pricing.form.per_guide.table.cost",
			placeholder:
				"form.pricing.form.per_guide.fields.total_cost.placeholder",
			fieldType: "input",
			type: "number"
		},
		{
			key: ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES,
			label: "form.pricing.form.per_guide.table.fees",
			placeholder:
				"form.pricing.form.per_guide.fields.taxes_fees.placeholder",
			fieldType: "input",
			type: "number"
		},
		{
			key: ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY,
			label: "form.pricing.form.per_guide.table.currency",
			placeholder:
				"form.pricing.form.per_guide.fields.currency.placeholder",
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];

export const createEmptyPerGuideCategoryRow = () => ({
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.LANG]: "",
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.COST]: null,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.FEES]: null,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.CURRENCY]: DEFAULT_EVENT_CURRENCY,
	[ENUM_GUIDE_CATEGORY_ROW_FIELD.MARKUP]: null
});

export const PER_GUIDE_ROW_FIELDS_LIST: TGuidePricingFormField[] = [
	{
		key: ENUM_GUIDE_PRICE_ROW_FIELD.COST,
		label: "form.pricing.form.per_guide.fields.total_cost.label",
		placeholder:
			"form.pricing.form.per_guide.fields.total_cost.placeholder",
		fieldType: "input",
		type: "number"
	},
	{
		key: ENUM_GUIDE_PRICE_ROW_FIELD.FEES,
		label: "form.pricing.form.per_guide.fields.taxes_fees.label",
		placeholder:
			"form.pricing.form.per_guide.fields.taxes_fees.placeholder",
		fieldType: "input",
		type: "number"
	},
	{
		key: ENUM_GUIDE_PRICE_ROW_FIELD.CURRENCY,
		label: "form.pricing.form.per_guide.table.currency",
		placeholder: "form.pricing.form.per_guide.fields.currency.placeholder",
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		defaultValue: DEFAULT_EVENT_CURRENCY
	}
];
