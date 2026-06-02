import type { TTourEventFlightEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_FLIGHT_PRICING_FIELD_TYPE,
	type ENUM_FORM_BUS_TYPE,
	type ENUM_FORM_FLIGHT_TYPE,
	ENUM_FLIGHT_FORM_SECTION as ENUM_FORM_SECTION,
	type ENUM_FORM_TRAIN_TYPE
} from "@/entities/tour";

export { ENUM_FORM_SECTION };

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTourEventFlightEditPageKeys,
	| ENUM_FORM_FLIGHT_TYPE
	| ENUM_FORM_BUS_TYPE
	| ENUM_FORM_TRAIN_TYPE
	| ENUM_FLIGHT_PRICING_FIELD_TYPE
>;
