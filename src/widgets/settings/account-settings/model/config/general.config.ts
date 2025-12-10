import { CURRENCY_OPTIONS } from "@/shared/config";

import { ENUM_FORM_CHANGE_ACCOUNT, type TFormChangeAccount } from "../types";

export const GENERAL_ACCOUNT_DATA_LIST: TFormChangeAccount[] = [
	{
		label: "form.general.fields.location.label",
		placeholder: "form.general.fields.location.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.LOCATION,
		fieldType: "input"
	},
	{
		label: "form.general.fields.currency.label",
		placeholder: "form.general.fields.currency.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.CURRENCY,
		fieldType: "select",
		options: CURRENCY_OPTIONS,
		defaultValue: CURRENCY_OPTIONS?.[0]?.value
	}
];
