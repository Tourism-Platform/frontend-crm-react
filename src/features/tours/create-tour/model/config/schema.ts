import { z } from "zod";

import { TOUR_TYPE_OPTIONS } from "./tour-types.config";

const TOUR_TYPE_VALUES = TOUR_TYPE_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

export const CREATE_TOUR_SCHEMA = z.object({
	tourTitle: z
		.string()
		.min(3, "create.form.errors.tourTitle.min")
		.max(100, "create.form.errors.tourTitle.max"),
	tourType: z.enum(TOUR_TYPE_VALUES, {
		message: "create.form.errors.tourType.required"
	}),
	groupSize: z
		.number({ message: "create.form.errors.groupSize.min" })
		.min(1, "create.form.errors.groupSize.min"),
	duration: z.object({
		from: z
			.number({ message: "create.form.errors.duration.from.required" })
			.min(1, "create.form.errors.duration.from.required"),
		to: z
			.number({ message: "create.form.errors.duration.to.required" })
			.min(1, "create.form.errors.duration.to.required")
	}),
	ageRequires: z.object({
		from: z
			.number({ message: "create.form.errors.ageRequires.from.required" })
			.min(0, "create.form.errors.ageRequires.from.required"),
		to: z
			.number({ message: "create.form.errors.ageRequires.to.required" })
			.min(0, "create.form.errors.ageRequires.to.required")
	})
});
