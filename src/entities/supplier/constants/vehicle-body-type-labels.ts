import type { TOptionsKeys } from "@/shared/config";

import {
	ENUM_VEHICLE_BODY_TYPE,
	type ENUM_VEHICLE_BODY_TYPE_TYPE
} from "../types/vehicle-body.types";

export const VEHICLE_BODY_TYPE_LABELS: Record<
	ENUM_VEHICLE_BODY_TYPE_TYPE,
	TOptionsKeys
> = {
	[ENUM_VEHICLE_BODY_TYPE.SEDAN]: "vehicle_body_type.sedan",
	[ENUM_VEHICLE_BODY_TYPE.MINIVAN]: "vehicle_body_type.minivan",
	[ENUM_VEHICLE_BODY_TYPE.MINIBUS]: "vehicle_body_type.minibus",
	[ENUM_VEHICLE_BODY_TYPE.MINIBUS_PLUS]: "vehicle_body_type.minibus_plus",
	[ENUM_VEHICLE_BODY_TYPE.BUS]: "vehicle_body_type.bus",
	[ENUM_VEHICLE_BODY_TYPE.SUV]: "vehicle_body_type.suv",
	[ENUM_VEHICLE_BODY_TYPE.COACH]: "vehicle_body_type.coach"
};
