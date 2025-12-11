import { z } from "zod";

import { STAFF_ROLE_OPTIONS } from "@/entities/staff";

const STAFF_VALUES = STAFF_ROLE_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

export const INVITE_STAFF_SCHEMA = z.object({
	email: z
		.email("invite.form.errors.email.invalid")
		.min(1, "invite.form.errors.email.min"),
	role: z.enum(STAFF_VALUES, {
		message: "invite.form.errors.role.required"
	})
});
