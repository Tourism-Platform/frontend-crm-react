export const ENUM_TRANSFER_TYPE = {
	CITY_TOUR: "city_tour",
	CITY_TRANSFER: "city_transfer",
	INTERCITY_TRANSFER: "intercity_transfer",
	AIRPORT_TRANSFER: "airport_transfer",
	STATION_TRANSFER: "station_transfer",
	CUSTOM: "custom"
} as const;

export type ENUM_TRANSFER_TYPE_TYPE =
	(typeof ENUM_TRANSFER_TYPE)[keyof typeof ENUM_TRANSFER_TYPE];
