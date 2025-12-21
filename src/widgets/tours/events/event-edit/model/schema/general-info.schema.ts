import { z } from "zod";

import { ENUM_FORM_EVENT } from "../types";

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_EVENT.EVENT_SUBTYPE]: z.string().min(1, {
		message: "general.events.form.fields.event_subtype.errors.required"
	}),

	[ENUM_FORM_EVENT.LOCATION]: z
		.string()
		.min(2, {
			message: "general.events.form.fields.location.errors.min"
		})
		.max(100, {
			message: "general.events.form.fields.location.errors.max"
		}),

	[ENUM_FORM_EVENT.EVENT_START_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message:
				"general.events.form.fields.event_start_time.errors.required"
		})
		.refine(
			(val) => val === null || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
			{
				message:
					"general.events.form.fields.event_start_time.errors.invalid"
			}
		),

	[ENUM_FORM_EVENT.START_TIMEZONE]: z.string().min(1, {
		message: "general.events.form.fields.start_timezone.errors.required"
	}),

	[ENUM_FORM_EVENT.EVENT_END_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: "general.events.form.fields.event_end_time.errors.required"
		})
		.refine(
			(val) => val === null || /^([01]\d|2[0-3]):([0-5]\d)$/.test(val),
			{
				message:
					"general.events.form.fields.event_end_time.errors.invalid"
			}
		),

	[ENUM_FORM_EVENT.END_TIMEZONE]: z.string().min(1, {
		message: "general.events.form.fields.end_timezone.errors.required"
	}),

	[ENUM_FORM_EVENT.DESCRIPTION]: z
		.string()
		.min(1, {
			message: "general.events.form.fields.description.errors.required"
		})
		.max(1000, {
			message: "general.events.form.fields.description.errors.max"
		})
});
