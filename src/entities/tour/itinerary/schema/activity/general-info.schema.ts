import { z } from "zod";

import { type TTourActivityEditPageKeys, i18nKey } from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

import { ENUM_ACTIVITY_TYPE, ENUM_FORM_ACTIVITY } from "../../types";

const msg = i18nKey<TTourActivityEditPageKeys>();

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_ACTIVITY.DESCRIPTION]: z
		.string({
			// message: msg("form.general.description.errors.required")
		})
		// .min(1, {
		// 	message: msg("form.general.description.errors.required")
		// })
		.max(1000, {
			message: msg("form.general.description.errors.max")
		})
		.optional(),

	[ENUM_FORM_ACTIVITY.ACTIVITY_SUBTYPE]: z
		.enum(ENUM_ACTIVITY_TYPE, {
			message: msg(
				"form.general.details.form.fields.activity_subtype.errors.required"
			)
		})
		.optional(),

	[ENUM_FORM_ACTIVITY.LOCATION]: GEO_FORM_VALUE_SCHEMA.nullable().optional(),

	[ENUM_FORM_ACTIVITY.ACTIVITY_START_TIME]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.event_start_time.errors.required"
			// )
		})
		.nullable()
		// .refine((val) => val !== null, {
		// 	message: msg(
		// 		"form.general.details.form.fields.event_start_time.errors.required"
		// 	)
		// })
		.optional(),

	[ENUM_FORM_ACTIVITY.ACTIVITY_START_TIMEZONE]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.start_timezone.errors.required"
			// )
		})
		// .min(1, {
		// 	message: msg(
		// 		"form.general.details.form.fields.start_timezone.errors.required"
		// 	)
		// })
		// .max(100, {
		// 	message: msg(
		// 		"form.general.details.form.fields.start_timezone.errors.max"
		// 	)
		// })
		.optional(),

	[ENUM_FORM_ACTIVITY.ACTIVITY_END_TIME]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.event_end_time.errors.required"
			// )
		})
		.nullable()
		// .refine((val) => val !== null, {
		// 	message: msg(
		// 		"form.general.details.form.fields.event_end_time.errors.required"
		// 	)
		// })
		.optional(),

	[ENUM_FORM_ACTIVITY.ACTIVITY_END_TIMEZONE]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.end_timezone.errors.required"
			// )
		})
		// .min(1, {
		// 	message: msg(
		// 		"form.general.details.form.fields.end_timezone.errors.required"
		// 	)
		// })
		// .max(100, {
		// 	message: msg(
		// 		"form.general.details.form.fields.end_timezone.errors.max"
		// 	)
		// })
		.optional()
});
