import { TransferTypes } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_TRANSFER_TYPE, type ENUM_TRANSFER_TYPE_TYPE } from "../../types";

const MAP_TRANSFER_TYPE: Partial<
	Record<ENUM_TRANSFER_TYPE_TYPE, TransferTypes>
> = {
	[ENUM_TRANSFER_TYPE.CITY_TOUR]: TransferTypes.CityTour,
	[ENUM_TRANSFER_TYPE.CITY_TRANSFER]: TransferTypes.CityTransfer,
	[ENUM_TRANSFER_TYPE.INTERCITY_TRANSFER]: TransferTypes.IntercityTransfer,
	[ENUM_TRANSFER_TYPE.AIRPORT_TRANSFER]: TransferTypes.AirportTransfer,
	[ENUM_TRANSFER_TYPE.STATION_TRANSFER]: TransferTypes.StationTransfer,
	[ENUM_TRANSFER_TYPE.CUSTOM]: TransferTypes.Custom
};

export const transferTypeMapper = createEnumMapper<
	ENUM_TRANSFER_TYPE_TYPE,
	TransferTypes
>(MAP_TRANSFER_TYPE);
