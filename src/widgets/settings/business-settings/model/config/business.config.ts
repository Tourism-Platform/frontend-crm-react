import { ENUM_FORM_CHANGE_BUSINESS, type IFormChangeBusiness } from "../types";

export const BUSINESS_DATA_LIST: IFormChangeBusiness[] = [
	{
		label: "form.business.fields.business_description.label",
		placeholder: "form.business.fields.business_description.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.BUSINESS_DESCRIPTION
	},
	{
		label: "form.business.fields.business_name.label",
		placeholder: "form.business.fields.business_name.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.BUSINESS_NAME
	},
	{
		label: "form.legal.fields.business_website.label",
		placeholder: "form.legal.fields.business_website.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.BUSINESS_WEBSITE
	}
];
