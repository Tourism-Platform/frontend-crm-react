import type { TTourEventTransportationEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_FORM_CARS_TYPE,
	ENUM_TRANSPORTATION_FORM_SECTION as ENUM_FORM_SECTION,
	type ENUM_FORM_TRANSPORTATION_TYPE,
	type ENUM_TRANSPORTATION_PRICING_FIELD_TYPE
} from "@/entities/tour";

export { ENUM_FORM_SECTION };

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTourEventTransportationEditPageKeys,
	| ENUM_FORM_TRANSPORTATION_TYPE
	| ENUM_FORM_CARS_TYPE
	| ENUM_TRANSPORTATION_PRICING_FIELD_TYPE
>;
