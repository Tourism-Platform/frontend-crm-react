import { z } from "zod";

import { ENUM_FORM_CHANGE_ACCOUNT } from "../types";

export const CHANGE_ACCOUNT_SCHEMA = z.object({
	[ENUM_FORM_CHANGE_ACCOUNT.LOGIN]: z
		.string()
		.min(3, { message: "form.personal.fields.login.errors.min" })
		.max(50, { message: "form.personal.fields.login.errors.max" }),

	[ENUM_FORM_CHANGE_ACCOUNT.FIRST_NAME]: z
		.string()
		.min(2, { message: "form.personal.fields.first_name.errors.min" })
		.max(50, { message: "form.personal.fields.first_name.errors.max" }),

	[ENUM_FORM_CHANGE_ACCOUNT.LAST_NAME]: z
		.string()
		.min(2, { message: "form.personal.fields.last_name.errors.min" })
		.max(50, { message: "form.personal.fields.last_name.errors.max" }),

	[ENUM_FORM_CHANGE_ACCOUNT.TITLE]: z
		.string()
		.max(100, { message: "form.personal.fields.title.errors.max" })
		.optional(),

	[ENUM_FORM_CHANGE_ACCOUNT.PHONE_NUMBER]: z
		.string()
		.regex(/^\+?[1-9]\d{7,14}$/, {
			message: "form.personal.fields.phone_number.errors.pattern"
		}),

	[ENUM_FORM_CHANGE_ACCOUNT.LOCATION]: z
		.string()
		.min(2, { message: "form.general.fields.location.errors.min" })
		.max(100, { message: "form.general.fields.location.errors.max" }),

	[ENUM_FORM_CHANGE_ACCOUNT.CURRENCY]: z.string()
});
