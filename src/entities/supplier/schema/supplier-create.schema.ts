import { z } from "zod";

import { type TSuppliersPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_SUPPLIER } from "../types/supplier-form.types";

const msg = i18nKey<TSuppliersPageKeys>();

export const SUPPLIER_CREATE_SCHEMA = z.object({
	[ENUM_FORM_SUPPLIER.BRAND_NAME]: z
		.string()
		.trim()
		.min(1, msg("create.errors.brandName.required")),
	[ENUM_FORM_SUPPLIER.LEGAL_NAME]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.PHONE]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.WEBSITE]: z.string().trim().nullable().optional()
});
