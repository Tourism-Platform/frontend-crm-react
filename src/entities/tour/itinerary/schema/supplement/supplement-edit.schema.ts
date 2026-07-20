import { z } from "zod";

import { ENUM_SUPPLEMENT_FORM_SECTION as ENUM_FORM_SECTION } from "../../types";

import { ITEMS_SCHEMA } from "./items.schema";
import { SUPPLEMENT_PRICING_SCHEMA } from "./pricing.schema";

export const SUPPLEMENT_EDIT_SCHEMA = z.object({
	[ENUM_FORM_SECTION.ITEMS]: ITEMS_SCHEMA,
	[ENUM_FORM_SECTION.PRICING]: SUPPLEMENT_PRICING_SCHEMA,
	[ENUM_FORM_SECTION.NAME]: z.string().optional(),
	[ENUM_FORM_SECTION.DESCRIPTION]: z.string().optional(),
	[ENUM_FORM_SECTION.DAY]: z.number().optional(),
	[ENUM_FORM_SECTION.POSITION]: z.number().optional()
});
