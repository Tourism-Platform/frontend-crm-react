import type { THotelProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_FORM_HOTEL_PRODUCT_TYPE,
	ENUM_FORM_HOTEL_VARIANT_ROOM_TYPE,
	ENUM_FORM_HOTEL_VARIANT_TYPE
} from "@/entities/supplier";

export type TForm = TFormField<
	THotelProductEditPageKeys,
	ENUM_FORM_HOTEL_PRODUCT_TYPE
>;

export type TVariantForm = TFormField<
	THotelProductEditPageKeys,
	ENUM_FORM_HOTEL_VARIANT_TYPE
>;

export type TVariantRoomForm = TFormField<
	THotelProductEditPageKeys,
	ENUM_FORM_HOTEL_VARIANT_ROOM_TYPE
>;
