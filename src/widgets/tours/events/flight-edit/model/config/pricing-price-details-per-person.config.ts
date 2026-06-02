import { CURRENCY_OPTIONS } from "@/entities/commission";
import { ENUM_FLIGHT_PRICING_FIELD } from "@/entities/tour";

import type { TForm } from "../types";

export const PRICING_PER_PERSON_PRICE_DETAILS_LIST: TForm[] = [
	{
		label: "form.pricing.form.pricing_details.fields.total_price_per_person.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.total_price_per_person.placeholder",
		key: ENUM_FLIGHT_PRICING_FIELD.TOTAL_PRICE,
		type: "number",
		fieldType: "input"
	},
	{
		label: "form.pricing.form.pricing_details.fields.taxes_and_fees_per_person.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.taxes_and_fees_per_person.placeholder",
		key: ENUM_FLIGHT_PRICING_FIELD.TAXES,
		type: "number",
		fieldType: "input"
	},
	{
		label: "form.pricing.form.pricing_details.fields.currency.label",
		placeholder:
			"form.pricing.form.pricing_details.fields.currency.placeholder",
		key: ENUM_FLIGHT_PRICING_FIELD.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS
	}
];
