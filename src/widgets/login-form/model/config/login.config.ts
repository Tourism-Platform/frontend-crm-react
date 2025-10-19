import { ENUM_FORM_LOGIN, type IFormLogin } from "../types";

export const FORM_LOGIN_LIST: IFormLogin[] = [
	{
		label: "form.fields.email.label",
		placeholder: "form.fields.email.placeholder",
		key: ENUM_FORM_LOGIN.EMAIL,
		fieldType: "input",
		id: "email"
	},
	{
		label: "form.fields.password.label",
		placeholder: "form.fields.password.placeholder",
		key: ENUM_FORM_LOGIN.PASSWORD,
		fieldType: "password",
		id: "password"
	}
];
