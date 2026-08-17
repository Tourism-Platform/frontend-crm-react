import { HousingRoomTypes } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_HOUSING_ROOM_TYPE,
	type ENUM_HOUSING_ROOM_TYPE_TYPE
} from "../../types";

const MAP_HOUSING_ROOM_TYPE: Record<
	ENUM_HOUSING_ROOM_TYPE_TYPE,
	HousingRoomTypes
> = {
	[ENUM_HOUSING_ROOM_TYPE.SINGLE]: HousingRoomTypes.Single,
	[ENUM_HOUSING_ROOM_TYPE.DOUBLE]: HousingRoomTypes.Double,
	[ENUM_HOUSING_ROOM_TYPE.TWIN]: HousingRoomTypes.Twin,
	[ENUM_HOUSING_ROOM_TYPE.TRIPLE]: HousingRoomTypes.Triple,
	[ENUM_HOUSING_ROOM_TYPE.QUADRUPLE]: HousingRoomTypes.Quadruple,
	[ENUM_HOUSING_ROOM_TYPE.SUITE]: HousingRoomTypes.Suite,
	[ENUM_HOUSING_ROOM_TYPE.FAMILY]: HousingRoomTypes.Family
};

export const housingRoomTypeConverter = createEnumMapper<
	ENUM_HOUSING_ROOM_TYPE_TYPE,
	HousingRoomTypes
>(MAP_HOUSING_ROOM_TYPE);
