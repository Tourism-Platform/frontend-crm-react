import { ENUM_FORM_CHANGE_PASSWORD, type IFormChangePassword } from "../types";

export const FORM_CHANGE_PASSWORD_LIST: IFormChangePassword[] = [
	{
		label: "form.fields.current_password.label",
		placeholder: "form.fields.current_password.placeholder",
		key: ENUM_FORM_CHANGE_PASSWORD.CURRENT_PASSWORD
	},
	{
		label: "form.fields.new_password.label",
		placeholder: "form.fields.new_password.placeholder",
		key: ENUM_FORM_CHANGE_PASSWORD.NEW_PASSWORD
	},
	{
		label: "form.fields.confirm_new_password.label",
		placeholder: "form.fields.confirm_new_password.placeholder",
		key: ENUM_FORM_CHANGE_PASSWORD.CONFIRM_PASSWORD
	}
];
