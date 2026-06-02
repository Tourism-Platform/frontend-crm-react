import { z } from "zod";

import { type TTourEventFlightEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FLIGHT_TRANSPORT_TYPE, ENUM_FORM_FLIGHT } from "../../types";

const msg = i18nKey<TTourEventFlightEditPageKeys>();

export const FLY_SEGMENT_SCHEMA = z
	.object({
		[ENUM_FORM_FLIGHT.AIRLINE_CODE]: z
			.string()
			.regex(/^[A-Z0-9]{2,3}$/, {
				message: msg(
					"general.flights.form.fly.fields.airline_code.errors.pattern"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.FLIGHT_NUMBER]: z
			.string()
			// .min(1, {
			// 	message: msg(
			// 		"general.flights.form.fly.fields.flight_number.errors.min"
			// 	)
			// })
			.max(10, {
				message: msg(
					"general.flights.form.fly.fields.flight_number.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.DEPARTURE_AIRPORT_CODE]: z
			.string()
			.regex(/^[A-Z]{3}$/, {
				message: msg(
					"general.flights.form.fly.fields.departure_airport_code.errors.pattern"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.ARRIVAL_AIRPORT_CODE]: z
			.string()
			.regex(/^[A-Z]{3}$/, {
				message: msg(
					"general.flights.form.fly.fields.arrival_airport_code.errors.pattern"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.DEPARTURE_DATE]: z.string().optional().nullable(),

		[ENUM_FORM_FLIGHT.ARRIVAL_DATE]: z.string().optional().nullable(),

		[ENUM_FORM_FLIGHT.DEPARTURE_TIME]: z.string().optional().nullable(),

		[ENUM_FORM_FLIGHT.ARRIVAL_TIME]: z.string().optional().nullable(),

		[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]: z
			.string()
			.max(100, {
				message: msg(
					"general.flights.form.fly.fields.departure_timezone.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]: z
			.string()
			.max(100, {
				message: msg(
					"general.flights.form.fly.fields.arrival_timezone.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.DEPARTURE_TERMINAL]: z
			.string()
			.max(10, {
				message: msg(
					"general.flights.form.fly.fields.departure_terminal.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.DEPARTURE_GATE]: z
			.string()
			.max(10, {
				message: msg(
					"general.flights.form.fly.fields.departure_gate.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.ARRIVAL_TERMINAL]: z
			.string()
			.max(10, {
				message: msg(
					"general.flights.form.fly.fields.arrival_terminal.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.ARRIVAL_GATE]: z
			.string()
			.max(10, {
				message: msg(
					"general.flights.form.fly.fields.arrival_gate.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_FLIGHT.TRANSPORT_TYPE]: z.literal(
			ENUM_FLIGHT_TRANSPORT_TYPE.FLY
		)
	})
	.superRefine((data, ctx) => {
		if (
			data[ENUM_FORM_FLIGHT.DEPARTURE_TIME] &&
			!data[ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE]
		) {
			ctx.addIssue({
				code: "custom",
				path: [ENUM_FORM_FLIGHT.DEPARTURE_TIMEZONE],
				message: msg(
					"general.flights.form.fly.fields.departure_timezone.errors.required"
				)
			});
		}

		if (
			data[ENUM_FORM_FLIGHT.ARRIVAL_TIME] &&
			!data[ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE]
		) {
			ctx.addIssue({
				code: "custom",
				path: [ENUM_FORM_FLIGHT.ARRIVAL_TIMEZONE],
				message: msg(
					"general.flights.form.fly.fields.arrival_timezone.errors.required"
				)
			});
		}
	});
