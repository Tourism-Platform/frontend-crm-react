import { z } from "zod";

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
	AIRLINE_CODE: "airlineCode",
	FLIGHT_NUMBER: "flightNumber",
	DEPARTURE_AIRPORT_CODE: "departureAirportCode",
	ARRIVAL_AIRPORT_CODE: "arrivalAirportCode",
	DEPARTURE_LOCATION: "departureLocation",
	ARRIVAL_LOCATION: "arrivalLocation",
	DEPARTURE_TERMINAL: "departureTerminal",
	DEPARTURE_GATE: "departureGate"
} as const;

export type ENUM_FORM_FLIGHT_HOP_TYPE =
	(typeof ENUM_FORM_FLIGHT_HOP)[keyof typeof ENUM_FORM_FLIGHT_HOP];

export type TFlightHopFormSchema = z.infer<typeof FLIGHT_HOP_SCHEMA>;
export type TFlightProductGeneralSchema = z.infer<
	typeof FLIGHT_PRODUCT_GENERAL_SCHEMA
>;
