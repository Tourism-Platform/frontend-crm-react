import { z } from "zod";

import type { GUIDE_GUIDES_SCHEMA as GUIDES_SCHEMA } from "../../schema";

export const ENUM_FORM_GUIDES = {
	DURATION_DAYS: "duration_days",
	TYP_TIERS: "typ_tiers",
	GUIDE_TYPE: "guide_type",
	UP_TO_PAX: "up_to_pax"
} as const;

export type ENUM_FORM_GUIDES_TYPE =
	(typeof ENUM_FORM_GUIDES)[keyof typeof ENUM_FORM_GUIDES];

export type TGuidesSchema = z.infer<typeof GUIDES_SCHEMA>;
