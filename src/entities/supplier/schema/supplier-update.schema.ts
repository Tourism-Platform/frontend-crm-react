import { z } from "zod";

import { type TSupplierIdPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_SUPPLIER } from "../types/supplier-form.types";

const msg = i18nKey<TSupplierIdPageKeys>();

export const SUPPLIER_UPDATE_SCHEMA = z.object({
	[ENUM_FORM_SUPPLIER.BRAND_NAME]: z
		.string()
		.trim()
		.min(1, msg("errors.brandName.required")),
	[ENUM_FORM_SUPPLIER.LEGAL_NAME]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.PHONE]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.WEBSITE]: z.string().trim().nullable().optional()
});
