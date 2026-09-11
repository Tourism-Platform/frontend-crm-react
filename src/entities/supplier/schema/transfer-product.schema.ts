import { z } from "zod";

import { type TTransferProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_TRANSFER_PRODUCT } from "../types/transfer/product-form.types";

const msg = i18nKey<TTransferProductEditPageKeys>();

export const TRANSFER_PRODUCT_GENERAL_SCHEMA = z.object({
	[ENUM_FORM_TRANSFER_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.fields.name.errors.required"))
});
