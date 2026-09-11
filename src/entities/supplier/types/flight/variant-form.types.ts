import { z } from "zod";

import type { FLIGHT_VARIANT_FORM_SCHEMA } from "../../schema/flight-variant.schema";

export const ENUM_FORM_FLIGHT_VARIANT = {
	NAME: "name",
	CHARGE_TYP: "chargeTyp",
	COST: "cost",
	CURRENCY: "currency",
	FEES: "fees"
} as const;

export type ENUM_FORM_FLIGHT_VARIANT_TYPE =
	(typeof ENUM_FORM_FLIGHT_VARIANT)[keyof typeof ENUM_FORM_FLIGHT_VARIANT];

export type TFlightVariantFormSchema = z.infer<
	typeof FLIGHT_VARIANT_FORM_SCHEMA
>;
