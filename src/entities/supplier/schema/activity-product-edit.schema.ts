import { z } from "zod";

import { ENUM_FORM_ACTIVITY_SECTION } from "../types/activity/section.types";

import { ACTIVITY_PRODUCT_GENERAL_SCHEMA } from "./activity-product.schema";
import { ACTIVITY_VARIANTS_SCHEMA } from "./activity-variants.schema";

export const ACTIVITY_PRODUCT_EDIT_SCHEMA = z.object({
	[ENUM_FORM_ACTIVITY_SECTION.GENERAL]: ACTIVITY_PRODUCT_GENERAL_SCHEMA,
	[ENUM_FORM_ACTIVITY_SECTION.VARIANTS]: ACTIVITY_VARIANTS_SCHEMA
});
