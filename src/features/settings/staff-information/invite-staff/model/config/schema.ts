import { z } from "zod";

import { ENUM_STAFF_ROLE_OPTIONS } from "@/entities/staff";

import { ENUM_FORM_INVITE_STAFF } from "../types";

export const INVITE_STAFF_SCHEMA = z.object({
	[ENUM_FORM_INVITE_STAFF.EMAIL]: z
		.email("invite.form.errors.email.invalid")
		.min(1, "invite.form.errors.email.min"),
	[ENUM_FORM_INVITE_STAFF.ROLE]: z.enum(ENUM_STAFF_ROLE_OPTIONS, {
		message: "invite.form.errors.role.required"
	})
});
