import { z } from "zod";

import { type TTourEventFlightEditPageKeys, i18nKey } from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

import {
	ENUM_FLIGHT_TRANSPORT_TYPE,
	ENUM_FORM_BUS
} from "../../types/flight/flight-enum.types";

const msg = i18nKey<TTourEventFlightEditPageKeys>();

export const BUS_SEGMENT_SCHEMA = z
	.object({
		[ENUM_FORM_BUS.BUS_COMPANY]: z
			.string()
			.max(10, {
				message: msg(
					"general.flights.form.bus.fields.bus_company.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_BUS.BUS_NUMBER]: z
			.string()
			.max(10, {
				message: msg(
					"general.flights.form.bus.fields.bus_number.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_BUS.DEPARTURE_POINT]:
			GEO_FORM_VALUE_SCHEMA.nullable().optional(),

		[ENUM_FORM_BUS.ARRIVAL_POINT]:
			GEO_FORM_VALUE_SCHEMA.nullable().optional(),

		[ENUM_FORM_BUS.DEPARTURE_DATE]: z.string().optional().nullable(),

		[ENUM_FORM_BUS.ARRIVAL_DATE]: z.string().optional().nullable(),

		[ENUM_FORM_BUS.DEPARTURE_TIME]: z.string().optional().nullable(),

		[ENUM_FORM_BUS.ARRIVAL_TIME]: z.string().optional().nullable(),

		[ENUM_FORM_BUS.DEPARTURE_TIMEZONE]: z
			.string()
			.max(100, {
				message: msg(
					"general.flights.form.bus.fields.departure_timezone.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_BUS.ARRIVAL_TIMEZONE]: z
			.string()
			.max(100, {
				message: msg(
					"general.flights.form.bus.fields.arrival_timezone.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_BUS.TRANSPORT_TYPE]: z.literal(
			ENUM_FLIGHT_TRANSPORT_TYPE.BUS
		)
	})
	.superRefine((data, ctx) => {
		if (
			data[ENUM_FORM_BUS.DEPARTURE_TIME] &&
			!data[ENUM_FORM_BUS.DEPARTURE_TIMEZONE]
		) {
			ctx.addIssue({
				code: "custom",
				path: [ENUM_FORM_BUS.DEPARTURE_TIMEZONE],
				message: msg(
					"general.flights.form.bus.fields.departure_timezone.errors.required"
				)
			});
		}

		if (
			data[ENUM_FORM_BUS.ARRIVAL_TIME] &&
			!data[ENUM_FORM_BUS.ARRIVAL_TIMEZONE]
		) {
			ctx.addIssue({
				code: "custom",
				path: [ENUM_FORM_BUS.ARRIVAL_TIMEZONE],
				message: msg(
					"general.flights.form.bus.fields.arrival_timezone.errors.required"
				)
			});
		}
	});
