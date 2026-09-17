import { ENUM_FORM_BUS_PRODUCT as ENUM_FORM } from "@/entities/supplier";

import type { TForm } from "../types";

export const BUS_PRODUCT_NAME_FIELD: TForm[] = [
	{
		key: ENUM_FORM.NAME,
		fieldType: "input",
		label: "form.general.fields.name.label",
		placeholder: "form.general.fields.name.placeholder"
	}
];
