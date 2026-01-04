import { z } from "zod";

import { type TTourEventEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_EVENT } from "../types";

const msg = i18nKey<TTourEventEditPageKeys>();

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_EVENT.EVENT_SUBTYPE]: z
		.string()
		.min(1, {
			message: msg(
				"general.events.form.fields.event_subtype.errors.required"
			)
		})
		.max(100, {
			message: msg("general.events.form.fields.event_subtype.errors.max")
		}),

	[ENUM_FORM_EVENT.LOCATION]: z
		.string()
		.min(1, {
			message: msg("general.events.form.fields.location.errors.required")
		})
		.min(2, {
			message: msg("general.events.form.fields.location.errors.min")
		})
		.max(100, {
			message: msg("general.events.form.fields.location.errors.max")
		}),

	[ENUM_FORM_EVENT.EVENT_START_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.events.form.fields.event_start_time.errors.required"
			)
		})
		.refine(
			(val) => val === null || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
			{
				message: msg(
					"general.events.form.fields.event_start_time.errors.invalid"
				)
			}
		),

	[ENUM_FORM_EVENT.START_TIMEZONE]: z
		.string()
		.min(1, {
			message: msg(
				"general.events.form.fields.start_timezone.errors.required"
			)
		})
		.max(100, {
			message: msg("general.events.form.fields.start_timezone.errors.max")
		}),

	[ENUM_FORM_EVENT.EVENT_END_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.events.form.fields.event_end_time.errors.required"
			)
		})
		.refine(
			(val) => val === null || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
			{
				message: msg(
					"general.events.form.fields.event_end_time.errors.invalid"
				)
			}
		),

	[ENUM_FORM_EVENT.END_TIMEZONE]: z
		.string()
		.min(1, {
			message: msg(
				"general.events.form.fields.end_timezone.errors.required"
			)
		})
		.max(100, {
			message: msg("general.events.form.fields.end_timezone.errors.max")
		}),

	[ENUM_FORM_EVENT.DESCRIPTION]: z
		.string()
		.min(1, {
			message: msg(
				"general.events.form.fields.description.errors.required"
			)
		})
		.max(1000, {
			message: msg("general.events.form.fields.description.errors.max")
		})
});
