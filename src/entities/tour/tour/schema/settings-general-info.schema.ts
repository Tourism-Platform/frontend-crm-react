import { z } from "zod";

import { type TTourSettingsPageKeys, i18nKey } from "@/shared/config";

import { ENUM_LANGUAGES } from "../../landing/types";
import {
	ENUM_TOUR_CATEGORY,
	ENUM_TOUR_SETTINGS_GENERAL_FORM,
	ENUM_TOUR_TYPES
} from "../types";

const msg = i18nKey<TTourSettingsPageKeys>();

export const TOUR_SETTINGS_GENERAL_FORM_SCHEMA = z
	.object({
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.TOUR_TITLE]: z.string(),
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.TOUR_TYPE]: z.enum(ENUM_TOUR_TYPES, {
			message: msg("general.form.errors.tourType.required")
		}),
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.AGENCY_ID]: z
			.string()
			.optional()
			.nullable(),
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.GROUP_SIZE]: z
			.number({ message: msg("general.form.errors.groupSize.min") })
			.min(1, msg("general.form.errors.groupSize.min")),
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.GROUP_SIZE_MIN]: z
			.number({ message: msg("general.form.errors.groupSizeMin.min") })
			.min(1, msg("general.form.errors.groupSizeMin.min"))
			.nullable()
			.optional(),
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION]: z
			.object({
				from: z
					.number()
					.min(1, msg("general.form.errors.duration.from.required"))
					.or(z.literal(""))
					.optional(),
				to: z
					.number()
					.min(1, msg("general.form.errors.duration.to.required"))
					.or(z.literal(""))
					.optional()
			})
			.superRefine((val, ctx) => {
				const days = val.from;
				const nights = val.to;

				if (
					typeof days === "number" &&
					typeof nights === "number" &&
					(nights < days - 1 || nights > days + 1)
				) {
					ctx.addIssue({
						code: "custom",
						message: msg(
							"general.form.errors.duration.nightsMismatch"
						),
						path: ["to"]
					});
				}
			}),
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION_HOURS]: z
			.number({ message: msg("general.form.errors.durationHours.min") })
			.min(1, msg("general.form.errors.durationHours.min"))
			.max(14, msg("general.form.errors.durationHours.max"))
			.nullable()
			.optional(),
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.AGE_REQUIRES]: z
			.object({
				from: z
					.number()
					.min(
						0,
						msg("general.form.errors.ageRequires.from.required")
					)
					.or(z.literal(""))
					.optional(),
				to: z
					.number()
					.min(0, msg("general.form.errors.ageRequires.to.required"))
					.or(z.literal(""))
					.optional()
			})
			.superRefine((val, ctx) => {
				const from = val.from;
				const to = val.to;

				if (from && to && to < from) {
					ctx.addIssue({
						code: "custom",
						message: msg(
							"general.form.errors.ageRequires.toMismatch"
						),
						path: ["to"]
					});
				}
			}),
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.TOUR_CATEGORIES]: z
			.array(z.enum(ENUM_TOUR_CATEGORY))
			.min(1, msg("general.form.errors.tourCategories.required")),
		[ENUM_TOUR_SETTINGS_GENERAL_FORM.LANGUAGES]: z
			.array(z.enum(ENUM_LANGUAGES))
			.min(1, msg("general.form.errors.languages.required"))
	})
	.superRefine((data, ctx) => {
		if (
			data[ENUM_TOUR_SETTINGS_GENERAL_FORM.TOUR_TYPE] ===
				ENUM_TOUR_TYPES.PRIVATE &&
			!data[ENUM_TOUR_SETTINGS_GENERAL_FORM.AGENCY_ID]
		) {
			ctx.addIssue({
				code: "custom",
				message: msg("general.form.errors.agencyId.required"),
				path: [ENUM_TOUR_SETTINGS_GENERAL_FORM.AGENCY_ID]
			});
		}

		const groupSizeMin =
			data[ENUM_TOUR_SETTINGS_GENERAL_FORM.GROUP_SIZE_MIN];
		if (
			groupSizeMin != null &&
			groupSizeMin > data[ENUM_TOUR_SETTINGS_GENERAL_FORM.GROUP_SIZE]
		) {
			ctx.addIssue({
				code: "custom",
				message: msg("general.form.errors.groupSizeMin.max"),
				path: [ENUM_TOUR_SETTINGS_GENERAL_FORM.GROUP_SIZE_MIN]
			});
		}

		const { from: days, to: nights } =
			data[ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION];
		const hasDuration =
			typeof days === "number" || typeof nights === "number";
		const hasHours =
			data[ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION_HOURS] != null;

		if (hasDuration && hasHours) {
			ctx.addIssue({
				code: "custom",
				message: msg("general.form.errors.durationHours.either"),
				path: [ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION_HOURS]
			});
		}

		if (!hasHours) {
			if (typeof days !== "number") {
				ctx.addIssue({
					code: "custom",
					message: msg("general.form.errors.duration.from.required"),
					path: [ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION, "from"]
				});
			}
			if (typeof nights !== "number") {
				ctx.addIssue({
					code: "custom",
					message: msg("general.form.errors.duration.to.required"),
					path: [ENUM_TOUR_SETTINGS_GENERAL_FORM.DURATION, "to"]
				});
			}
		}
	});
