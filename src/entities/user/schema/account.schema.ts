import { z } from "zod";

import { ENUM_FORM_ACCOUNT } from "../types";

export const ACCOUNT_SCHEMA = z.object({
	[ENUM_FORM_ACCOUNT.AVATAR]: z.string().optional(),
	[ENUM_FORM_ACCOUNT.LOGIN]: z
		.string()
		.min(1, { message: "form.personal.fields.login.errors.required" })
		.min(3, { message: "form.personal.fields.login.errors.min" })
		.max(50, { message: "form.personal.fields.login.errors.max" }),

	[ENUM_FORM_ACCOUNT.FIRST_NAME]: z
		.string()
		.min(1, { message: "form.personal.fields.first_name.errors.required" })
		.min(2, { message: "form.personal.fields.first_name.errors.min" })
		.max(50, { message: "form.personal.fields.first_name.errors.max" }),

	[ENUM_FORM_ACCOUNT.LAST_NAME]: z
		.string()
		.min(1, { message: "form.personal.fields.last_name.errors.required" })
		.min(2, { message: "form.personal.fields.last_name.errors.min" })
		.max(50, { message: "form.personal.fields.last_name.errors.max" }),

	[ENUM_FORM_ACCOUNT.TITLE]: z
		.string()
		.min(1, { message: "form.personal.fields.title.errors.required" })
		.min(2, { message: "form.personal.fields.title.errors.min" })
		.max(100, { message: "form.personal.fields.title.errors.max" }),

	[ENUM_FORM_ACCOUNT.PHONE_NUMBER]: z
		.string()
		.min(1, {
			message: "form.personal.fields.phone_number.errors.required"
		})
		.min(10, { message: "form.personal.fields.phone_number.errors.min" })
		.max(15, { message: "form.personal.fields.phone_number.errors.max" })
		.regex(/^\+?[1-9]\d{7,14}$/, {
			message: "form.personal.fields.phone_number.errors.pattern"
		}),

	[ENUM_FORM_ACCOUNT.LOCATION]: z
		.string()
		.min(1, { message: "form.general.fields.location.errors.required" })
		.min(2, { message: "form.general.fields.location.errors.min" })
		.max(100, { message: "form.general.fields.location.errors.max" }),

	[ENUM_FORM_ACCOUNT.CURRENCY]: z
		.string()
		.min(1, { message: "form.general.fields.currency.errors.required" })
		.min(3, { message: "form.general.fields.currency.errors.min" })
		.max(3, { message: "form.general.fields.currency.errors.max" })
});
