import { VehicleBodyType } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_VEHICLE_BODY_TYPE,
	type ENUM_VEHICLE_BODY_TYPE_TYPE
} from "../../types";

const MAP_VEHICLE_BODY_TYPE: Record<
	ENUM_VEHICLE_BODY_TYPE_TYPE,
	VehicleBodyType
> = {
	[ENUM_VEHICLE_BODY_TYPE.SEDAN]: VehicleBodyType.Sedan,
	[ENUM_VEHICLE_BODY_TYPE.SUV]: VehicleBodyType.Suv,
	[ENUM_VEHICLE_BODY_TYPE.MINIVAN]: VehicleBodyType.Minivan,
	[ENUM_VEHICLE_BODY_TYPE.MINIBUS]: VehicleBodyType.Minibus,
	[ENUM_VEHICLE_BODY_TYPE.MINIBUS_PLUS]: VehicleBodyType.MinibusPlus,
	[ENUM_VEHICLE_BODY_TYPE.BUS]: VehicleBodyType.Bus,
	[ENUM_VEHICLE_BODY_TYPE.COACH]: VehicleBodyType.Coach
};

export const vehicleBodyTypeConverter = createEnumMapper<
	ENUM_VEHICLE_BODY_TYPE_TYPE,
	VehicleBodyType
>(MAP_VEHICLE_BODY_TYPE);
