import { z } from "zod";

import { type TFlightProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_CURRENCY_OPTIONS } from "@/entities/commission";

import {
	ENUM_SUPPLIER_FEE_FIELD,
	ENUM_SUPPLIER_VARIANT_CHARGE
} from "../types";
import { ENUM_FORM_FLIGHT_VARIANT } from "../types/flight/variant-form.types";

const msg = i18nKey<TFlightProductEditPageKeys>();

export const FLIGHT_VARIANT_FEE_SCHEMA = z.object({
	[ENUM_SUPPLIER_FEE_FIELD.NAME]: z.string().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.COST]: z.number().nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.CURRENCY]: z
		.enum(ENUM_CURRENCY_OPTIONS)
		.nullable(),
	[ENUM_SUPPLIER_FEE_FIELD.DESCRIPTION]: z.string().nullable()
});

export const FLIGHT_VARIANT_CREATE_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT_VARIANT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.variants.fields.name.errors.required"))
});

export const FLIGHT_VARIANT_FORM_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT_VARIANT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.variants.fields.name.errors.required")),
	[ENUM_FORM_FLIGHT_VARIANT.CHARGE_TYP]: z.enum(ENUM_SUPPLIER_VARIANT_CHARGE),
	[ENUM_FORM_FLIGHT_VARIANT.COST]: z.number().nullable(),
	[ENUM_FORM_FLIGHT_VARIANT.CURRENCY]: z.enum(ENUM_CURRENCY_OPTIONS),
	[ENUM_FORM_FLIGHT_VARIANT.FEES]: z.array(FLIGHT_VARIANT_FEE_SCHEMA)
});
