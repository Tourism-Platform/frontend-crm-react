import {
	CURRENCY_OPTIONS,
	ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE
} from "@/entities/commission";

import type { TForm } from "../types";

export const FORM_OPERATOR_CREATE_CURRENCY_RATE_LIST: TForm[] = [
	{
		label: "currency.currency_rate.form.fields.from_currency.label",
		placeholder:
			"currency.currency_rate.form.fields.from_currency.placeholder",
		key: ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE.FROM_CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS
	},
	{
		label: "currency.currency_rate.form.fields.to_currency.label",
		placeholder:
			"currency.currency_rate.form.fields.to_currency.placeholder",
		key: ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE.TO_CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS
	},
	{
		label: "currency.currency_rate.form.fields.rate.label",
		placeholder: "currency.currency_rate.form.fields.rate.placeholder",
		key: ENUM_FORM_OPERATOR_CREATE_CURRENCY_RATE.RATE,
		fieldType: "input",
		type: "number",
		step: "0.01",
		className: "col-span-2"
	}
];
