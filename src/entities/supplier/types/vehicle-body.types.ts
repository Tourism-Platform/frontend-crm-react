export const ENUM_VEHICLE_BODY_TYPE = {
	SEDAN: "sedan",
	MINIVAN: "minivan",
	MINIBUS: "minibus",
	MINIBUS_PLUS: "minibus_plus",
	BUS: "bus",
	SUV: "suv",
	COACH: "coach"
} as const;

export type ENUM_VEHICLE_BODY_TYPE_TYPE =
	(typeof ENUM_VEHICLE_BODY_TYPE)[keyof typeof ENUM_VEHICLE_BODY_TYPE];
