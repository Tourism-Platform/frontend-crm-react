import { z } from "zod";

import { ENUM_FORM_MULTIPLY_OPTION } from "../types/form-enum.types";

export const OPTION_SCHEMA = z.object({
	name: z
		.string()
		.min(1, { message: "general.options.errors.name_required" }),
	checked: z.boolean()
});

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_MULTIPLY_OPTION.DESCRIPTION]: z
		.string()
		.min(2, { message: "general.description.description.errors.required" })
		.max(50, { message: "general.description.description.errors.max" }),
	[ENUM_FORM_MULTIPLY_OPTION.OPTIONS]: z.array(OPTION_SCHEMA)
});
