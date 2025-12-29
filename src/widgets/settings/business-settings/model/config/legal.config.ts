import { ENUM_FORM_CHANGE_BUSINESS } from "@/entities/user";

import { type TForm } from "../types";

export const LEGAL_BUSINESS_DATA_LIST: TForm[] = [
	{
		label: "form.legal.fields.legal_company_name.label",
		placeholder: "form.legal.fields.legal_company_name.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_COMPANY_NAME,
		fieldType: "input"
	},
	{
		label: "form.legal.fields.director.label",
		placeholder: "form.legal.fields.director.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_DIRECTOR,
		fieldType: "input"
	},
	{
		label: "form.legal.fields.tin.label",
		placeholder: "form.legal.fields.tin.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_TIN,
		fieldType: "input"
	},
	{
		label: "form.legal.fields.type_of_business.label",
		placeholder: "form.legal.fields.type_of_business.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.LEGAL_TYPE_OF_BUSINESS,
		fieldType: "input"
	}
];
