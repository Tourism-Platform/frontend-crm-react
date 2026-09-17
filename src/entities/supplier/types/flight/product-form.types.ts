import { z } from "zod";

import type { TFlightProductEditPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

import type { FLIGHT_PRODUCT_EDIT_SCHEMA } from "../../schema/flight-product-edit.schema";
import type { FLIGHT_PRODUCT_PRICING_SCHEMA } from "../../schema/flight-product-pricing.schema";
import type {
	FLIGHT_HOP_SCHEMA,
	FLIGHT_PRODUCT_GENERAL_SCHEMA
} from "../../schema/flight-product.schema";

export const ENUM_FORM_FLIGHT_PRODUCT = {
	NAME: "name",
	HOPS: "hops"
} as const;

export type ENUM_FORM_FLIGHT_PRODUCT_TYPE =
	(typeof ENUM_FORM_FLIGHT_PRODUCT)[keyof typeof ENUM_FORM_FLIGHT_PRODUCT];

export const ENUM_FORM_FLIGHT_HOP = {
	AIRLINE_CODE: "airline_code",
	FLIGHT_NUMBER: "flight_number",
	DEPARTURE_AIRPORT_CODE: "departure_airport_code",
	ARRIVAL_AIRPORT_CODE: "arrival_airport_code",
	DEPARTURE_LOCATION: "departure_location",
	ARRIVAL_LOCATION: "arrival_location",
	DEPARTURE_TERMINAL: "departure_terminal",
	DEPARTURE_GATE: "departure_gate"
} as const;

export type ENUM_FORM_FLIGHT_HOP_TYPE =
	(typeof ENUM_FORM_FLIGHT_HOP)[keyof typeof ENUM_FORM_FLIGHT_HOP];

export type TFlightHopFormSchema = z.infer<typeof FLIGHT_HOP_SCHEMA>;

export type TFlightProductGeneralSchema = z.infer<
	typeof FLIGHT_PRODUCT_GENERAL_SCHEMA
>;
export type TFlightProductPricingSchema = z.infer<
	typeof FLIGHT_PRODUCT_PRICING_SCHEMA
>;
export type TFlightProductEditSchema = z.infer<
	typeof FLIGHT_PRODUCT_EDIT_SCHEMA
>;

export type TFlightProductFormField = TFormField<
	TFlightProductEditPageKeys,
	ENUM_FORM_FLIGHT_PRODUCT_TYPE | ENUM_FORM_FLIGHT_HOP_TYPE
>;
