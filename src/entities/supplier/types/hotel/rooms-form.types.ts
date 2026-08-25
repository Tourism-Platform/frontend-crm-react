export const ENUM_FORM_HOTEL_ROOMS = {
	ROOMS_LIST: "rooms",
	ID: "id",
	TYP: "typ",
	PAX: "pax",
	EXPENSES: "expenses",
	RATES: "rates"
} as const;

export type ENUM_FORM_HOTEL_ROOMS_TYPE =
	(typeof ENUM_FORM_HOTEL_ROOMS)[keyof typeof ENUM_FORM_HOTEL_ROOMS];
