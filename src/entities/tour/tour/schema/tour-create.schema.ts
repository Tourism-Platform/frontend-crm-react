import { z } from "zod";

import {
	ENUM_TOUR_CREATE_FORM as ENUM_FORM,
	ENUM_TOUR_CATEGORY,
	ENUM_TOUR_TYPES
} from "../types";

export const TOUR_CREATE_SCHEMA = z.object({
	[ENUM_FORM.TOUR_TITLE]: z
		.string()
		.min(1, "create.form.errors.tourTitle.min")
		.max(100, "create.form.errors.tourTitle.max"),
	[ENUM_FORM.TOUR_TYPE]: z.enum(ENUM_TOUR_TYPES, {
		message: "create.form.errors.tourType.required"
	}),
	[ENUM_FORM.GROUP_SIZE]: z
		.number({ message: "create.form.errors.groupSize.min" })
		.min(1, "create.form.errors.groupSize.min"),
	[ENUM_FORM.DURATION]: z.object({
		from: z
			.number({ message: "create.form.errors.duration.from.required" })
			.min(1, "create.form.errors.duration.from.required"),
		to: z
			.number({ message: "create.form.errors.duration.to.required" })
			.min(1, "create.form.errors.duration.to.required")
	}),
	[ENUM_FORM.AGE_REQUIRES]: z.object({
		from: z
			.number({ message: "create.form.errors.ageRequires.from.required" })
			.min(0, "create.form.errors.ageRequires.from.required"),
		to: z
			.number({ message: "create.form.errors.ageRequires.to.required" })
			.min(0, "create.form.errors.ageRequires.to.required")
	}),
	[ENUM_FORM.TOUR_CATEGORIES]: z
		.array(z.enum(ENUM_TOUR_CATEGORY))
		.min(1, "create.form.errors.tourCategories.required")
});
