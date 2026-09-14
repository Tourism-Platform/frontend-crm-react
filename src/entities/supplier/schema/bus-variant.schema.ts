import { z } from "zod";

import { type TBusProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import { ENUM_SUPPLIER_FEE_FIELD, ENUM_VEHICLE_BODY_TYPE } from "../types";
import { ENUM_FORM_BUS_VARIANT } from "../types/bus/variant-form.types";

const msg = i18nKey<TBusProductEditPageKeys>();

const BUS_VARIANT_FEE_SCHEMA = z.object({
	[ENUM_SUPPLIER_FEE_FIELD.NAME]: z.string().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.COST]: z.number().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: z
		.enum(ENUM_CURRENCY_OPTIONS)
		.nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: z.string().nullable()
});

export const BUS_VARIANT_FORM_SCHEMA = z.object({
	[ENUM_FORM_BUS_VARIANT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.variants.fields.name.errors.required")),
	[ENUM_FORM_BUS_VARIANT.BODY_TYPE]: z.enum(ENUM_VEHICLE_BODY_TYPE),
	[ENUM_FORM_BUS_VARIANT.PAX]: z
		.number()
		.int()
		.min(1, msg("form.variants.fields.pax.errors.min")),
	[ENUM_FORM_BUS_VARIANT.DESCRIPTION]: z.string(),
	[ENUM_FORM_BUS_VARIANT.COST]: z.string(),
	[ENUM_FORM_BUS_VARIANT.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_BUS_VARIANT.FEES]: z.array(BUS_VARIANT_FEE_SCHEMA)
});
