import { z } from "zod";

import { ENUM_FORM_CARS } from "../types/cars.types";

export const CARS_SCHEMA = z.object({
	[ENUM_FORM_CARS.CARS_LIST]: z.array(
		z.object({
			[ENUM_FORM_CARS.CAR_NAME]: z.string().min(1, {
				message: "cars.details.form.fields.car_name.errors.required"
			}),
			[ENUM_FORM_CARS.PAX]: z.string().min(1, {
				message: "cars.details.form.fields.pax.errors.required"
			})
		})
	),
	[ENUM_FORM_CARS.DESCRIPTION]: z
		.string()
		.min(2, { message: "cars.description.description.errors.min" })
		.max(50, { message: "cars.description.description.errors.max" })
});

export type TCarsSchema = z.infer<typeof CARS_SCHEMA>;
