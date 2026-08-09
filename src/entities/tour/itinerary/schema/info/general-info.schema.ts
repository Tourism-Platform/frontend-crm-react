import { z } from "zod";

import { type TTourInformationEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_INFORMATION } from "../../types";

const msg = i18nKey<TTourInformationEditPageKeys>();

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_INFORMATION.INFO_START_TIME]: z
		.string({
			// message: msg(
			// 	"form.general.info.form.fields.event_start_time.errors.required"
			// )
		})
		.nullable()
		// .refine((val) => val !== null, {
		// 	message: msg(
		// 		"form.general.info.form.fields.event_start_time.errors.required"
		// 	)
		// })
		.optional(),

	[ENUM_FORM_INFORMATION.INFO_START_TIMEZONE]: z
		.string({
			// message: msg(
			// 	"form.general.info.form.fields.start_timezone.errors.required"
			// )
		})
		// .min(1, {
		// 	message: msg(
		// 		"form.general.info.form.fields.start_timezone.errors.required"
		// 	)
		// })
		// .max(100, {
		// 	message: msg(
		// 		"form.general.info.form.fields.start_timezone.errors.max"
		// 	)
		// })
		.optional(),

	[ENUM_FORM_INFORMATION.INFO_END_TIME]: z
		.string({
			// message: msg(
			// 	"form.general.info.form.fields.event_end_time.errors.required"
			// )
		})
		.nullable()
		// .refine((val) => val !== null, {
		// 	message: msg(
		// 		"form.general.info.form.fields.event_end_time.errors.required"
		// 	)
		// })
		.optional(),

	[ENUM_FORM_INFORMATION.INFO_END_TIMEZONE]: z
		.string({
			// message: msg(
			// 	"form.general.info.form.fields.end_timezone.errors.required"
			// )
		})
		// .min(1, {
		// 	message: msg(
		// 		"form.general.info.form.fields.end_timezone.errors.required"
		// 	)
		// })
		// .max(100, {
		// 	message: msg(
		// 		"form.general.info.form.fields.end_timezone.errors.max"
		// 	)
		// })
		.optional(),

	[ENUM_FORM_INFORMATION.DESCRIPTION]: z
		.string()
		// .min(1, {
		// 	message: msg("form.general.info.form.fields.description.errors.required")
		// })
		.max(3000, {
			message: msg("form.general.info.form.fields.description.errors.max")
		})
		.optional()
});
