import { z } from "zod";

import { type TToursPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_TOUR_CREATE_FORM as ENUM_FORM,
	ENUM_TOUR_CATEGORY,
	ENUM_TOUR_TYPES
} from "../types";

const msg = i18nKey<TToursPageKeys>();

export const TOUR_CREATE_SCHEMA = z.object({
	[ENUM_FORM.TOUR_TITLE]: z
		.string()
		.min(1, msg("create.form.errors.tourTitle.min"))
		.max(100, msg("create.form.errors.tourTitle.max")),
	[ENUM_FORM.TOUR_TYPE]: z.enum(ENUM_TOUR_TYPES, {
		message: msg("create.form.errors.tourType.required")
	}),
	[ENUM_FORM.GROUP_SIZE]: z
		.number({ message: msg("create.form.errors.groupSize.min") })
		.min(1, msg("create.form.errors.groupSize.min")),
	[ENUM_FORM.DURATION]: z
		.object({
			from: z
				.number({
					message: msg("create.form.errors.duration.from.required")
				})
				.min(1, msg("create.form.errors.duration.from.required")),
			to: z
				.number({
					message: msg("create.form.errors.duration.to.required")
				})
				.min(1, msg("create.form.errors.duration.to.required"))
		})
		.superRefine((val, ctx) => {
			const days = val.from;
			const nights = val.to;

			if (nights < days - 1 || nights > days + 1) {
				ctx.addIssue({
					code: "custom",
					message: msg("create.form.errors.duration.nightsMismatch"),
					path: ["to"]
				});
			}
		}),
	[ENUM_FORM.AGE_REQUIRES]: z
		.object({
			from: z
				.number()
				.min(0, msg("create.form.errors.ageRequires.from.required"))
				.or(z.literal(""))
				.optional(),
			to: z
				.number()
				.min(0, msg("create.form.errors.ageRequires.to.required"))
				.or(z.literal(""))
				.optional()
		})
		.superRefine((val, ctx) => {
			const from = val.from;
			const to = val.to;

			if (from && to && to < from) {
				ctx.addIssue({
					code: "custom",
					message: msg("create.form.errors.ageRequires.toMismatch"),
					path: ["to"]
				});
			}
		}),
	[ENUM_FORM.TOUR_CATEGORIES]: z
		.array(z.enum(ENUM_TOUR_CATEGORY))
		.min(1, msg("create.form.errors.tourCategories.required"))
});
