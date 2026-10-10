import { z } from "zod";

import type { TRANSPORTATION_CARS_SCHEMA as CARS_SCHEMA } from "../../schema";

export const ENUM_FORM_CARS = {
	CARS_LIST: "cars",
	/** Backend car node id — echoed on every save so photos survive. */
	ID: "id",
	CAR_NAME: "car_name",
	PAX: "pax",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_CARS_TYPE =
	(typeof ENUM_FORM_CARS)[keyof typeof ENUM_FORM_CARS];

export type TCarsSchema = z.infer<typeof CARS_SCHEMA>;

export type TCarsList = TCarsSchema[typeof ENUM_FORM_CARS.CARS_LIST];
