import { z } from "zod";

import { type TTourEventFlightEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FLIGHT_TRANSPORT_TYPE, ENUM_FORM_FLIGHT } from "../../types";

import { BUS_SEGMENT_SCHEMA } from "./bus.schema";
import { FLY_SEGMENT_SCHEMA } from "./fly.schema";
import { TRAIN_SEGMENT_SCHEMA } from "./train.schema";

const msg = i18nKey<TTourEventFlightEditPageKeys>();

export const GENERAL_INFO_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT.TRANSPORT_TYPE]: z.enum(ENUM_FLIGHT_TRANSPORT_TYPE),
	[ENUM_FORM_FLIGHT.DESCRIPTION]: z
		.string()
		// .min(1, {
		// 	message: msg("general.description.description.errors.required")
		// })
		.max(1000, {
			message: msg("general.description.description.errors.max")
		})
		.optional(),

	[ENUM_FORM_FLIGHT.ROUTE]: z
		.array(
			z.discriminatedUnion(ENUM_FORM_FLIGHT.TRANSPORT_TYPE, [
				FLY_SEGMENT_SCHEMA,
				TRAIN_SEGMENT_SCHEMA,
				BUS_SEGMENT_SCHEMA
			])
		)
		.min(1, {
			message: msg("general.flights.form.errors.min_segments")
		})
});
