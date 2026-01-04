import { z } from "zod";

import {
	type TTourEventTransportationEditPageKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_FORM_CARS } from "../types/cars.types";

const msg = i18nKey<TTourEventTransportationEditPageKeys>();

export const CARS_SCHEMA = z.object({
	[ENUM_FORM_CARS.CARS_LIST]: z.array(
		z.object({
			[ENUM_FORM_CARS.CAR_NAME]: z
				.string()
				.min(1, {
					message: msg(
						"cars.details.form.fields.car_name.errors.required"
					)
				})
				.max(100, {
					message: msg("cars.details.form.fields.car_name.errors.max")
				}),
			[ENUM_FORM_CARS.PAX]: z
				.string()
				.min(1, {
					message: msg("cars.details.form.fields.pax.errors.required")
				})
				.max(10, {
					message: msg("cars.details.form.fields.pax.errors.max")
				}),
			[ENUM_FORM_CARS.DESCRIPTION]: z
				.string()
				.min(1, {
					message: msg("cars.description.description.errors.required")
				})
				.max(1000, {
					message: msg("cars.description.description.errors.max")
				})
		})
	)
});

export type TCarsSchema = z.infer<typeof CARS_SCHEMA>;
