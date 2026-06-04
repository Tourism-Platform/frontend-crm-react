import { z } from "zod";

import {
	type TTourEventTransportationEditPageKeys,
	i18nKey
} from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

import { ENUM_FORM_TRANSPORTATION, ENUM_TRANSFER_TYPE } from "../../types";

const msg = i18nKey<TTourEventTransportationEditPageKeys>();

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_TRANSPORTATION.DESCRIPTION]: z
		.string({
			// message: msg("form.general.description.description.errors.required")
		})
		// .min(1, {
		// 	message: msg("form.general.description.description.errors.required")
		// })
		.max(1000, {
			message: msg("form.general.description.description.errors.max")
		})
		.optional(),

	[ENUM_FORM_TRANSPORTATION.TRANSFER_TYPE]: z
		.enum(ENUM_TRANSFER_TYPE, {
			message: msg(
				"form.general.details.form.fields.transfer_type.errors.required"
			)
		})
		.optional(),
	// .min(1, {
	// 	message: msg(
	// 		"form.general.details.form.fields.transfer_type.errors.required"
	// 	)
	// })
	// .max(100, {
	// 	message: msg(
	// 		"form.general.details.form.fields.transfer_type.errors.max"
	// 	)
	// }).optional(),
	[ENUM_FORM_TRANSPORTATION.MEET_POINT]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional(),
	[ENUM_FORM_TRANSPORTATION.END_POINT]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional(),
	[ENUM_FORM_TRANSPORTATION.DEPARTURE_DATE]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.departure_date.errors.required"
			// )
		})
		.nullable()
		// .refine((val) => val !== null, {
		// 	message: msg(
		// 		"form.general.details.form.fields.departure_date.errors.required"
		// 	)
		// }).or(z.literal(""))
		.optional(),
	[ENUM_FORM_TRANSPORTATION.ARRIVAL_DATE]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.arrival_date.errors.required"
			// )
		})
		.nullable()
		// .refine((val) => val !== null, {
		// 	message: msg(
		// 		"form.general.details.form.fields.arrival_date.errors.required"
		// 	)
		// }).or(z.literal(""))
		.optional(),
	[ENUM_FORM_TRANSPORTATION.DEPARTURE_TIME]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.departure_time.errors.required"
			// )
		})
		.nullable()
		// .refine((val) => val !== null, {
		// 	message: msg(
		// 		"form.general.details.form.fields.departure_time.errors.required"
		// 	)
		// }).or(z.literal(""))
		.optional(),
	[ENUM_FORM_TRANSPORTATION.DEPARTURE_TIMEZONE]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.departure_timezone.errors.required"
			// )
		})
		// .min(1, {
		// 	message: msg(
		// 		"form.general.details.form.fields.departure_timezone.errors.required"
		// 	)
		// })
		// .max(100, {
		// 	message: msg(
		// 		"form.general.details.form.fields.departure_timezone.errors.max"
		// 	)
		// })
		.optional(),
	[ENUM_FORM_TRANSPORTATION.ARRIVAL_TIME]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.arrival_time.errors.required"
			// )
		})
		.nullable()
		// .refine((val) => val !== null, {
		// 	message: msg(
		// 		"form.general.details.form.fields.arrival_time.errors.required"
		// 	)
		.or(z.literal(""))
		.optional(),
	[ENUM_FORM_TRANSPORTATION.ARRIVAL_TIMEZONE]: z
		.string({
			// message: msg(
			// 	"form.general.details.form.fields.arrival_timezone.errors.required"
			// )
		})
		// .min(1, {
		// 	message: msg(
		// 		"form.general.details.form.fields.arrival_timezone.errors.required"
		// 	)
		// })
		// .max(100, {
		// 	message: msg(
		// 		"form.general.details.form.fields.arrival_timezone.errors.max"
		// 	)
		// })
		.optional()
});
