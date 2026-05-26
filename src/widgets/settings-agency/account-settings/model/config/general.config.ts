import { CURRENCY_OPTIONS } from "@/entities/commission";
import { ENUM_FORM_ACCOUNT } from "@/entities/user";

import { type TForm } from "../types";

export const GENERAL_ACCOUNT_DATA_LIST: TForm[] = [
	{
		label: "form.general.fields.location.label",
		placeholder: "form.general.fields.location.placeholder",
		key: ENUM_FORM_ACCOUNT.LOCATION,
		fieldType: "input"
	},
	{
		label: "form.general.fields.currency.label",
		placeholder: "form.general.fields.currency.placeholder",
		key: ENUM_FORM_ACCOUNT.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS
	}
];
