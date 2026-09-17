import { z } from "zod";

import type {
	TRANSFER_VARIANT_CREATE_SCHEMA,
	TRANSFER_VARIANT_FORM_SCHEMA
} from "../../schema/transfer-variant.schema";
import type { ENUM_SUPPLIER_SURCHARGE_TYPE } from "../supplier-money.types";

export const ENUM_FORM_TRANSFER_MARKUP = {
	TYP: "typ",
	VALUE: "value"
} as const;

export type ENUM_FORM_TRANSFER_MARKUP_TYPE =
	(typeof ENUM_FORM_TRANSFER_MARKUP)[keyof typeof ENUM_FORM_TRANSFER_MARKUP];

export type TTransferMarkupForm = {
	typ: ENUM_SUPPLIER_SURCHARGE_TYPE;
	value: string;
} | null;

export const ENUM_FORM_TRANSFER_VARIANT = {
	NAME: "name",
	BODY_TYPE: "body_type",
	PAX: "pax",
	DESCRIPTION: "description",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees",
	CATEGORIES: "categories",
	ADD_MARGIN_SEPARATELY: "addMarginSeparately",
	MARKUP: "markup"
} as const;

export type ENUM_FORM_TRANSFER_VARIANT_TYPE =
	(typeof ENUM_FORM_TRANSFER_VARIANT)[keyof typeof ENUM_FORM_TRANSFER_VARIANT];

export const ENUM_FORM_TRANSFER_CATEGORY = {
	ID: "id",
	NAME: "name",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees",
	MARKUP: "markup"
} as const;

export type ENUM_FORM_TRANSFER_CATEGORY_TYPE =
	(typeof ENUM_FORM_TRANSFER_CATEGORY)[keyof typeof ENUM_FORM_TRANSFER_CATEGORY];

export type TTransferVariantFormSchema = z.infer<
	typeof TRANSFER_VARIANT_FORM_SCHEMA
>;
export type TTransferVariantCategoryFormSchema =
	TTransferVariantFormSchema[typeof ENUM_FORM_TRANSFER_VARIANT.CATEGORIES][number];
export type TTransferVariantCreateSchema = z.infer<
	typeof TRANSFER_VARIANT_CREATE_SCHEMA
>;
