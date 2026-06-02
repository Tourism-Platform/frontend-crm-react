import type { TTourEventTransportationEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_FORM_CARS_TYPE,
	ENUM_FORM_TRANSPORTATION_TYPE,
	ENUM_TRANSPORTATION_PRICING_FIELD_TYPE
} from "@/entities/tour";

export const ENUM_FORM_SECTION = {
	GENERAL: "general",
	CARS: "cars",
	PRICING: "pricing",
	DAY: "day",
	POSITION: "position",
	NAME: "name"
} as const;

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTourEventTransportationEditPageKeys,
	| ENUM_FORM_TRANSPORTATION_TYPE
	| ENUM_FORM_CARS_TYPE
	| ENUM_TRANSPORTATION_PRICING_FIELD_TYPE
>;
