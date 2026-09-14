import type { TFlightProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_FORM_FLIGHT_HOP_TYPE,
	ENUM_FORM_FLIGHT_PRODUCT_TYPE,
	ENUM_FORM_FLIGHT_VARIANT_TYPE
} from "@/entities/supplier";

export type TForm = TFormField<
	TFlightProductEditPageKeys,
	ENUM_FORM_FLIGHT_PRODUCT_TYPE
>;

export type THopForm = TFormField<
	TFlightProductEditPageKeys,
	ENUM_FORM_FLIGHT_HOP_TYPE
>;

export type TVariantForm = TFormField<
	TFlightProductEditPageKeys,
	ENUM_FORM_FLIGHT_VARIANT_TYPE
>;
