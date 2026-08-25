import { HousingRoomTypes } from "@/shared/api/generated/Api";
import { createEnumMapper } from "@/shared/utils";

import {
	ENUM_HOTEL_ROOM_TYPE,
	type ENUM_HOTEL_ROOM_TYPE_TYPE
} from "../../types";

const MAP_HOTEL_ROOM_TYPE: Record<ENUM_HOTEL_ROOM_TYPE_TYPE, HousingRoomTypes> =
	{
		[ENUM_HOTEL_ROOM_TYPE.SINGLE]: HousingRoomTypes.Single,
		[ENUM_HOTEL_ROOM_TYPE.DOUBLE]: HousingRoomTypes.Double,
		[ENUM_HOTEL_ROOM_TYPE.TWIN]: HousingRoomTypes.Twin,
		[ENUM_HOTEL_ROOM_TYPE.TRIPLE]: HousingRoomTypes.Triple,
		[ENUM_HOTEL_ROOM_TYPE.QUADRUPLE]: HousingRoomTypes.Quadruple,
		[ENUM_HOTEL_ROOM_TYPE.SUITE]: HousingRoomTypes.Suite,
		[ENUM_HOTEL_ROOM_TYPE.FAMILY]: HousingRoomTypes.Family
	};

export const hotelRoomTypeConverter = createEnumMapper<
	ENUM_HOTEL_ROOM_TYPE_TYPE,
	HousingRoomTypes
>(MAP_HOTEL_ROOM_TYPE);
