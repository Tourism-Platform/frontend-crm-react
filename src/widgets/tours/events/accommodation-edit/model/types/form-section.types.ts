import type { TTourAccommodationEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD_TYPE,
	type ENUM_ACCOMMODATION_PRICE_ROW_FIELD_TYPE,
	type ENUM_ACCOMMODATION_PRICING_FIELD_TYPE,
	type ENUM_FORM_ACCOMMODATION_TYPE,
	type ENUM_FORM_ROOMS_TYPE
} from "@/entities/tour";

export const ENUM_FORM_SECTION = {
	GENERAL: "general",
	ROOMS: "rooms",
	PRICING: "pricing",
	DAY: "day",
	POSITION: "position",
	NAME: "name"
} as const;

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTourAccommodationEditPageKeys,
	| ENUM_FORM_ACCOMMODATION_TYPE
	| ENUM_FORM_ROOMS_TYPE
	| ENUM_ACCOMMODATION_PRICING_FIELD_TYPE
	| ENUM_ACCOMMODATION_PRICE_ROW_FIELD_TYPE
	| ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD_TYPE
>;
