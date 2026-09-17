import { z } from "zod";

import type { ACTIVITY_VARIANTS_SCHEMA } from "../../schema/activity/variants.schema";

export const ENUM_FORM_ACTIVITY_VARIANTS = {
	VARIANTS_LIST: "variants",
	VARIANT_ID: "variant_id"
} as const;

export type ENUM_FORM_ACTIVITY_VARIANTS_TYPE =
	(typeof ENUM_FORM_ACTIVITY_VARIANTS)[keyof typeof ENUM_FORM_ACTIVITY_VARIANTS];

export type TActivityVariantsSchema = z.infer<typeof ACTIVITY_VARIANTS_SCHEMA>;
export type TActivityVariantsList =
	TActivityVariantsSchema[typeof ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST];
export type TActivityVariantRow = TActivityVariantsList[number];
