import { ENUM_FORM_CHANGE_ACCOUNT, type IFormChangeAccount } from "../types";

export const GENERAL_ACCOUNT_DATA_LIST: IFormChangeAccount[] = [
	{
		label: "form.general.fields.location.label",
		placeholder: "form.general.fields.location.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.LOCATION
	},
	{
		label: "form.general.fields.currency.label",
		placeholder: "form.general.fields.currency.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.CURRENCY
	}
];
