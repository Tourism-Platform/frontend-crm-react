import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_FORM_BUS_VEHICLES,
	VEHICLE_BODY_TYPE_LABELS
} from "@/entities/supplier";

import type { TForm } from "../types";

export const VEHICLES_DATA_LIST = (): TForm[] => [
	{
		label: "form.vehicles.details.form.fields.body_type.label",
		placeholder: "form.vehicles.details.form.fields.body_type.placeholder",
		key: ENUM_FORM_BUS_VEHICLES.BODY_TYPE,
		fieldType: "select",
		options: useValueToTranslateLabel(VEHICLE_BODY_TYPE_LABELS)
	},
	{
		label: "form.vehicles.details.form.fields.pax.label",
		placeholder: "form.vehicles.details.form.fields.pax.placeholder",
		key: ENUM_FORM_BUS_VEHICLES.PAX,
		fieldType: "input",
		type: "number",
		min: 1,
		max: 99,
		step: "1"
	},
	{
		label: "form.vehicles.description.description.label",
		placeholder: "form.vehicles.description.description.placeholder",
		key: ENUM_FORM_BUS_VEHICLES.DESCRIPTION,
		fieldType: "editor",
		className: "col-span-2"
	}
];
