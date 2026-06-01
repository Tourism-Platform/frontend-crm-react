import { z } from "zod";

import { ENUM_ACTIVITY_FORM_SECTION as ENUM_FORM_SECTION } from "../../types";

import { GENERAL_INFO_SCHEMA } from "./general-info.schema";

export const ACTIVITY_EDIT_SCHEMA = z.object({
	[ENUM_FORM_SECTION.GENERAL]: GENERAL_INFO_SCHEMA,
	[ENUM_FORM_SECTION.NAME]: z.string().optional(),
	[ENUM_FORM_SECTION.DAY]: z.number().optional(),
	[ENUM_FORM_SECTION.POSITION]: z.number().optional()
});
