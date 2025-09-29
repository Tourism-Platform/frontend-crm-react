import { ENUM_FORM_CHANGE_ACCOUNT, type IFormChangeAccount } from "../types";

export const PERSONAL_CHANGE_ACCOUNT_LIST: IFormChangeAccount[] = [
	{
		label: "form.personal.fields.login.label",
		placeholder: "form.personal.fields.login.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.LOGIN
	},
	{
		label: "form.personal.fields.first_name.label",
		placeholder: "form.personal.fields.first_name.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.FIRST_NAME
	},
	{
		label: "form.personal.fields.last_name.label",
		placeholder: "form.personal.fields.last_name.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.LAST_NAME
	},
	{
		label: "form.personal.fields.title.label",
		placeholder: "form.personal.fields.title.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.TITLE
	},
	{
		label: "form.personal.fields.phone_number.label",
		placeholder: "form.personal.fields.phone_number.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.PHONE_NUMBER
	}
];
