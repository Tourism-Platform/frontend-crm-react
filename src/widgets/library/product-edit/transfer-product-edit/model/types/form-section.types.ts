import type { TTransferProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	ENUM_FORM_TRANSFER_SECTION as ENUM_FORM_SECTION,
	type ENUM_FORM_TRANSFER_CARS_TYPE,
	type ENUM_FORM_TRANSFER_PRODUCT_TYPE,
	type ENUM_TRANSFER_PRODUCT_PRICING_FIELD_TYPE
} from "@/entities/supplier";

export { ENUM_FORM_SECTION };

export type ENUM_FORM_SECTION_TYPE =
	(typeof ENUM_FORM_SECTION)[keyof typeof ENUM_FORM_SECTION];

export type TForm = TFormField<
	TTransferProductEditPageKeys,
	| ENUM_FORM_TRANSFER_PRODUCT_TYPE
	| ENUM_FORM_TRANSFER_CARS_TYPE
	| ENUM_TRANSFER_PRODUCT_PRICING_FIELD_TYPE
>;
