import { z } from "zod";

import { type TFlightProductEditPageKeys, i18nKey } from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

import {
	ENUM_FORM_FLIGHT_HOP,
	ENUM_FORM_FLIGHT_PRODUCT
} from "../types/flight/product-form.types";

const msg = i18nKey<TFlightProductEditPageKeys>();

export const FLIGHT_HOP_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT_HOP.AIRLINE_CODE]: z
		.string()
		.regex(/^[A-Z0-9]{2,3}$/, {
			message: msg("form.general.fields.hops.airline_code.errors.pattern")
		})
		.optional()
		.nullable(),

	[ENUM_FORM_FLIGHT_HOP.FLIGHT_NUMBER]: z
		.string()
		.max(10, {
			message: msg("form.general.fields.hops.flight_number.errors.max")
		})
		.optional()
		.nullable(),

	[ENUM_FORM_FLIGHT_HOP.DEPARTURE_AIRPORT_CODE]: z
		.string()
		.regex(/^[A-Z]{3}$/, {
			message: msg(
				"form.general.fields.hops.departure_airport_code.errors.pattern"
			)
		})
		.optional()
		.nullable(),

	[ENUM_FORM_FLIGHT_HOP.ARRIVAL_AIRPORT_CODE]: z
		.string()
		.regex(/^[A-Z]{3}$/, {
			message: msg(
				"form.general.fields.hops.arrival_airport_code.errors.pattern"
			)
		})
		.optional()
		.nullable(),

	[ENUM_FORM_FLIGHT_HOP.DEPARTURE_LOCATION]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional(),

	[ENUM_FORM_FLIGHT_HOP.ARRIVAL_LOCATION]:
		GEO_FORM_VALUE_SCHEMA.nullable().optional(),

	[ENUM_FORM_FLIGHT_HOP.DEPARTURE_TERMINAL]: z
		.string()
		.max(10, {
			message: msg(
				"form.general.fields.hops.departure_terminal.errors.max"
			)
		})
		.optional()
		.nullable(),

	[ENUM_FORM_FLIGHT_HOP.DEPARTURE_GATE]: z
		.string()
		.max(10, {
			message: msg("form.general.fields.hops.departure_gate.errors.max")
		})
		.optional()
		.nullable()
});

export const FLIGHT_PRODUCT_GENERAL_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT_PRODUCT.NAME]: z
		.string()
		.trim()
		.min(1, msg("form.general.fields.name.errors.required")),
	[ENUM_FORM_FLIGHT_PRODUCT.HOPS]: z
		.array(FLIGHT_HOP_SCHEMA)
		.min(1, msg("form.general.fields.hops.errors.min_segments"))
});
