import { z } from "zod";

import type { ACTIVITY_PRODUCT_EDIT_SCHEMA } from "../../schema/activity-product-edit.schema";
import type { ACTIVITY_PRODUCT_GENERAL_SCHEMA } from "../../schema/activity-product.schema";

export const ENUM_FORM_ACTIVITY_PRODUCT = {
	NAME: "name",
	LOCATION: "location",
	SUB_TYP: "subTyp"
} as const;

export type ENUM_FORM_ACTIVITY_PRODUCT_TYPE =
	(typeof ENUM_FORM_ACTIVITY_PRODUCT)[keyof typeof ENUM_FORM_ACTIVITY_PRODUCT];

export type TActivityProductGeneralSchema = z.infer<
	typeof ACTIVITY_PRODUCT_GENERAL_SCHEMA
>;

export type TActivityProductEditSchema = z.infer<
	typeof ACTIVITY_PRODUCT_EDIT_SCHEMA
>;
