import { z } from "zod";

import { ENUM_FORM_ACCOMMODATION } from "../types";

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_ACCOMMODATION.PROPERTY]: z
		.string()
		.min(2, {
			message: "general.properties.form.fields.property.errors.min"
		})
		.max(200, {
			message: "general.properties.form.fields.property.errors.max"
		}),

	[ENUM_FORM_ACCOMMODATION.AMENITIES]: z.string().min(1, {
		message: "general.accommodation.form.fields.amenities.errors.required"
	}),

	[ENUM_FORM_ACCOMMODATION.DESCRIPTION]: z
		.string()
		.min(2, {
			message: "general.accommodation.form.fields.description.errors.min"
		})
		.max(500, {
			message: "general.accommodation.form.fields.description.errors.max"
		}),

	[ENUM_FORM_ACCOMMODATION.LENGTH_OF_STAY]: z.string().min(1, {
		message: "general.schedule.form.fields.length_of_stay.errors.required"
	}),
	[ENUM_FORM_ACCOMMODATION.CHECK_IN_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message:
				"general.schedule.form.fields.check_in_time.errors.required"
		})
		.refine(
			(val) => val === null || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
			{
				message:
					"general.schedule.form.fields.check_in_time.errors.invalid"
			}
		),

	[ENUM_FORM_ACCOMMODATION.CHECK_IN_TIMEZONE]: z.string().min(1, {
		message:
			"general.schedule.form.fields.check_in_timezone.errors.required"
	}),

	[ENUM_FORM_ACCOMMODATION.CHECK_OUT_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message:
				"general.schedule.form.fields.check_out_time.errors.required"
		})
		.refine(
			(val) => val === null || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
			{
				message:
					"general.schedule.form.fields.check_out_time.errors.invalid"
			}
		),

	[ENUM_FORM_ACCOMMODATION.CHECK_OUT_TIMEZONE]: z.string().min(1, {
		message:
			"general.schedule.form.fields.check_out_timezone.errors.required"
	})
});
