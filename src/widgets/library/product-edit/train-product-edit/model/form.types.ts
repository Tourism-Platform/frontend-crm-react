import type { TTrainProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_FORM_TRAIN_HOP_TYPE,
	ENUM_FORM_TRAIN_PRODUCT_TYPE,
	ENUM_FORM_TRAIN_VARIANT_TYPE
} from "@/entities/supplier";

export type TForm = TFormField<
	TTrainProductEditPageKeys,
	ENUM_FORM_TRAIN_PRODUCT_TYPE
>;

export type THopForm = TFormField<
	TTrainProductEditPageKeys,
	ENUM_FORM_TRAIN_HOP_TYPE
>;

export type TVariantForm = TFormField<
	TTrainProductEditPageKeys,
	ENUM_FORM_TRAIN_VARIANT_TYPE
>;
