import { z } from "zod";

import { type TTourEventFlightEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FLIGHT_TRANSPORT_TYPE } from "../types/flight-subtabs.types";
import { ENUM_FORM_FLIGHT } from "../types/form-enum.types";

const msg = i18nKey<TTourEventFlightEditPageKeys>();

export const BUS_SEGMENT_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT.AIRLINE_CODE]: z
		.string()
		.min(1, {
			message: msg(
				"general.flights.form.bus.fields.airline_code.errors.required"
			)
		})
		.min(2, {
			message: msg(
				"general.flights.form.bus.fields.airline_code.errors.min"
			)
		})
		.max(10, {
			message: msg(
				"general.flights.form.bus.fields.airline_code.errors.max"
			)
		}),

	[ENUM_FORM_FLIGHT.FLIGHT_NUMBER]: z
		.string()
		.min(1, {
			message: msg(
				"general.flights.form.bus.fields.flight_number.errors.required"
			)
		})
		.min(1, {
			message: msg(
				"general.flights.form.bus.fields.flight_number.errors.min"
			)
		})
		.max(10, {
			message: msg(
				"general.flights.form.bus.fields.flight_number.errors.max"
			)
		}),

	[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE]: z
		.string()
		.min(1, {
			message: msg(
				"general.flights.form.bus.fields.departure_airport_code.errors.required"
			)
		})
		.length(3, {
			message: msg(
				"general.flights.form.bus.fields.departure_airport_code.errors.length"
			)
		})
		.toUpperCase(),

	[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE]: z
		.string()
		.min(1, {
			message: msg(
				"general.flights.form.bus.fields.arrival_airport_code.errors.required"
			)
		})
		.length(3, {
			message: msg(
				"general.flights.form.bus.fields.arrival_airport_code.errors.length"
			)
		})
		.toUpperCase(),

	[ENUM_FORM_FLIGHT.DEPARTURE_DATE]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.flights.form.bus.fields.departure_date.errors.required"
			)
		}),

	[ENUM_FORM_FLIGHT.ARRIVAL_DATE]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.flights.form.bus.fields.arrival_date.errors.required"
			)
		}),

	[ENUM_FORM_FLIGHT.DEPARTURE_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.flights.form.bus.fields.departure_time.errors.required"
			)
		}),

	[ENUM_FORM_FLIGHT.ARRIVAL_TIME]: z
		.string()
		.nullable()
		.refine((val) => val !== null, {
			message: msg(
				"general.flights.form.bus.fields.arrival_time.errors.required"
			)
		}),

	[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]: z
		.string()
		.min(1, {
			message: msg(
				"general.flights.form.bus.fields.departure_timezone.errors.required"
			)
		})
		.max(100, {
			message: msg(
				"general.flights.form.bus.fields.departure_timezone.errors.max"
			)
		}),

	[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]: z
		.string()
		.min(1, {
			message: msg(
				"general.flights.form.bus.fields.arrival_timezone.errors.required"
			)
		})
		.max(100, {
			message: msg(
				"general.flights.form.bus.fields.arrival_timezone.errors.max"
			)
		}),

	[ENUM_FORM_FLIGHT.TRANSPORT_TYPE]: z.literal(ENUM_FLIGHT_TRANSPORT_TYPE.BUS)
});
