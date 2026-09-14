import { z } from "zod";

import type {
	BUS_VARIANT_CREATE_SCHEMA,
	BUS_VARIANT_FORM_SCHEMA
} from "../../schema/bus-variant.schema";

export const ENUM_FORM_BUS_VARIANT = {
	NAME: "name",
	BODY_TYPE: "bodyType",
	PAX: "pax",
	DESCRIPTION: "description",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees"
} as const;

export type ENUM_FORM_BUS_VARIANT_TYPE =
	(typeof ENUM_FORM_BUS_VARIANT)[keyof typeof ENUM_FORM_BUS_VARIANT];

export type TBusVariantFormSchema = z.infer<typeof BUS_VARIANT_FORM_SCHEMA>;
export type TBusVariantCreateSchema = z.infer<typeof BUS_VARIANT_CREATE_SCHEMA>;
