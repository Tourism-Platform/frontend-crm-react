import { ENUM_FORM_CHANGE_PASSWORD, type IFormChangePassword } from "../types";

export const FORM_CHANGE_PASSWORD_LIST: IFormChangePassword[] = [
	{
		label: "form.current_password.label",
		placeholder: "form.current_password.placeholder",
		key: ENUM_FORM_CHANGE_PASSWORD.CURRENT_PASSWORD
	},
	{
		label: "form.new_password.label",
		placeholder: "form.new_password.placeholder",
		key: ENUM_FORM_CHANGE_PASSWORD.NEW_PASSWORD
	},
	{
		label: "form.confirm_new_password.label",
		placeholder: "form.confirm_new_password.placeholder",
		key: ENUM_FORM_CHANGE_PASSWORD.CONFIRM_PASSWORD
	}
];
