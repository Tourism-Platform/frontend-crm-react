import { CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FORM_EDIT_COMMISSION_TYPE, type TForm } from "../types";

export const FORM_EDIT_COMMISSION_TYPE_LIST: TForm[] = [
	{
		label: "currency.currency_rate.form.fields.from_currency.label",
		placeholder:
			"currency.currency_rate.form.fields.from_currency.placeholder",
		key: ENUM_FORM_EDIT_COMMISSION_TYPE.FROM_CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		disabled: true
	},
	{
		label: "currency.currency_rate.form.fields.to_currency.label",
		placeholder:
			"currency.currency_rate.form.fields.to_currency.placeholder",
		key: ENUM_FORM_EDIT_COMMISSION_TYPE.TO_CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		disabled: true
	},
	{
		label: "currency.commission_type.menu.edit.form.fields.rate.label",
		placeholder:
			"currency.commission_type.menu.edit.form.fields.rate.placeholder",
		key: ENUM_FORM_EDIT_COMMISSION_TYPE.RATE,
		fieldType: "input",
		type: "number",
		className: "col-start-2"
	}
];
