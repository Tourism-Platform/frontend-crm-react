import { z } from "zod";

import {
	type TTourEventTransportationEditPageKeys,
	i18nKey
} from "@/shared/config";

import { ENUM_FORM_CARS } from "../../types";

const msg = i18nKey<TTourEventTransportationEditPageKeys>();

export const CARS_SCHEMA = z.object({
	[ENUM_FORM_CARS.CARS_LIST]: z.array(
		z.object({
			[ENUM_FORM_CARS.CAR_NAME]: z
				.string({
					message: msg(
						"form.cars.details.form.fields.car_name.errors.required"
					)
				})
				.min(1, {
					message: msg(
						"form.cars.details.form.fields.car_name.errors.required"
					)
				})
				.max(100, {
					message: msg(
						"form.cars.details.form.fields.car_name.errors.max"
					)
				}),
			[ENUM_FORM_CARS.PAX]: z
				.string({
					message: msg(
						"form.cars.details.form.fields.pax.errors.required"
					)
				})
				.min(1, {
					message: msg(
						"form.cars.details.form.fields.pax.errors.required"
					)
				})
				.max(10, {
					message: msg("form.cars.details.form.fields.pax.errors.max")
				}),
			[ENUM_FORM_CARS.DESCRIPTION]: z
				.string({
					message: msg(
						"form.cars.description.description.errors.required"
					)
				})
				.min(1, {
					message: msg(
						"form.cars.description.description.errors.required"
					)
				})
				.max(1000, {
					message: msg("form.cars.description.description.errors.max")
				})
		})
	)
});
