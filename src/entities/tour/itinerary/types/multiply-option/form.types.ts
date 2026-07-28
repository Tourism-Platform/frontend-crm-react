import { z } from "zod";

import type { MULTIPLY_OPTION_EDIT_SCHEMA } from "../../schema";

export const ENUM_FORM_MULTIPLY_OPTION = {
	NAME: "name",
	DESCRIPTION: "description",
	OPTIONS: "options"
} as const;

export type ENUM_FORM_MULTIPLY_OPTION_TYPE =
	(typeof ENUM_FORM_MULTIPLY_OPTION)[keyof typeof ENUM_FORM_MULTIPLY_OPTION];

export type TMultiplyOptionEditSchema = z.infer<
	typeof MULTIPLY_OPTION_EDIT_SCHEMA
>;
