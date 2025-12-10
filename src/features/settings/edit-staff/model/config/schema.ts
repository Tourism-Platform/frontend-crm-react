import { z } from "zod";

import {
	COMMISSION_OPTIONS,
	STAFF_OPTIONS,
	STAFF_STATUS_OPTIONS
} from "@/shared/config";

const STAFF_VALUES = STAFF_OPTIONS.map((o) => o.value) as [string, ...string[]];
const STATUS_VALUES = STAFF_STATUS_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];
const COMMISSION_VALUES = COMMISSION_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

export const EDIT_STAFF_SCHEMA = z.object({
	name: z
		.string()
		.min(2, "menu.edit.form.details.errors.name.min")
		.max(100, "menu.edit.form.details.errors.name.max"),
	email: z
		.email("invite.form.errors.email.invalid")
		.min(1, "invite.form.errors.email.min"),
	role: z.enum(STAFF_VALUES),
	status: z.enum(STATUS_VALUES),
	type: z.enum(COMMISSION_VALUES),
	split: z
		.number()
		.min(0, "menu.edit.form.commission.errors.split.min")
		.max(100, "menu.edit.form.commission.errors.split.max")
});
