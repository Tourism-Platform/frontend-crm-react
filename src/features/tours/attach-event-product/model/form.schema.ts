import { z } from "zod";

import { ENUM_FORM_ATTACH_PRODUCT } from "./types";

export const ATTACH_PRODUCT_PICKER_SCHEMA = z.object({
	[ENUM_FORM_ATTACH_PRODUCT.SEARCH]: z.string(),
	[ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID]: z.string().uuid().nullable()
});

export type TAttachProductPickerSchema = z.infer<
	typeof ATTACH_PRODUCT_PICKER_SCHEMA
>;
