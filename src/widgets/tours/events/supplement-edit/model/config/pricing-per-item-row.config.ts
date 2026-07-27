import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import { ENUM_SUPPLEMENT_PRICE_ROW_FIELD } from "@/entities/tour";

import type { TSupplementPricingFormField } from "../types";

export const PER_ITEM_ROW_FIELDS_LIST: TSupplementPricingFormField[] = [
	{
		key: ENUM_SUPPLEMENT_PRICE_ROW_FIELD.COST,
		label: "form.pricing.form.per_item.fields.total_cost.label",
		placeholder: "form.pricing.form.per_item.fields.total_cost.placeholder",
		fieldType: "input",
		type: "number"
	},
	// Backend SupplementaryItem has no `fees` — hide until API supports it
	// {
	// 	key: ENUM_SUPPLEMENT_PRICE_ROW_FIELD.FEES,
	// 	label: "form.pricing.form.per_item.fields.taxes_fees.label",
	// 	placeholder: "form.pricing.form.per_item.fields.taxes_fees.placeholder",
	// 	fieldType: "input",
	// 	type: "number"
	// },
	{
		key: ENUM_SUPPLEMENT_PRICE_ROW_FIELD.CURRENCY,
		label: "form.pricing.form.pricing_details.fields.currency.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.currency.placeholder",
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		defaultValue: DEFAULT_EVENT_CURRENCY
	}
];
