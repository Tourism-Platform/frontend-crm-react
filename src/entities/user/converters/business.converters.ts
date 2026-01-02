import type {
	ENUM_BUSINESS_TYPES_TYPE,
	IBusinessInfoBackend,
	TBusinessSchema
} from "../types";

export const mapBusinessInfoToBackend = (
	frontend: TBusinessSchema
): IBusinessInfoBackend => ({
	business: {
		businessDescription: frontend.business.business_description,
		businessName: frontend.business.business_name,
		businessWebsite: frontend.business.business_website
	},
	legal: {
		legalCompanyName: frontend.legal.legal_company_name,
		director: frontend.legal.director,
		tin: frontend.legal.tin,
		typeOfBusiness: frontend.legal.type_of_business
	},
	address: {
		addressLine: frontend.address.address_line,
		country: frontend.address.country,
		city: frontend.address.city
	},
	contact: {
		contactPerson: frontend.contact.contact_person,
		position: frontend.contact.position,
		phoneNumber: frontend.contact.phone_number,
		email: frontend.contact.email
	},
	avatarUrl: frontend.avatar || ""
});

export const mapBusinessInfoToFrontend = (
	backend: IBusinessInfoBackend
): TBusinessSchema => ({
	business: {
		business_description: backend.business.businessDescription,
		business_name: backend.business.businessName,
		business_website: backend.business.businessWebsite
	},
	legal: {
		legal_company_name: backend.legal.legalCompanyName,
		director: backend.legal.director,
		tin: backend.legal.tin,
		type_of_business: backend.legal
			.typeOfBusiness as ENUM_BUSINESS_TYPES_TYPE
	},
	address: {
		address_line: backend.address.addressLine,
		country: backend.address.country,
		city: backend.address.city
	},
	contact: {
		contact_person: backend.contact.contactPerson,
		position: backend.contact.position,
		phone_number: backend.contact.phoneNumber,
		email: backend.contact.email
	},
	avatar: backend.avatarUrl
});
