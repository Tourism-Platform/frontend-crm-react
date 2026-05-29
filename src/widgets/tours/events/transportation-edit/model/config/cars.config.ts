import { CAR_NAME_OPTIONS, PAX_OPTIONS } from "@/shared/config";

import { ENUM_FORM_CARS } from "@/entities/tour";

import type { TForm } from "../types";

export const CARS_DATA_LIST: TForm[] = [
	{
		label: "form.cars.details.form.fields.car_name.label",
		placeholder: "form.cars.details.form.fields.car_name.placeholder",
		key: ENUM_FORM_CARS.CAR_NAME,
		fieldType: "select",
		options: CAR_NAME_OPTIONS
	},
	{
		label: "form.cars.details.form.fields.pax.label",
		placeholder: "form.cars.details.form.fields.pax.placeholder",
		key: ENUM_FORM_CARS.PAX,
		fieldType: "select",
		options: PAX_OPTIONS
	},
	{
		label: "form.cars.description.description.label",
		placeholder: "form.cars.description.description.placeholder",
		key: ENUM_FORM_CARS.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-2"
	}
];
