import { z } from "zod";

import { STAFF_OPTIONS } from "@/shared/config";

const STAFF_VALUES = STAFF_OPTIONS.map((o) => o.value) as [string, ...string[]];

export const INVITE_STAFF_SCHEMA = z.object({
	email: z
		.email("invite.form.errors.email.invalid")
		.min(1, "invite.form.errors.email.min"),
	role: z.enum(STAFF_VALUES)
});
