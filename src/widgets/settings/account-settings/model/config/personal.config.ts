import { ENUM_FORM_CHANGE_ACCOUNT, type TForm } from "../types";

export const PERSONAL_CHANGE_ACCOUNT_LIST: TForm[] = [
	{
		label: "form.personal.fields.login.label",
		placeholder: "form.personal.fields.login.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.LOGIN,
		fieldType: "input"
	},
	{
		label: "form.personal.fields.first_name.label",
		placeholder: "form.personal.fields.first_name.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.FIRST_NAME,
		fieldType: "input"
	},
	{
		label: "form.personal.fields.last_name.label",
		placeholder: "form.personal.fields.last_name.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.LAST_NAME,
		fieldType: "input"
	},
	{
		label: "form.personal.fields.title.label",
		placeholder: "form.personal.fields.title.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.TITLE,
		fieldType: "input"
	},
	{
		label: "form.personal.fields.phone_number.label",
		placeholder: "form.personal.fields.phone_number.placeholder",
		key: ENUM_FORM_CHANGE_ACCOUNT.PHONE_NUMBER,
		fieldType: "input"
	}
];
