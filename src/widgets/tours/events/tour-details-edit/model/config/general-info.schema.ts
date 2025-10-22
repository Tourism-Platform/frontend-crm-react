import { z } from "zod";

import { ENUM_FORM_TOUR_DETAILS } from "../types";

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_TOUR_DETAILS.DESCRIPTION]: z
		.string()
		.min(2, {
			message: "general.info.form.fields.description.errors.required"
		})
		.max(500, {
			message: "general.info.form.fields.description.errors.max"
		})
});
