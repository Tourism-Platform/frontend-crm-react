import { z } from "zod";

import type {
	FLIGHT_VARIANT_CREATE_SCHEMA,
	FLIGHT_VARIANT_FORM_SCHEMA
} from "../../schema/flight-variant.schema";

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
export type TFlightVariantCreateSchema = z.infer<
	typeof FLIGHT_VARIANT_CREATE_SCHEMA
>;
export type TFlightChargeFormFields = Pick<
	TFlightVariantFormSchema,
	| typeof ENUM_FORM_FLIGHT_VARIANT.CHARGE_TYP
	| typeof ENUM_FORM_FLIGHT_VARIANT.COST
	| typeof ENUM_FORM_FLIGHT_VARIANT.CURRENCY
	| typeof ENUM_FORM_FLIGHT_VARIANT.FEES
>;
