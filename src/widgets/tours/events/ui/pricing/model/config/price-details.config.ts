import { CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FORM_PRICE_DETAILS, type TFormPriceDetails } from "../types";

export const PRICE_DETAILS_DATA_LIST: TFormPriceDetails[] = [
	{
		label: "pricing.form.pricing_details.fields.total_price.label",
		placeholder:
			"pricing.form.pricing_details.fields.total_price.placeholder",
		key: ENUM_FORM_PRICE_DETAILS.TOTAL_PRICE,
		type: "number",
		fieldType: "input"
	},
	{
		label: "pricing.form.pricing_details.fields.taxes_and_fees.label",
		placeholder:
			"pricing.form.pricing_details.fields.taxes_and_fees.placeholder",
		key: ENUM_FORM_PRICE_DETAILS.TAXES,
		type: "number",
		fieldType: "input"
	},
	{
		label: "pricing.form.pricing_details.fields.currency.label",
		key: ENUM_FORM_PRICE_DETAILS.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		defaultValue: CURRENCY_OPTIONS?.[0]?.value
	}
];
