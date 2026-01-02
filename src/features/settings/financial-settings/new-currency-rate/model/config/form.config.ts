import { CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FORM_NEW_CURRENCY_RATE, type TForm } from "../types";

export const FORM_NEW_CURRENCY_RATE_LIST: TForm[] = [
	{
		label: "commission_type.new_currency.form.fields.currency.label",
		placeholder:
			"commission_type.new_currency.form.fields.currency.placeholder",
		key: ENUM_FORM_NEW_CURRENCY_RATE.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS
	},
	{
		label: "commission_type.new_currency.form.fields.rate.label",
		placeholder:
			"commission_type.new_currency.form.fields.rate.placeholder",
		key: ENUM_FORM_NEW_CURRENCY_RATE.RATE,
		fieldType: "input",
		type: "number"
	}
];
