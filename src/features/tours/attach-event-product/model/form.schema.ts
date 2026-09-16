import { z } from "zod";

import { ENUM_FORM_ATTACH_PRODUCT } from "./types";

export const ATTACH_PRODUCT_PICKER_SCHEMA = z.object({
	[ENUM_FORM_ATTACH_PRODUCT.PRODUCT_ID]: z.string().uuid(),
	[ENUM_FORM_ATTACH_PRODUCT.VARIANT_ID]: z.string().uuid().nullable()
});
