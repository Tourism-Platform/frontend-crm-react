import type { TTourActivityEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_ACTIVITY_PRICING_FIELD_TYPE,
	ENUM_FORM_ACTIVITY_TYPE
} from "@/entities/tour";

export const ENUM_FORM_SECTION = {
	GENERAL: "general",
	PRICING: "pricing",
	DAY: "day",
	POSITION: "position",
	NAME: "name"
} as const;

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTourActivityEditPageKeys,
	ENUM_FORM_ACTIVITY_TYPE | ENUM_ACTIVITY_PRICING_FIELD_TYPE
>;
