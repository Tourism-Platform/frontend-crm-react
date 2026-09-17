import { z } from "zod";

import type { FLIGHT_FARES_SCHEMA } from "../../schema/flight-fares.schema";

export const ENUM_FORM_FLIGHT_FARES = {
	FARES_LIST: "fares",
	VARIANT_ID: "variant_id",
	NAME: "name"
} as const;

export type ENUM_FORM_FLIGHT_FARES_TYPE =
	(typeof ENUM_FORM_FLIGHT_FARES)[keyof typeof ENUM_FORM_FLIGHT_FARES];

export type TFlightFaresSchema = z.infer<typeof FLIGHT_FARES_SCHEMA>;
export type TFlightFaresList =
	TFlightFaresSchema[typeof ENUM_FORM_FLIGHT_FARES.FARES_LIST];
export type TFlightFareRow = TFlightFaresList[number];
