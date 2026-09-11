import { z } from "zod";

import { type TBusProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_BUS_PRODUCT } from "../types/bus/product-form.types";

const msg = i18nKey<TBusProductEditPageKeys>();

export const BUS_PRODUCT_GENERAL_SCHEMA = z.object({
	[ENUM_FORM_BUS_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.fields.name.errors.required"))
});
