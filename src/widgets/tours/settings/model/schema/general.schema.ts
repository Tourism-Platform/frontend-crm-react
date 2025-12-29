import { z } from "zod";

import { TOUR_TYPE_OPTIONS } from "@/shared/config";

const TOUR_TYPE_VALUES = TOUR_TYPE_OPTIONS.map((o) => o.value) as [
	string,
	...string[]
];

export const GENERAL_FORM_SCHEMA = z.object({
	tourTitle: z
		.string()
		.min(3, "general.form.errors.tourTitle.min")
		.max(100, "general.form.errors.tourTitle.max"),
	tourType: z.enum(TOUR_TYPE_VALUES, {
		message: "general.form.errors.tourType.required"
	}),
	groupSize: z
		.number({ message: "general.form.errors.groupSize.required" })
		.min(1, "general.form.errors.groupSize.min"),
	duration: z.object({
		from: z
			.number({ message: "general.form.errors.duration.from.required" })
			.min(1, "general.form.errors.duration.from.required"),
		to: z
			.number({ message: "general.form.errors.duration.to.required" })
			.min(1, "general.form.errors.duration.to.required")
	}),
	ageRequires: z.object({
		from: z
			.number({
				message: "general.form.errors.ageRequires.from.required"
			})
			.min(0, "general.form.errors.ageRequires.from.required"),
		to: z
			.number({ message: "general.form.errors.ageRequires.to.required" })
			.min(0, "general.form.errors.ageRequires.to.required")
	}),
	tourCategories: z
		.array(
			z.object({
				label: z.string(),
				value: z.string()
			})
		)
		.min(1, "general.form.errors.tourCategories.required")
});
