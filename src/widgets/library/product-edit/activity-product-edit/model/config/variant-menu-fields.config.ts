import { ENUM_FORM_ACTIVITY_MENU as ENUM_FORM } from "@/entities/supplier";

import type { TForm } from "../types";

export const ACTIVITY_VARIANT_MENU_FIELDS_LIST = (): TForm[] => [
	{
		key: ENUM_FORM.NAME,
		fieldType: "input",
		label: "form.variants.menu.fields.name.label",
		placeholder: "form.variants.menu.fields.name.placeholder"
	},
	{
		key: ENUM_FORM.DESCRIPTION,
		fieldType: "input",
		label: "form.variants.menu.fields.description.label",
		placeholder: "form.variants.menu.fields.description.placeholder"
	}
];
