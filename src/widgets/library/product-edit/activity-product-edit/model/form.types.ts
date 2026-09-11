import type { TActivityProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_FORM_ACTIVITY_PRODUCT_TYPE,
	ENUM_FORM_ACTIVITY_VARIANT_TYPE
} from "@/entities/supplier";

export type TForm = TFormField<
	TActivityProductEditPageKeys,
	ENUM_FORM_ACTIVITY_PRODUCT_TYPE
>;

export type TVariantForm = TFormField<
	TActivityProductEditPageKeys,
	ENUM_FORM_ACTIVITY_VARIANT_TYPE
>;
