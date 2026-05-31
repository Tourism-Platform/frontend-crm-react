import { z } from "zod";

import type { INFO_EDIT_SCHEMA } from "../../schema";

export const ENUM_FORM_INFORMATION = {
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_INFORMATION_TYPE =
	(typeof ENUM_FORM_INFORMATION)[keyof typeof ENUM_FORM_INFORMATION];

export type TInfoEditSchema = z.infer<typeof INFO_EDIT_SCHEMA>;
