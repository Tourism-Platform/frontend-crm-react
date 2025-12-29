import { z } from "zod";

import { ENUM_FORM_LOGIN, ENUM_LOGIN } from "../types";

export const LOGIN_SCHEMA = z.object({
	[ENUM_FORM_LOGIN.EMAIL]: z
		.string()
		.min(1, { message: "form.fields.email.errors.required" })
		.min(3, { message: "form.fields.email.errors.min" })
		.max(50, { message: "form.fields.email.errors.max" }),
	[ENUM_FORM_LOGIN.PASSWORD]: z
		.string()
		.min(1, { message: "form.fields.password.errors.required" })
		.min(6, { message: "form.fields.password.errors.min" })
		.max(50, { message: "form.fields.password.errors.max" }),
	[ENUM_FORM_LOGIN.LOGIN_TYPE]: z.enum(ENUM_LOGIN)
});
