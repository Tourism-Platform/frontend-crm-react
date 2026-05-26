import type {
	TAgencyBusinessInfoBackend,
	TAgencyBusinessInfoUpdateBackend
} from "../types";
import {
	ENUM_AGENCY_BUSINESS_TYPES,
	type TAgencyBusinessSchema
} from "../types";

export const mapAgencyBusinessInfoToFrontend = (
	backend: TAgencyBusinessInfoBackend | null
): TAgencyBusinessSchema | null => {
	if (!backend) return null;
	return {
		business: {
			business_description: backend?.description ?? "",
			business_name: backend?.business_name ?? "",
			business_website: backend?.website_url ?? ""
		},
		legal: {
			legal_company_name: backend?.legal_name ?? "",
			director: backend?.director_name ?? "",
			tin: backend?.tax_id ?? "",
			type_of_business: ENUM_AGENCY_BUSINESS_TYPES.AGENCY
		},
		address: {
			address_line: backend?.address_line ?? "",
			country: backend?.country ?? "",
			city: backend?.city ?? ""
		},
		contact: {
			contact_person: backend?.contact_person ?? "",
			position: backend?.contact_position ?? "",
			phone_number: backend?.contact_phone ?? "",
			email: backend?.contact_email ?? ""
		},
		avatar: backend?.logo_url ?? ""
	};
};

export const mapAgencyBusinessInfoToBackend = (
	frontend: TAgencyBusinessSchema
): TAgencyBusinessInfoUpdateBackend => ({
	description: frontend.business.business_description,
	business_name: frontend.business.business_name,
	website_url: frontend.business.business_website,
	legal_name: frontend.legal.legal_company_name,
	director_name: frontend.legal.director,
	tax_id: frontend.legal.tin,
	contact_person: frontend.contact.contact_person,
	contact_position: frontend.contact.position,
	contact_email: frontend.contact.email,
	contact_phone: frontend.contact.phone_number,
	address_line: frontend.address.address_line,
	city: frontend.address.city,
	country: frontend.address.country
});
