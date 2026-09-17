import { z } from "zod";

import type { TRANSFER_CARS_SCHEMA } from "../../schema/transfer/cars.schema";

export const ENUM_FORM_TRANSFER_CARS = {
	CARS_LIST: "cars",
	CAR_NAME: "car_name",
	PAX: "pax",
	DESCRIPTION: "description",
	VARIANT_ID: "variant_id",
	NAME: "name"
} as const;

export type ENUM_FORM_TRANSFER_CARS_TYPE =
	(typeof ENUM_FORM_TRANSFER_CARS)[keyof typeof ENUM_FORM_TRANSFER_CARS];

export type TTransferCarsSchema = z.infer<typeof TRANSFER_CARS_SCHEMA>;
export type TTransferCarsList =
	TTransferCarsSchema[typeof ENUM_FORM_TRANSFER_CARS.CARS_LIST];
export type TTransferCarRow = TTransferCarsList[number];
