import { z } from "zod";

import { ENUM_STAFF_ROLE_OPTIONS } from "../types";
import { ENUM_FORM_INVITE_STAFF } from "../types/staff-invite-form.types";

export const INVITE_STAFF_SCHEMA = z.object({
	[ENUM_FORM_INVITE_STAFF.FIRST_NAME]: z
		.string({
			message: "invite.form.errors.firstName.required"
		})
		.trim()
		.min(1, "invite.form.errors.firstName.required")
		.max(100, "invite.form.errors.firstName.max"),
	[ENUM_FORM_INVITE_STAFF.LAST_NAME]: z
		.string({
			message: "invite.form.errors.lastName.required"
		})
		.trim()
		.min(1, "invite.form.errors.lastName.required")
		.max(100, "invite.form.errors.lastName.max"),
	[ENUM_FORM_INVITE_STAFF.EMAIL]: z
		.email("invite.form.errors.email.invalid")
		.min(1, "invite.form.errors.email.min"),
	[ENUM_FORM_INVITE_STAFF.ROLE]: z.enum(ENUM_STAFF_ROLE_OPTIONS, {
		message: "invite.form.errors.role.required"
	})
});
