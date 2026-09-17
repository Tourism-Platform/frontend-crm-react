import { z } from "zod";

import { type TTransferProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_VEHICLE_BODY_TYPE } from "../../types";
import { ENUM_FORM_TRANSFER_CARS } from "../../types/transfer/cars-form.types";

const msg = i18nKey<TTransferProductEditPageKeys>();

export const TRANSFER_CARS_SCHEMA = z.object({
	[ENUM_FORM_TRANSFER_CARS.CARS_LIST]: z.array(
		z.object({
			[ENUM_FORM_TRANSFER_CARS.VARIANT_ID]: z.string(),
			[ENUM_FORM_TRANSFER_CARS.NAME]: z.string(),
			[ENUM_FORM_TRANSFER_CARS.CAR_NAME]: z.enum(ENUM_VEHICLE_BODY_TYPE, {
				message: msg(
					"form.cars.details.form.fields.car_name.errors.required"
				)
			}),
			[ENUM_FORM_TRANSFER_CARS.PAX]: z
				.number({
					message: msg(
						"form.cars.details.form.fields.pax.errors.required"
					)
				})
				.min(1, {
					message: msg(
						"form.cars.details.form.fields.pax.errors.required"
					)
				})
				.max(99, {
					message: msg("form.cars.details.form.fields.pax.errors.max")
				})
				.nullable(),
			[ENUM_FORM_TRANSFER_CARS.DESCRIPTION]: z.string().optional()
		})
	)
});
