import { z } from "zod";

import type {
	ACTIVITY_VARIANT_CREATE_SCHEMA,
	ACTIVITY_VARIANT_FORM_SCHEMA
} from "../../schema/activity-variant.schema";

export const ENUM_FORM_ACTIVITY_VARIANT = {
	NAME: "name",
	CHARGE_TYP: "chargeTyp",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees"
} as const;

export type ENUM_FORM_ACTIVITY_VARIANT_TYPE =
	(typeof ENUM_FORM_ACTIVITY_VARIANT)[keyof typeof ENUM_FORM_ACTIVITY_VARIANT];

export type TActivityVariantFormSchema = z.infer<
	typeof ACTIVITY_VARIANT_FORM_SCHEMA
>;
export type TActivityVariantCreateSchema = z.infer<
	typeof ACTIVITY_VARIANT_CREATE_SCHEMA
>;
