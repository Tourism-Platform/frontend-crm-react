export const ENUM_PICKUP_TYPE = {
	AIRPORT: "airport",
	HOTEL: "hotel"
} as const;

export type ENUM_PICKUP_TYPE_TYPE =
	(typeof ENUM_PICKUP_TYPE)[keyof typeof ENUM_PICKUP_TYPE];
