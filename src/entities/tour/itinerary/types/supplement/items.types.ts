import { z } from "zod";

import type { SUPPLEMENT_ITEMS_SCHEMA as ITEMS_SCHEMA } from "../../schema";

export const ENUM_FORM_SUPPLEMENT_ITEMS = {
	ITEMS_LIST: "items",
	NAME: "name",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_SUPPLEMENT_ITEMS_TYPE =
	(typeof ENUM_FORM_SUPPLEMENT_ITEMS)[keyof typeof ENUM_FORM_SUPPLEMENT_ITEMS];

export type TSupplementItemsSchema = z.infer<typeof ITEMS_SCHEMA>;
