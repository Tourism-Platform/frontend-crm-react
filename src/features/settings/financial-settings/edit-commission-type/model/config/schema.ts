import { z } from "zod";

import { CURRENCY_OPTIONS } from "@/entities/commission";

const CURRENCY_VALUES = CURRENCY_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

export const EDIT_COMMISSION_TYPE_SCHEMA = z.object({
	name: z.enum(CURRENCY_VALUES, {
		message: "commission_type.menu.edit.form.errors.name.required"
	}),
	rate: z
		.number({
			message: "commission_type.menu.edit.form.errors.rate.required"
		})
		.min(0.01, "commission_type.menu.edit.form.errors.rate.min")
		.max(1000, "commission_type.menu.edit.form.errors.rate.max")
});
