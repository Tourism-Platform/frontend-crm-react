import { CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FORM_PRICE_DETAILS, type TForm } from "../types";

export const COMMISSION_DETAILS_DATA_LIST = (): TForm[] => [
	{
		label: "pricing.form.commissions.fields.total_expected.label",
		placeholder:
			"pricing.form.commissions.fields.total_expected.placeholder",
		key: ENUM_FORM_PRICE_DETAILS.TOTAL_PRICE,
		type: "number",
		fieldType: "input"
	},
	{
		label: "pricing.form.commissions.fields.commission_type.label",
		key: ENUM_FORM_PRICE_DETAILS.CURRENCY,
		fieldType: "select",
		options: []
	},
	{
		label: "pricing.form.pricing_details.fields.currency.label",
		key: ENUM_FORM_PRICE_DETAILS.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		defaultValue: CURRENCY_OPTIONS?.[0]?.value
	}
];
