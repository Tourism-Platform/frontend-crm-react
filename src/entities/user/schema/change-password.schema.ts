import { z } from "zod";

import { ENUM_FORM_CHANGE_PASSWORD } from "../types";

export const CHANGE_PASSWORD_SCHEMA = z
	.object({
		[ENUM_FORM_CHANGE_PASSWORD.CURRENT_PASSWORD]: z
			.string({ message: "form.errors.current_password.required" })
			.min(6, "form.errors.current_password.min"),
		[ENUM_FORM_CHANGE_PASSWORD.NEW_PASSWORD]: z
			.string({ message: "form.errors.new_password.required" })
			.min(8, "form.errors.new_password.min")
			.regex(/[A-Z]/, "form.errors.new_password.uppercase")
			.regex(/[a-z]/, "form.errors.new_password.lowercase")
			.regex(/[0-9]/, "form.errors.new_password.number")
			.regex(/[@$!%*?&#]/, "form.errors.new_password.special"),
		[ENUM_FORM_CHANGE_PASSWORD.CONFIRM_PASSWORD]: z.string({
			message: "form.errors.confirm_password.required"
		})
	})
	.refine(
		(data) =>
			data[ENUM_FORM_CHANGE_PASSWORD.NEW_PASSWORD] ===
			data[ENUM_FORM_CHANGE_PASSWORD.CONFIRM_PASSWORD],
		{
			path: [ENUM_FORM_CHANGE_PASSWORD.CONFIRM_PASSWORD],
			message: "form.errors.confirm_password.mismatch"
		}
	);
