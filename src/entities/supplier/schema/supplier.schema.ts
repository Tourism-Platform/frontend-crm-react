import { z } from "zod";

import {
	type TSupplierIdPageKeys,
	type TSuppliersPageKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_SUPPLIER_TYPE } from "../types/supplier-type.types";

const createMsg = i18nKey<TSuppliersPageKeys>();
const updateMsg = i18nKey<TSupplierIdPageKeys>();

export const ENUM_FORM_SUPPLIER = {
	BRAND_NAME: "brandName",
	LEGAL_NAME: "legalName",
	PHONE: "phone",
	WEBSITE: "website",
	SUPPLIER_TYPES: "supplierTypes"
} as const;

export type ENUM_FORM_SUPPLIER_TYPE =
	(typeof ENUM_FORM_SUPPLIER)[keyof typeof ENUM_FORM_SUPPLIER];

export const SUPPLIER_CREATE_SCHEMA = z.object({
	[ENUM_FORM_SUPPLIER.BRAND_NAME]: z
		.string()
		.trim()
		.min(1, createMsg("create.errors.brandName.required")),
	[ENUM_FORM_SUPPLIER.LEGAL_NAME]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.PHONE]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.WEBSITE]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.SUPPLIER_TYPES]: z
		.array(z.nativeEnum(ENUM_SUPPLIER_TYPE))
		.min(1, createMsg("create.errors.supplierTypes.required"))
});

export type TSupplierCreateSchema = z.infer<typeof SUPPLIER_CREATE_SCHEMA>;

export const SUPPLIER_UPDATE_SCHEMA = z.object({
	[ENUM_FORM_SUPPLIER.BRAND_NAME]: z
		.string()
		.trim()
		.min(1, updateMsg("errors.brandName.required")),
	[ENUM_FORM_SUPPLIER.LEGAL_NAME]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.PHONE]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.WEBSITE]: z.string().trim().nullable().optional(),
	[ENUM_FORM_SUPPLIER.SUPPLIER_TYPES]: z
		.array(z.nativeEnum(ENUM_SUPPLIER_TYPE))
		.min(1, updateMsg("errors.supplierTypes.required"))
});

export type TSupplierUpdateSchema = z.infer<typeof SUPPLIER_UPDATE_SCHEMA>;
