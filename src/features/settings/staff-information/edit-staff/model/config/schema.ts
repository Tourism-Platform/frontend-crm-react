import { z } from "zod";

import { COMMISSION_OPTIONS } from "@/shared/config";

import { STAFF_ROLE_OPTIONS, STAFF_STATUS_OPTIONS } from "@/entities/staff";

const STAFF_VALUES = STAFF_ROLE_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];
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
		.string({ message: "menu.edit.form.details.errors.name.required" })
		.min(2, "menu.edit.form.details.errors.name.min")
		.max(100, "menu.edit.form.details.errors.name.max"),
	email: z
		.email("menu.edit.form.details.errors.email.invalid")
		.min(1, "menu.edit.form.details.errors.email.min"),
	role: z.enum(STAFF_VALUES, {
		message: "menu.edit.form.details.errors.role.required"
	}),
	status: z.enum(STATUS_VALUES, {
		message: "menu.edit.form.details.errors.status.required"
	}),
	type: z.enum(COMMISSION_VALUES, {
		message: "menu.edit.form.commission.errors.type.required"
	}),
	split: z
		.number({ message: "menu.edit.form.commission.errors.split.required" })
		.min(0, "menu.edit.form.commission.errors.split.min")
		.max(100, "menu.edit.form.commission.errors.split.max")
});
