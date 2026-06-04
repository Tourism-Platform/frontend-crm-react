import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_VEHICLE_BODY_TYPE,
	type ENUM_VEHICLE_BODY_TYPE_TYPE
} from "../types";

export const VEHICLE_BODY_TYPE_LABELS: Record<
	ENUM_VEHICLE_BODY_TYPE_TYPE,
	TOptionsKeys
> = {
	[ENUM_VEHICLE_BODY_TYPE.SEDAN]: "tour.vehicleBodyTypes.sedan",
	[ENUM_VEHICLE_BODY_TYPE.SUV]: "tour.vehicleBodyTypes.suv",
	[ENUM_VEHICLE_BODY_TYPE.MINIVAN]: "tour.vehicleBodyTypes.minivan",
	[ENUM_VEHICLE_BODY_TYPE.MINIBUS]: "tour.vehicleBodyTypes.minibus",
	[ENUM_VEHICLE_BODY_TYPE.MINIBUS_PLUS]: "tour.vehicleBodyTypes.minibus_plus",
	[ENUM_VEHICLE_BODY_TYPE.BUS]: "tour.vehicleBodyTypes.bus",
	[ENUM_VEHICLE_BODY_TYPE.COACH]: "tour.vehicleBodyTypes.coach"
};
