import type { TTransferProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type {
	ENUM_FORM_TRANSFER_PRODUCT_TYPE,
	ENUM_FORM_TRANSFER_VARIANT_TYPE
} from "@/entities/supplier";

export type TForm = TFormField<
	TTransferProductEditPageKeys,
	ENUM_FORM_TRANSFER_PRODUCT_TYPE
>;

export type TVariantForm = TFormField<
	TTransferProductEditPageKeys,
	ENUM_FORM_TRANSFER_VARIANT_TYPE
>;
