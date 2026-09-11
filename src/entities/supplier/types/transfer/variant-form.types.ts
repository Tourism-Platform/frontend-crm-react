import { z } from "zod";

import type { TRANSFER_VARIANT_FORM_SCHEMA } from "../../schema/transfer-variant.schema";

export const ENUM_FORM_TRANSFER_VARIANT = {
	NAME: "name",
	BODY_TYPE: "bodyType",
	PAX: "pax",
	DESCRIPTION: "description",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees"
} as const;

export type ENUM_FORM_TRANSFER_VARIANT_TYPE =
	(typeof ENUM_FORM_TRANSFER_VARIANT)[keyof typeof ENUM_FORM_TRANSFER_VARIANT];

export type TTransferVariantFormSchema = z.infer<
	typeof TRANSFER_VARIANT_FORM_SCHEMA
>;
