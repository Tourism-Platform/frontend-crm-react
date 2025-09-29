import { z } from "zod";

import type { TBusinessSettingsPageKeys } from "@/shared/config";

import type { CHANGE_BUSINESS_SCHEMA } from "../config";

export interface IFormChangeBusiness {
	label: TBusinessSettingsPageKeys;
	placeholder: TBusinessSettingsPageKeys;
	key: ENUM_FORM_CHANGE_BUSINESS_TYPE;
}

export const ENUM_FORM_CHANGE_BUSINESS = {
	BUSINESS_DESCRIPTION: "business.business_description",
	BUSINESS_NAME: "business.business_name",
	BUSINESS_WEBSITE: "business.business_website",

	LEGAL_COMPANY_NAME: "legal.legal_company_name",
	LEGAL_DIRECTOR: "legal.director",
	LEGAL_TIN: "legal.tin",
	LEGAL_TYPE_OF_BUSINESS: "legal.type_of_business",
	LEGAL_BUSINESS_NAME: "legal.business_name",
	LEGAL_BUSINESS_WEBSITE: "legal.business_website",

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

export type TChangeBusinessSchema = z.infer<typeof CHANGE_BUSINESS_SCHEMA>;
