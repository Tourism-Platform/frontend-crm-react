import type { TBusProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_FORM_BUS_PRODUCT_TYPE,
	ENUM_FORM_BUS_VARIANT_TYPE
} from "@/entities/supplier";

export type TForm = TFormField<
	TBusProductEditPageKeys,
	ENUM_FORM_BUS_PRODUCT_TYPE
>;

export type TVariantForm = TFormField<
	TBusProductEditPageKeys,
	ENUM_FORM_BUS_VARIANT_TYPE
>;
