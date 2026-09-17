import { z } from "zod";

import { type TBusProductEditPageKeys, i18nKey } from "@/shared/config";

import { ENUM_VEHICLE_BODY_TYPE } from "../../types";
import { ENUM_FORM_BUS_VEHICLES } from "../../types/bus/vehicles-form.types";

const msg = i18nKey<TBusProductEditPageKeys>();

export const BUS_VEHICLES_SCHEMA = z.object({
	[ENUM_FORM_BUS_VEHICLES.VEHICLES_LIST]: z.array(
		z.object({
			[ENUM_FORM_BUS_VEHICLES.VARIANT_ID]: z.string(),
			[ENUM_FORM_BUS_VEHICLES.NAME]: z.string(),
			[ENUM_FORM_BUS_VEHICLES.BODY_TYPE]: z.enum(ENUM_VEHICLE_BODY_TYPE, {
				message: msg(
					"form.vehicles.details.form.fields.body_type.errors.required"
				)
			}),
			[ENUM_FORM_BUS_VEHICLES.PAX]: z
				.number({
					message: msg(
						"form.vehicles.details.form.fields.pax.errors.required"
					)
				})
				.min(1, {
					message: msg(
						"form.vehicles.details.form.fields.pax.errors.required"
					)
				})
				.max(99, {
					message: msg(
						"form.vehicles.details.form.fields.pax.errors.max"
					)
				})
				.nullable(),
			[ENUM_FORM_BUS_VEHICLES.DESCRIPTION]: z.string().optional()
		})
	)
});
