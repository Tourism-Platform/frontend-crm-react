import { z } from "zod";

import { type TLoginPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_LOGIN, ENUM_LOGIN } from "../types";

const msg = i18nKey<TLoginPageKeys>();

export const LOGIN_SCHEMA = z.object({
	[ENUM_FORM_LOGIN.EMAIL]: z
		.string()
		.min(1, { message: msg("form.fields.email.errors.required") })
		.min(3, { message: msg("form.fields.email.errors.min") })
		.max(50, { message: msg("form.fields.email.errors.max") }),
	[ENUM_FORM_LOGIN.PASSWORD]: z
		.string()
		.min(1, { message: msg("form.fields.password.errors.required") })
		.min(6, { message: msg("form.fields.password.errors.min") })
		.max(50, { message: msg("form.fields.password.errors.max") }),
	[ENUM_FORM_LOGIN.LOGIN_TYPE]: z.enum(ENUM_LOGIN)
});
