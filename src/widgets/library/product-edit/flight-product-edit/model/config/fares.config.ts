import { ENUM_FORM_FLIGHT_FARES } from "@/entities/supplier";

import type { TForm } from "../types";

export const FARES_DATA_LIST = (): TForm[] => [
	{
		label: "form.fares.details.form.fields.name.label",
		placeholder: "form.fares.details.form.fields.name.placeholder",
		key: ENUM_FORM_FLIGHT_FARES.NAME,
		fieldType: "input",
		className: "col-span-2"
	}
];
