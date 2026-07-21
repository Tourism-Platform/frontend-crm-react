import { z } from "zod";

import { ENUM_GUIDE_FORM_SECTION } from "../../types";

import { GUIDES_SCHEMA } from "./guides.schema";
import { GUIDE_PRICING_SCHEMA } from "./pricing.schema";

export const GUIDE_EDIT_SCHEMA = z.object({
	[ENUM_GUIDE_FORM_SECTION.GUIDES]: GUIDES_SCHEMA,
	[ENUM_GUIDE_FORM_SECTION.PRICING]: GUIDE_PRICING_SCHEMA,
	[ENUM_GUIDE_FORM_SECTION.NAME]: z.string().optional(),
	[ENUM_GUIDE_FORM_SECTION.DAY]: z.number().optional(),
	[ENUM_GUIDE_FORM_SECTION.POSITION]: z.number().optional()
});
