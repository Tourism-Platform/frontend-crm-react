import { z } from "zod";

import { type TActivityProductEditPageKeys, i18nKey } from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

import { ENUM_ACTIVITY_SUB_TYPE } from "../types";
import { ENUM_FORM_ACTIVITY_PRODUCT } from "../types/activity/product-form.types";

const msg = i18nKey<TActivityProductEditPageKeys>();

export const ACTIVITY_PRODUCT_GENERAL_SCHEMA = z.object({
	[ENUM_FORM_ACTIVITY_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.fields.name.errors.required")),
	[ENUM_FORM_ACTIVITY_PRODUCT.LOCATION]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional(),
	[ENUM_FORM_ACTIVITY_PRODUCT.SUB_TYP]: z.enum(ENUM_ACTIVITY_SUB_TYPE)
});
