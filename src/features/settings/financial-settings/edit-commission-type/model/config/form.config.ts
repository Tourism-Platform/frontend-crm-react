import { CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_FORM_EDIT_COMMISSION_TYPE, type TForm } from "../types";

export const FORM_EDIT_COMMISSION_TYPE_LIST: TForm[] = [
	{
		label: "commission_type.menu.edit.form.fields.currency.label",
		placeholder:
			"commission_type.menu.edit.form.fields.currency.placeholder",
		key: ENUM_FORM_EDIT_COMMISSION_TYPE.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS
	},
	{
		label: "commission_type.menu.edit.form.fields.rate.label",
		placeholder: "commission_type.menu.edit.form.fields.rate.placeholder",
		key: ENUM_FORM_EDIT_COMMISSION_TYPE.RATE,
		fieldType: "input",
		type: "number"
	}
];
