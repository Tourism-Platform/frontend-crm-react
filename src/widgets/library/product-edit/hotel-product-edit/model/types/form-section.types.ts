import type { THotelProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_FORM_HOTEL_PRODUCT_ROOMS_TYPE,
	type ENUM_FORM_HOTEL_PRODUCT_TYPE,
	ENUM_FORM_HOTEL_SECTION as ENUM_FORM_SECTION,
	type ENUM_HOTEL_PRODUCT_PRICING_FIELD_TYPE
} from "@/entities/supplier";

export { ENUM_FORM_SECTION };

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	THotelProductEditPageKeys,
	| ENUM_FORM_HOTEL_PRODUCT_TYPE
	| ENUM_FORM_HOTEL_PRODUCT_ROOMS_TYPE
	| ENUM_HOTEL_PRODUCT_PRICING_FIELD_TYPE
>;
