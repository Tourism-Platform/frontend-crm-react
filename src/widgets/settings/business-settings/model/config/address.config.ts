import { ENUM_FORM_CHANGE_BUSINESS, type IFormChangeBusiness } from "../types";

export const ADDRESS_BUSINESS_DATA_LIST: IFormChangeBusiness[] = [
	{
		label: "form.address.fields.address_line.label",
		placeholder: "form.address.fields.address_line.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.ADDRESS_LINE
	},
	{
		label: "form.address.fields.country.label",
		placeholder: "form.address.fields.country.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.ADDRESS_COUNTRY
	},
	{
		label: "form.address.fields.city.label",
		placeholder: "form.address.fields.city.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.ADDRESS_CITY
	}
];
