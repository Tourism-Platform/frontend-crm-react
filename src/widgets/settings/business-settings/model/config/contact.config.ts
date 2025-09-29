import { ENUM_FORM_CHANGE_BUSINESS, type IFormChangeBusiness } from "../types";

export const CONTACT_BUSINESS_DATA_LIST: IFormChangeBusiness[] = [
	{
		label: "form.contact.fields.contact_person.label",
		placeholder: "form.contact.fields.contact_person.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.CONTACT_PERSON
	},
	{
		label: "form.contact.fields.position.label",
		placeholder: "form.contact.fields.position.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.CONTACT_POSITION
	},
	{
		label: "form.contact.fields.phone_number.label",
		placeholder: "form.contact.fields.phone_number.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.CONTACT_PHONE_NUMBER
	},
	{
		label: "form.contact.fields.email.label",
		placeholder: "form.contact.fields.email.placeholder",
		key: ENUM_FORM_CHANGE_BUSINESS.CONTACT_EMAIL
	}
];
