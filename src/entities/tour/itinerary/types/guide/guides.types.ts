import { z } from "zod";

import type { GUIDE_GUIDES_SCHEMA as GUIDES_SCHEMA } from "../../schema";

export const ENUM_FORM_GUIDES = {
	GUIDES_LIST: "guides_list",
	GUIDE_TYPE: "guide_type",
	DURATION_DAYS: "duration_days"
} as const;

export type ENUM_FORM_GUIDES_TYPE =
	(typeof ENUM_FORM_GUIDES)[keyof typeof ENUM_FORM_GUIDES];

export type TGuidesSchema = z.infer<typeof GUIDES_SCHEMA>;
