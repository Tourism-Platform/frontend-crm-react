import { ENUM_FORM_CHANGE_BUSINESS } from "@/entities/user";

import { type TForm } from "../types";

export const ADDRESS_BUSINESS_DATA_LIST: TForm[] = [
	{
		label: "form.address.fields.address_line.label",
		placeholder: "form.address.fields.address_line.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.ADDRESS_LINE,
		fieldType: "input"
	},
	{
		label: "form.address.fields.country.label",
		placeholder: "form.address.fields.country.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.ADDRESS_COUNTRY,
		fieldType: "input"
	},
	{
		label: "form.address.fields.city.label",
		placeholder: "form.address.fields.city.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.ADDRESS_CITY,
		fieldType: "input"
	}
];
