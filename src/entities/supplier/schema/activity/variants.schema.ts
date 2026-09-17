import { z } from "zod";

import { ENUM_FORM_ACTIVITY_MENU } from "../../types/activity/menu.types";
import { ENUM_FORM_ACTIVITY_VARIANT } from "../../types/activity/variant-form.types";
import { ENUM_FORM_ACTIVITY_VARIANTS } from "../../types/activity/variants-form.types";

import { ACTIVITY_VARIANT_FORM_SCHEMA } from "./variant.schema";

const ACTIVITY_MENU_ITEM_SCHEMA = z.object({
	[ENUM_FORM_ACTIVITY_MENU.ID]: z.string().optional(),
	[ENUM_FORM_ACTIVITY_MENU.NAME]: z.string(),
	[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: z.string().nullable().optional()
});

export const ACTIVITY_VARIANT_ROW_SCHEMA = ACTIVITY_VARIANT_FORM_SCHEMA.extend({
	[ENUM_FORM_ACTIVITY_VARIANTS.VARIANT_ID]: z.string(),
	[ENUM_FORM_ACTIVITY_VARIANT.MENU]: z.array(ACTIVITY_MENU_ITEM_SCHEMA)
});

export const ACTIVITY_VARIANTS_SCHEMA = z.object({
	[ENUM_FORM_ACTIVITY_VARIANTS.VARIANTS_LIST]: z.array(
		ACTIVITY_VARIANT_ROW_SCHEMA
	)
});
