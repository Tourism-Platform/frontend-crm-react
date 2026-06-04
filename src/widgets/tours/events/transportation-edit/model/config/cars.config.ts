import { useValueToTranslateLabel } from "@/shared/utils";

import { ENUM_FORM_CARS, VEHICLE_BODY_TYPE_LABELS } from "@/entities/tour";

import type { TForm } from "../types";

export const CARS_DATA_LIST = (): TForm[] => [
	{
		label: "form.cars.details.form.fields.car_name.label",
		placeholder: "form.cars.details.form.fields.car_name.placeholder",
		key: ENUM_FORM_CARS.CAR_NAME,
		fieldType: "select",
		options: useValueToTranslateLabel(VEHICLE_BODY_TYPE_LABELS)
	},
	{
		label: "form.cars.details.form.fields.pax.label",
		placeholder: "form.cars.details.form.fields.pax.placeholder",
		key: ENUM_FORM_CARS.PAX,
		fieldType: "input",
		type: "number",
		min: 1,
		max: 99,
		step: "1"
	},
	{
		label: "form.cars.description.description.label",
		placeholder: "form.cars.description.description.placeholder",
		key: ENUM_FORM_CARS.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-2"
	}
];
