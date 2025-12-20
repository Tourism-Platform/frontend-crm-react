import { z } from "zod";

import { ENUM_FORM_TRANSPORTATION } from "../types";

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_TRANSPORTATION.DESCRIPTION]: z
		.string()
		.min(2, { message: "general.description.description.errors.min" })
		.max(50, { message: "general.description.description.errors.max" }),

	[ENUM_FORM_TRANSPORTATION.TRANSFER_TYPE]: z.string().min(1, {
		message: "general.details.form.fields.transfer_type.errors.required"
	}),
	[ENUM_FORM_TRANSPORTATION.MEET_POINT]: z.string().min(1, {
		message: "general.details.form.fields.meet_point.errors.required"
	}),
	[ENUM_FORM_TRANSPORTATION.END_POINT]: z.string().min(1, {
		message: "general.details.form.fields.end_point.errors.required"
	}),
	[ENUM_FORM_TRANSPORTATION.DEPARTURE_DATE]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message:
				"general.details.form.fields.departure_date.errors.required"
		}),
	[ENUM_FORM_TRANSPORTATION.ARRIVAL_DATE]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: "general.details.form.fields.arrival_date.errors.required"
		}),
	[ENUM_FORM_TRANSPORTATION.DEPARTURE_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message:
				"general.details.form.fields.departure_time.errors.required"
		}),
	[ENUM_FORM_TRANSPORTATION.DEPARTURE_TIMEZONE]: z.string().min(1, {
		message:
			"general.details.form.fields.departure_timezone.errors.required"
	}),
	[ENUM_FORM_TRANSPORTATION.ARRIVAL_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: "general.details.form.fields.arrival_time.errors.required"
		}),
	[ENUM_FORM_TRANSPORTATION.ARRIVAL_TIMEZONE]: z.string().min(1, {
		message: "general.details.form.fields.arrival_timezone.errors.required"
	})
});
