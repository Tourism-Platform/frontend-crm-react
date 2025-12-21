import { z } from "zod";

import { ENUM_FORM_TOUR_DETAILS } from "../types";

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_TOUR_DETAILS.DESCRIPTION]: z
		.string()
		.min(1, {
			message: "general.info.form.fields.description.errors.required"
		})
		.max(1000, {
			message: "general.info.form.fields.description.errors.max"
		})
});
