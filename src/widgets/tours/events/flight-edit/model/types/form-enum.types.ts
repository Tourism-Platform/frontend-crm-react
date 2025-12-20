export const ENUM_FORM_FLIGHT = {
	AIRLINE_CODE: "airline_code",
	FLIGHT_NUMBER: "flight_number",
	DEPARTURE_AIRPORT_CODE: "departure_airport_code",
	ARRIVAL_AIRPORT_CODE: "arrival_airport_code",
	DEPARTURE_DATE: "departure_date",
	ARRIVAL_DATE: "arrival_date",
	DEPARTURE_TIME: "departure_time",
	DEPARTURE_TIMEZONE: "departure_timezone",
	ARRIVAL_TIME: "arrival_time",
	ARRIVAL_TIMEZONE: "arrival_timezone",
	DEPARTURE_TERMINAL: "departure_terminal",
	DEPARTURE_GATE: "departure_gate",
	ARRIVAL_TERMINAL: "arrival_terminal",
	ARRIVAL_GATE: "arrival_gate",
	DESCRIPTION: "description",
	TRANSPORT_TYPE: "transport_type"
} as const;

export type ENUM_FORM_FLIGHT_TYPE =
	(typeof ENUM_FORM_FLIGHT)[keyof typeof ENUM_FORM_FLIGHT];
