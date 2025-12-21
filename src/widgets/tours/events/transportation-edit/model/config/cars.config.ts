import { CAR_NAME_OPTIONS, PAX_OPTIONS } from "@/shared/config";

import { ENUM_FORM_CARS, type TForm } from "../types";

export const CARS_DATA_LIST: TForm[] = [
	{
		label: "cars.details.form.fields.car_name.label",
		placeholder: "cars.details.form.fields.car_name.placeholder",
		key: ENUM_FORM_CARS.CAR_NAME,
		fieldType: "select",
		options: CAR_NAME_OPTIONS
	},
	{
		label: "cars.details.form.fields.pax.label",
		placeholder: "cars.details.form.fields.pax.placeholder",
		key: ENUM_FORM_CARS.PAX,
		fieldType: "select",
		options: PAX_OPTIONS
	},
	{
		label: "cars.description.description.label",
		placeholder: "cars.description.description.placeholder",
		key: ENUM_FORM_CARS.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-2"
	}
];
