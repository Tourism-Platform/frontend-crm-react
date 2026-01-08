import { z } from "zod";

import { type TTourSettingsPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_SETTINGS_GENERAL_FORM,
	ENUM_TOUR_CATEGORY,
	ENUM_TOUR_TYPES
} from "../types";

const msg = i18nKey<TTourSettingsPageKeys>();

export const SETTINGS_GENERAL_FORM_SCHEMA = z.object({
	[ENUM_SETTINGS_GENERAL_FORM.TOUR_TITLE]: z
		.string()
		.min(1, { message: msg("general.form.errors.tourTitle.required") })
		.min(3, { message: msg("general.form.errors.tourTitle.min") })
		.max(100, { message: msg("general.form.errors.tourTitle.max") }),
	[ENUM_SETTINGS_GENERAL_FORM.TOUR_TYPE]: z.enum(ENUM_TOUR_TYPES, {
		message: msg("general.form.errors.tourType.required")
	}),
	[ENUM_SETTINGS_GENERAL_FORM.GROUP_SIZE]: z
		.number({ message: msg("general.form.errors.groupSize.required") })
		.min(1, msg("general.form.errors.groupSize.min")),
	[ENUM_SETTINGS_GENERAL_FORM.DURATION]: z.object({
		from: z
			.number({
				message: msg("general.form.errors.duration.from.required")
			})
			.min(1, msg("general.form.errors.duration.from.required")),
		to: z
			.number({
				message: msg("general.form.errors.duration.to.required")
			})
			.min(1, msg("general.form.errors.duration.to.required"))
	}),
	[ENUM_SETTINGS_GENERAL_FORM.AGE_REQUIRES]: z.object({
		from: z
			.number({
				message: msg("general.form.errors.ageRequires.from.required")
			})
			.min(0, msg("general.form.errors.ageRequires.from.required")),
		to: z
			.number({
				message: msg("general.form.errors.ageRequires.to.required")
			})
			.min(0, msg("general.form.errors.ageRequires.to.required"))
	}),
	[ENUM_SETTINGS_GENERAL_FORM.TOUR_CATEGORIES]: z
		.array(z.enum(ENUM_TOUR_CATEGORY))
		.min(1, msg("general.form.errors.tourCategories.required"))
});
