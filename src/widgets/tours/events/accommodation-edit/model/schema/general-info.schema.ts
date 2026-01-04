import { z } from "zod";

import { type TTourAccommodationEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_ACCOMMODATION } from "../types";

const msg = i18nKey<TTourAccommodationEditPageKeys>();

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_ACCOMMODATION.PROPERTY]: z
		.string()
		.min(2, {
			message: msg("general.properties.form.fields.property.errors.min")
		})
		.max(200, {
			message: msg("general.properties.form.fields.property.errors.max")
		}),

	[ENUM_FORM_ACCOMMODATION.AMENITIES]: z.string().min(1, {
		message: msg(
			"general.accommodation.form.fields.amenities.errors.required"
		)
	}),

	[ENUM_FORM_ACCOMMODATION.DESCRIPTION]: z
		.string()
		.min(1, {
			message: msg(
				"general.accommodation.form.fields.description.errors.required"
			)
		})
		.max(1000, {
			message: msg(
				"general.accommodation.form.fields.description.errors.max"
			)
		}),

	[ENUM_FORM_ACCOMMODATION.LENGTH_OF_STAY]: z.string().min(1, {
		message: msg(
			"general.schedule.form.fields.length_of_stay.errors.required"
		)
	}),
	[ENUM_FORM_ACCOMMODATION.CHECK_IN_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.schedule.form.fields.check_in_time.errors.required"
			)
		})
		.refine(
			(val) => val === null || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
			{
				message: msg(
					"general.schedule.form.fields.check_in_time.errors.invalid"
				)
			}
		),

	[ENUM_FORM_ACCOMMODATION.CHECK_IN_TIMEZONE]: z.string().min(1, {
		message: msg(
			"general.schedule.form.fields.check_in_timezone.errors.required"
		)
	}),

	[ENUM_FORM_ACCOMMODATION.CHECK_OUT_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.schedule.form.fields.check_out_time.errors.required"
			)
		})
		.refine(
			(val) => val === null || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
			{
				message: msg(
					"general.schedule.form.fields.check_out_time.errors.invalid"
				)
			}
		),

	[ENUM_FORM_ACCOMMODATION.CHECK_OUT_TIMEZONE]: z.string().min(1, {
		message: msg(
			"general.schedule.form.fields.check_out_timezone.errors.required"
		)
	})
});
