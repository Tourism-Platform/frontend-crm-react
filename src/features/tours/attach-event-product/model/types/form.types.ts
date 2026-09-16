import { z } from "zod";

import type { TTourCommonEventsKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { ATTACH_PRODUCT_PICKER_SCHEMA } from "../form.schema";

export const ENUM_FORM_ATTACH_PRODUCT = {
	PRODUCT_ID: "product_id",
	VARIANT_ID: "variant_id"
} as const;

export type ENUM_FORM_ATTACH_PRODUCT_TYPE =
	(typeof ENUM_FORM_ATTACH_PRODUCT)[keyof typeof ENUM_FORM_ATTACH_PRODUCT];

export type TForm = TFormField<
	TTourCommonEventsKeys,
	ENUM_FORM_ATTACH_PRODUCT_TYPE
>;

export type TAttachProductPickerSchema = z.infer<
	typeof ATTACH_PRODUCT_PICKER_SCHEMA
>;
