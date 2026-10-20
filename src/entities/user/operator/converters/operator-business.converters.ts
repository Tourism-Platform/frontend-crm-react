import { ENUM_ROLE } from "../../account";
import type {
	TOperatorBusinessInfoBackend,
	TOperatorBusinessInfoUpdateBackend
} from "../types";
import { type TOperatorBusinessSchema } from "../types";

export const mapOperatorBusinessInfoToFrontend = (
	backend: TOperatorBusinessInfoBackend | null
): TOperatorBusinessSchema => {
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
			type_of_business: ENUM_ROLE.TOUR_OPERATOR
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
		avatar: backend?.logo_path ?? ""
	};
};

export const mapOperatorBusinessInfoToBackend = (
	frontend: TOperatorBusinessSchema
): TOperatorBusinessInfoUpdateBackend => ({
	description: frontend.business.business_description || null,
	business_name: frontend.business.business_name || null,
	website_url: frontend.business.business_website || null,
	legal_name: frontend.legal.legal_company_name || null,
	director_name: frontend.legal.director || null,
	tax_id: frontend.legal.tin || null,
	contact_person: frontend.contact.contact_person || null,
	contact_position: frontend.contact.position || null,
	contact_email: frontend.contact.email || null,
	contact_phone: frontend.contact.phone_number || null,
	address_line: frontend.address.address_line || null,
	city: frontend.address.city || null,
	country: frontend.address.country || null
});
