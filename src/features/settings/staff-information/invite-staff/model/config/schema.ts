import { z } from "zod";

import { ENUM_STAFF_ROLE_OPTIONS } from "@/entities/staff";

export const INVITE_STAFF_SCHEMA = z.object({
	email: z
		.email("invite.form.errors.email.invalid")
		.min(1, "invite.form.errors.email.min"),
	role: z.enum(ENUM_STAFF_ROLE_OPTIONS, {
		message: "invite.form.errors.role.required"
	})
});
