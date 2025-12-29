import type z from "zod";

import type { BUSINESS_SCHEMA } from "../schema";

export const ENUM_FORM_CHANGE_BUSINESS = {
	BUSINESS_DESCRIPTION: "business.business_description",
	BUSINESS_NAME: "business.business_name",
	BUSINESS_WEBSITE: "business.business_website",

	LEGAL_COMPANY_NAME: "legal.legal_company_name",
	LEGAL_DIRECTOR: "legal.director",
	LEGAL_TIN: "legal.tin",
	LEGAL_TYPE_OF_BUSINESS: "legal.type_of_business",

	ADDRESS_LINE: "address.address_line",
	ADDRESS_COUNTRY: "address.country",
	ADDRESS_CITY: "address.city",

	CONTACT_PERSON: "contact.contact_person",
	CONTACT_POSITION: "contact.position",
	CONTACT_PHONE_NUMBER: "contact.phone_number",
	CONTACT_EMAIL: "contact.email"
} as const;

export type ENUM_FORM_CHANGE_BUSINESS_TYPE =
	(typeof ENUM_FORM_CHANGE_BUSINESS)[keyof typeof ENUM_FORM_CHANGE_BUSINESS];

export type TBusinessSchema = z.infer<typeof BUSINESS_SCHEMA>;
