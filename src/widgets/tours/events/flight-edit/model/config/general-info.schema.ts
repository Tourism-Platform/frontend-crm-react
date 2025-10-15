// import { z } from "zod";
// import { ENUM_FORM_FLIGHT } from "../types";
// export const GENERAL_INFO_SCHEMA = z.object({
// 	[ENUM_FORM_FLIGHT.AIRLINE_CODE]: z
// 		.string()
// 		.min(2, { message: "general.flights.form.fields.airline_code.errors.min" })
// 		.max(10, { message: "general.flights.form.fields.airline_code.errors.max" }),
// 	[ENUM_FORM_FLIGHT.FLIGHT_NUMBER]: z
// 		.string()
// 		.min(1, { message: "general.flights.form.fields.flight_number.errors.min" })
// 		.max(10, { message: "general.flights.form.fields.flight_number.errors.max" }),
// 	[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE]: z
// 		.string()
// 		.length(3, { message: "general.flights.form.fields.departure_airport_code.errors.length" })
// 		.toUpperCase(),
// 	[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE]: z
// 		.string()
// 		.length(3, { message: "general.flights.form.fields.arrival_airport_code.errors.length" })
// 		.toUpperCase(),
// 	[ENUM_FORM_FLIGHT.DEPARTURE_DATE]: z
// 		.string()
// 		.regex(/^\d{4}-\d{2}-\d{2}$/, { message: "general.flights.form.fields.departure_date.errors.pattern" }),
// 	[ENUM_FORM_FLIGHT.ARRIVAL_DATE]: z
// 		.string()
// 		.regex(/^\d{4}-\d{2}-\d{2}$/, { message: "general.flights.form.fields.arrival_date.errors.pattern" }),
// 	[ENUM_FORM_FLIGHT.DEPARTURE_TIME]: z
// 		.string()
// 		.regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "general.flights.form.fields.departure_time.errors.pattern" }),
// 	[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]: z
// 		.string()
// 		.min(2, { message: "general.flights.form.fields.departure_timezone.errors.min" })
// 		.max(50, { message: "general.flights.form.fields.departure_timezone.errors.max" }),
// 	[ENUM_FORM_FLIGHT.ARRIVAL_TIME]: z
// 		.string()
// 		.regex(/^([01]\d|2[0-3]):[0-5]\d$/, { message: "general.flights.form.fields.arrival_time.errors.pattern" }),
// 	[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]: z
// 		.string()
// 		.min(2, { message: "general.flights.form.fields.arrival_timezone.errors.min" })
// 		.max(50, { message: "general.flights.form.fields.arrival_timezone.errors.max" }),
// 	[ENUM_FORM_FLIGHT.DEPARTURE_TERMINAL]: z
// 		.string()
// 		.max(10, { message: "general.flights.form.fields.departure_terminal.errors.max" })
// 		.optional(),
// 	[ENUM_FORM_FLIGHT.DEPARTURE_GATE]: z
// 		.string()
// 		.max(10, { message: "general.flights.form.fields.departure_gate.errors.max" })
// 		.optional(),
// 	[ENUM_FORM_FLIGHT.ARRIVAL_TERMINAL]: z
// 		.string()
// 		.max(10, { message: "general.flights.form.fields.arrival_terminal.errors.max" })
// 		.optional(),
// 	[ENUM_FORM_FLIGHT.ARRIVAL_GATE]: z
// 		.string()
// 		.max(10, { message: "general.flights.form.fields.arrival_gate.errors.max" })
// 		.optional(),
// 	[ENUM_FORM_FLIGHT.DESCRIPTION]: z
// 		.string()
// 		.min(2, { message: "general.description.errors.min" })
// 		.max(50, { message: "general.description.errors.max" })
// 		.optional(),
// });
import { z } from "zod";

import { ENUM_FORM_FLIGHT } from "../types";

// схема одного сегмента маршрута (всё кроме description)
export const FLIGHT_SEGMENT_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT.AIRLINE_CODE]: z
		.string()
		.min(2, {
			message: "general.flights.form.fields.airline_code.errors.min"
		})
		.max(10, {
			message: "general.flights.form.fields.airline_code.errors.max"
		}),

	[ENUM_FORM_FLIGHT.FLIGHT_NUMBER]: z
		.string()
		.min(1, {
			message: "general.flights.form.fields.flight_number.errors.min"
		})
		.max(10, {
			message: "general.flights.form.fields.flight_number.errors.max"
		}),

	[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE]: z
		.string()
		.length(3, {
			message:
				"general.flights.form.fields.departure_airport_code.errors.length"
		})
		.toUpperCase(),

	[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE]: z
		.string()
		.length(3, {
			message:
				"general.flights.form.fields.arrival_airport_code.errors.length"
		})
		.toUpperCase(),

	[ENUM_FORM_FLIGHT.DEPARTURE_DATE]: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: "general.flights.form.fields.departure_date.errors.pattern"
	}),

	[ENUM_FORM_FLIGHT.ARRIVAL_DATE]: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
		message: "general.flights.form.fields.arrival_date.errors.pattern"
	}),

	[ENUM_FORM_FLIGHT.DEPARTURE_TIME]: z
		.string()
		.regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
			message: "general.flights.form.fields.departure_time.errors.pattern"
		}),

	[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]: z
		.string()
		.min(2, {
			message: "general.flights.form.fields.departure_timezone.errors.min"
		})
		.max(50, {
			message: "general.flights.form.fields.departure_timezone.errors.max"
		}),

	[ENUM_FORM_FLIGHT.ARRIVAL_TIME]: z
		.string()
		.regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
			message: "general.flights.form.fields.arrival_time.errors.pattern"
		}),

	[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]: z
		.string()
		.min(2, {
			message: "general.flights.form.fields.arrival_timezone.errors.min"
		})
		.max(50, {
			message: "general.flights.form.fields.arrival_timezone.errors.max"
		}),

	[ENUM_FORM_FLIGHT.DEPARTURE_TERMINAL]: z
		.string()
		.max(10, {
			message: "general.flights.form.fields.departure_terminal.errors.max"
		})
		.optional(),

	[ENUM_FORM_FLIGHT.DEPARTURE_GATE]: z
		.string()
		.max(10, {
			message: "general.flights.form.fields.departure_gate.errors.max"
		})
		.optional(),

	[ENUM_FORM_FLIGHT.ARRIVAL_TERMINAL]: z
		.string()
		.max(10, {
			message: "general.flights.form.fields.arrival_terminal.errors.max"
		})
		.optional(),

	[ENUM_FORM_FLIGHT.ARRIVAL_GATE]: z
		.string()
		.max(10, {
			message: "general.flights.form.fields.arrival_gate.errors.max"
		})
		.optional()
});

// главная схема маршрута
export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT.DESCRIPTION]: z
		.string()
		.min(2, { message: "general.description.description.errors.min" })
		.max(50, { message: "general.description.description.errors.max" })
		.optional(),

	flights: z
		.array(FLIGHT_SEGMENT_SCHEMA)
		.min(1, { message: "Должен быть хотя бы один сегмент маршрута" })
});
