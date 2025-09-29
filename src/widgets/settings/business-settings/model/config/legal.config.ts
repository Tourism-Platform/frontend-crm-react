import { ENUM_FORM_CHANGE_BUSINESS, type IFormChangeBusiness } from "../types";

export const LEGAL_BUSINESS_DATA_LIST: IFormChangeBusiness[] = [
	{
		label: "form.legal.fields.legal_company_name.label",
		placeholder: "form.legal.fields.legal_company_name.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_COMPANY_NAME
	},
	{
		label: "form.legal.fields.director.label",
		placeholder: "form.legal.fields.director.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_DIRECTOR
	},
	{
		label: "form.legal.fields.tin.label",
		placeholder: "form.legal.fields.tin.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_TIN
	},
	{
		label: "form.legal.fields.type_of_business.label",
		placeholder: "form.legal.fields.type_of_business.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_TYPE_OF_BUSINESS
	},
	{
		label: "form.legal.fields.business_name.label",
		placeholder: "form.legal.fields.business_name.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_BUSINESS_NAME
	},
	{
		label: "form.legal.fields.business_website.label",
		placeholder: "form.legal.fields.business_website.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_BUSINESS_WEBSITE
	}
];
