import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY
} from "@/entities/commission";
import { ENUM_SUPPLEMENT_PRICING_FIELD } from "@/entities/tour";

import type { TSupplementPricingFormField } from "../types";

export const PRICING_PER_PERSON_PRICE_DETAILS_LIST: TSupplementPricingFormField[] =
	[
		{
			label: "form.pricing.form.pricing_details.fields.total_price_per_person.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.total_price_per_person.placeholder",
			key: ENUM_SUPPLEMENT_PRICING_FIELD.TOTAL_PRICE,
			fieldType: "input",
			type: "number"
		},
		// Backend SupplementaryItem has no `fees`/`taxes` — hide until API supports it
		// {
		// 	label: "form.pricing.form.pricing_details.fields.taxes_and_fees_per_person.label",
		// 	placeholder:
		// 		"form.pricing.form.pricing_details.fields.taxes_and_fees_per_person.placeholder",
		// 	key: ENUM_SUPPLEMENT_PRICING_FIELD.TAXES,
		// 	fieldType: "input",
		// 	type: "number"
		// },
		{
			label: "form.pricing.form.pricing_details.fields.currency.label",
			placeholder:
				"form.pricing.form.pricing_details.fields.currency.placeholder",
			key: ENUM_SUPPLEMENT_PRICING_FIELD.CURRENCY,
			fieldType: "select",
			options: CURRENCY_OPTIONS,
			defaultValue: DEFAULT_EVENT_CURRENCY
		}
	];
