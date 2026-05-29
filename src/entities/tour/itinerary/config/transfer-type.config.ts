import type { TOptionsKeys } from "@/shared/config";

import { ENUM_TRANSFER_TYPE, type ENUM_TRANSFER_TYPE_TYPE } from "../types";

export const TRANSFER_TYPE_LABELS: Partial<
	Record<ENUM_TRANSFER_TYPE_TYPE, TOptionsKeys>
> = {
	[ENUM_TRANSFER_TYPE.CITY_TOUR]: "tour.transferTypes.city_tour",
	[ENUM_TRANSFER_TYPE.CITY_TRANSFER]: "tour.transferTypes.city_transfer",
	[ENUM_TRANSFER_TYPE.INTERCITY_TRANSFER]:
		"tour.transferTypes.intercity_transfer",
	[ENUM_TRANSFER_TYPE.AIRPORT_TRANSFER]:
		"tour.transferTypes.airport_transfer",
	[ENUM_TRANSFER_TYPE.STATION_TRANSFER]:
		"tour.transferTypes.station_transfer",
	[ENUM_TRANSFER_TYPE.CUSTOM]: "tour.transferTypes.custom"
};
