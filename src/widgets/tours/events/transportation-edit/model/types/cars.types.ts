export const ENUM_FORM_CARS = {
	CARS_LIST: "cars",
	CAR_NAME: "car_name",
	PAX: "pax",
	DESCRIPTION: "description"
} as const;

export type ENUM_FORM_CARS_TYPE =
	(typeof ENUM_FORM_CARS)[keyof typeof ENUM_FORM_CARS];
