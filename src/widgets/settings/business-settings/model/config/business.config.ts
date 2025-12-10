import { ENUM_FORM_CHANGE_BUSINESS, type TForm } from "../types";

export const BUSINESS_DATA_LIST: TForm[] = [
	{
		label: "form.business.fields.business_description.label",
		placeholder: "form.business.fields.business_description.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.BUSINESS_DESCRIPTION,
		fieldType: "editor"
	},
	{
		label: "form.business.fields.business_name.label",
		placeholder: "form.business.fields.business_name.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.BUSINESS_NAME,
		fieldType: "input"
	},
	{
		label: "form.legal.fields.business_website.label",
		placeholder: "form.legal.fields.business_website.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.BUSINESS_WEBSITE,
		fieldType: "input"
	}
];
