import type { TBusProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_BUS_PRODUCT_PRICING_FIELD_TYPE,
	type ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD_TYPE,
	type ENUM_FORM_BUS_PRODUCT_TYPE,
	type ENUM_FORM_BUS_VEHICLES_TYPE,
	ENUM_FORM_BUS_SECTION as ENUM_FORM_SECTION
} from "@/entities/supplier";

export { ENUM_FORM_SECTION };

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TBusProductEditPageKeys,
	| ENUM_FORM_BUS_PRODUCT_TYPE
	| ENUM_FORM_BUS_VEHICLES_TYPE
	| ENUM_BUS_PRODUCT_PRICING_FIELD_TYPE
	| ENUM_BUS_PRODUCT_VEHICLE_PRICE_ROW_FIELD_TYPE
>;
