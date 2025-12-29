import { z } from "zod";

export const BUSINESS_SCHEMA = z.object({
	business: z.object({
		business_description: z
			.string()
			.min(10, {
				message: "form.business.fields.business_description.errors.min"
			})
			.max(1000, {
				message: "form.business.fields.business_description.errors.max"
			}),
		business_name: z
			.string()
			.min(2, {
				message: "form.business.fields.business_name.errors.min"
			})
			.max(100, {
				message: "form.business.fields.business_name.errors.max"
			}),
		business_website: z
			.string()
			.min(2, {
				message: "form.business.fields.business_website.errors.min"
			})
			.max(100, {
				message: "form.business.fields.business_website.errors.max"
			})
			.optional()
	}),
	legal: z.object({
		legal_company_name: z
			.string()
			.min(2, {
				message: "form.legal.fields.legal_company_name.errors.min"
			})
			.max(200, {
				message: "form.legal.fields.legal_company_name.errors.max"
			}),
		director: z
			.string()
			.min(2, { message: "form.legal.fields.director.errors.min" })
			.max(100, { message: "form.legal.fields.director.errors.max" }),
		tin: z.string().regex(/^\d{9}$/, {
			message: "form.legal.fields.tin.errors.pattern"
		}),
		type_of_business: z
			.string()
			.min(2, {
				message: "form.legal.fields.type_of_business.errors.min"
			})
			.max(100, {
				message: "form.legal.fields.type_of_business.errors.max"
			})
	}),
	address: z.object({
		address_line: z
			.string()
			.min(5, { message: "form.address.fields.address_line.errors.min" })
			.max(300, {
				message: "form.address.fields.address_line.errors.max"
			}),
		country: z
			.string()
			.min(2, { message: "form.address.fields.country.errors.min" })
			.max(100, { message: "form.address.fields.country.errors.max" }),
		city: z
			.string()
			.min(2, { message: "form.address.fields.city.errors.min" })
			.max(100, { message: "form.address.fields.city.errors.max" })
	}),
	contact: z.object({
		contact_person: z
			.string()
			.min(2, {
				message: "form.contact.fields.contact_person.errors.min"
			})
			.max(100, {
				message: "form.contact.fields.contact_person.errors.max"
			}),
		position: z
			.string()
			.min(2, { message: "form.contact.fields.position.errors.min" })
			.max(100, { message: "form.contact.fields.position.errors.max" }),
		phone_number: z
			.string()
			.min(1, {
				message: "form.contact.fields.phone_number.errors.required"
			})
			.min(10, { message: "form.contact.fields.phone_number.errors.min" })
			.max(15, { message: "form.contact.fields.phone_number.errors.max" })
			.regex(/^\+?[1-9]\d{7,14}$/, {
				message: "form.contact.fields.phone_number.errors.pattern"
			}),
		email: z.email({ message: "form.contact.fields.email.errors.email" })
	}),
	avatar: z.string().optional()
});
