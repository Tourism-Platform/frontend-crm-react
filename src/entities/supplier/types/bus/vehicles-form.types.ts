import { z } from "zod";

import type { BUS_VEHICLES_SCHEMA } from "../../schema/bus-vehicles.schema";

export const ENUM_FORM_BUS_VEHICLES = {
	VEHICLES_LIST: "vehicles",
	VARIANT_ID: "variant_id",
	NAME: "name",
	BODY_TYPE: "body_type",
	PAX: "pax",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_BUS_VEHICLES_TYPE =
	(typeof ENUM_FORM_BUS_VEHICLES)[keyof typeof ENUM_FORM_BUS_VEHICLES];

export type TBusVehiclesSchema = z.infer<typeof BUS_VEHICLES_SCHEMA>;
export type TBusVehiclesList =
	TBusVehiclesSchema[typeof ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST];
export type TBusVehicleRow = TBusVehiclesList[number];
