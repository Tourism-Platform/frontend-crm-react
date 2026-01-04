import { z } from "zod";

import {
	type TTourEventMultiplyOptionEditPageKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_FORM_MULTIPLY_OPTION } from "../types/form-enum.types";

const msg = i18nKey<TTourEventMultiplyOptionEditPageKeys>();

export const OPTION_SCHEMA = z.object({
	name: z
		.string()
		.min(1, { message: msg("general.options.errors.name_required") }),
	checked: z.boolean()
});

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_MULTIPLY_OPTION.DESCRIPTION]: z
		.string()
		.min(1, {
			message: msg("general.description.description.errors.required")
		})
		.max(1000, {
			message: msg("general.description.description.errors.max")
		}),
	[ENUM_FORM_MULTIPLY_OPTION.OPTIONS]: z.array(OPTION_SCHEMA)
});
