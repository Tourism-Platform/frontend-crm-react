import { z } from "zod";

import type { SUPPLIER_CREATE_SCHEMA } from "../schema/supplier-create.schema";
import type { SUPPLIER_UPDATE_SCHEMA } from "../schema/supplier-update.schema";

export const ENUM_FORM_SUPPLIER = {
	BRAND_NAME: "brandName",
	LEGAL_NAME: "legalName",
	PHONE: "phone",
	WEBSITE: "website",
	SUPPLIER_TYPES: "supplierTypes"
} as const;

export type ENUM_FORM_SUPPLIER_TYPE =
	(typeof ENUM_FORM_SUPPLIER)[keyof typeof ENUM_FORM_SUPPLIER];

export type TSupplierCreateSchema = z.infer<typeof SUPPLIER_CREATE_SCHEMA>;
export type TSupplierUpdateSchema = z.infer<typeof SUPPLIER_UPDATE_SCHEMA>;
