import { z } from "zod";

import {
	type TTourEventTransportationEditPageKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_FORM_TRANSPORTATION } from "../types";

const msg = i18nKey<TTourEventTransportationEditPageKeys>();

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_TRANSPORTATION.DESCRIPTION]: z
		.string()
		.min(1, {
			message: msg("general.description.description.errors.required")
		})
		.max(1000, {
			message: msg("general.description.description.errors.max")
		}),

	[ENUM_FORM_TRANSPORTATION.TRANSFER_TYPE]: z
		.string()
		.min(1, {
			message: msg(
				"general.details.form.fields.transfer_type.errors.required"
			)
		})
		.max(100, {
			message: msg("general.details.form.fields.transfer_type.errors.max")
		}),
	[ENUM_FORM_TRANSPORTATION.MEET_POINT]: z
		.string()
		.min(1, {
			message: msg(
				"general.details.form.fields.meet_point.errors.required"
			)
		})
		.max(200, {
			message: msg("general.details.form.fields.meet_point.errors.max")
		}),
	[ENUM_FORM_TRANSPORTATION.END_POINT]: z
		.string()
		.min(1, {
			message: msg(
				"general.details.form.fields.end_point.errors.required"
			)
		})
		.max(200, {
			message: msg("general.details.form.fields.end_point.errors.max")
		}),
	[ENUM_FORM_TRANSPORTATION.DEPARTURE_DATE]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.details.form.fields.departure_date.errors.required"
			)
		}),
	[ENUM_FORM_TRANSPORTATION.ARRIVAL_DATE]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.details.form.fields.arrival_date.errors.required"
			)
		}),
	[ENUM_FORM_TRANSPORTATION.DEPARTURE_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.details.form.fields.departure_time.errors.required"
			)
		}),
	[ENUM_FORM_TRANSPORTATION.DEPARTURE_TIMEZONE]: z
		.string()
		.min(1, {
			message: msg(
				"general.details.form.fields.departure_timezone.errors.required"
			)
		})
		.max(100, {
			message: msg(
				"general.details.form.fields.departure_timezone.errors.max"
			)
		}),
	[ENUM_FORM_TRANSPORTATION.ARRIVAL_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.details.form.fields.arrival_time.errors.required"
			)
		}),
	[ENUM_FORM_TRANSPORTATION.ARRIVAL_TIMEZONE]: z
		.string()
		.min(1, {
			message: msg(
				"general.details.form.fields.arrival_timezone.errors.required"
			)
		})
		.max(100, {
			message: msg(
				"general.details.form.fields.arrival_timezone.errors.max"
			)
		})
});
