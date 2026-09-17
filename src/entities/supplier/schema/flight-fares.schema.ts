import { z } from "zod";

import { type TFlightProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_FORM_FLIGHT_FARES } from "../types/flight/fares-form.types";

const msg = i18nKey<TFlightProductEditPageKeys>();

export const FLIGHT_FARES_SCHEMA = z.object({
	[ENUM_FORM_FLIGHT_FARES.FARES_LIST]: z.array(
		z.object({
			[ENUM_FORM_FLIGHT_FARES.VARIANT_ID]: z.string(),
			[ENUM_FORM_FLIGHT_FARES.NAME]: z
				.string()
				.trim()
				.min(
					1,
					msg("form.fares.details.form.fields.name.errors.required")
				)
		})
	)
});
