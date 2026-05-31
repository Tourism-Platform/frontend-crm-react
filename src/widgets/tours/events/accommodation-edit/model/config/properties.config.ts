import { ENUM_FORM_ACCOMMODATION } from "@/entities/tour";

import { type TForm } from "../types";

export const PROPERTIES_LIST: TForm[] = [
	{
		label: "form.general.properties.form.fields.property.label",
		placeholder: "form.general.properties.form.fields.property.placeholder",
		key: ENUM_FORM_ACCOMMODATION.PROPERTY,
		fieldType: "input"
	}
];
