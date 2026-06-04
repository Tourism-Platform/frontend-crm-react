import { z } from "zod";

import { type TTourEventFlightEditPageKeys, i18nKey } from "@/shared/config";
import { GEO_FORM_VALUE_SCHEMA } from "@/shared/schema/geo-form.schema";

import { ENUM_FLIGHT_TRANSPORT_TYPE, ENUM_FORM_TRAIN } from "../../types";

const msg = i18nKey<TTourEventFlightEditPageKeys>();

export const TRAIN_SEGMENT_SCHEMA = z
	.object({
		[ENUM_FORM_TRAIN.CARRIER]: z
			.string()
			.max(10, {
				message: msg(
					"general.flights.form.train.fields.carrier.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_TRAIN.TRAIN_NUMBER]: z
			.string()
			.max(10, {
				message: msg(
					"general.flights.form.train.fields.train_number.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_TRAIN.DEPARTURE_STATION]:
			GEO_FORM_VALUE_SCHEMA.nullable().optional(),

		[ENUM_FORM_TRAIN.ARRIVAL_STATION]:
			GEO_FORM_VALUE_SCHEMA.nullable().optional(),

		[ENUM_FORM_TRAIN.DEPARTURE_DATE]: z.string().optional().nullable(),

		[ENUM_FORM_TRAIN.ARRIVAL_DATE]: z.string().optional().nullable(),

		[ENUM_FORM_TRAIN.DEPARTURE_TIME]: z.string().optional().nullable(),

		[ENUM_FORM_TRAIN.ARRIVAL_TIME]: z.string().optional().nullable(),

		[ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE]: z
			.string()
			.max(100, {
				message: msg(
					"general.flights.form.train.fields.departure_timezone.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE]: z
			.string()
			.max(100, {
				message: msg(
					"general.flights.form.train.fields.arrival_timezone.errors.max"
				)
			})
			.optional()
			.nullable(),

		[ENUM_FORM_TRAIN.TRANSPORT_TYPE]: z.literal(
			ENUM_FLIGHT_TRANSPORT_TYPE.TRAIN
		)
	})
	.superRefine((data, ctx) => {
		if (
			data[ENUM_FORM_TRAIN.DEPARTURE_TIME] &&
			!data[ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE]
		) {
			ctx.addIssue({
				code: "custom",
				path: [ENUM_FORM_TRAIN.DEPARTURE_TIMEZONE],
				message: msg(
					"general.flights.form.train.fields.departure_timezone.errors.required"
				)
			});
		}

		if (
			data[ENUM_FORM_TRAIN.ARRIVAL_TIME] &&
			!data[ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE]
		) {
			ctx.addIssue({
				code: "custom",
				path: [ENUM_FORM_TRAIN.ARRIVAL_TIMEZONE],
				message: msg(
					"general.flights.form.train.fields.arrival_timezone.errors.required"
				)
			});
		}
	});
