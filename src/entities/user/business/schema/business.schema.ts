import { z } from "zod";

import { type TBusinessSettingsPageKeys, i18nKey } from "@/shared/config";

import { ENUM_BUSINESS_TYPES } from "../types";

const msg = i18nKey<TBusinessSettingsPageKeys>();

export const BUSINESS_SCHEMA = z.object({
	business: z.object({
		business_description: z
			.string()
			.min(1, {
				message: msg(
					"form.business.fields.business_description.errors.required"
				)
			})
			.min(10, {
				message: msg(
					"form.business.fields.business_description.errors.min"
				)
			})
			.max(1000, {
				message: msg(
					"form.business.fields.business_description.errors.max"
				)
			}),
		business_name: z
			.string()
			.min(1, {
				message: msg(
					"form.business.fields.business_name.errors.required"
				)
			})
			.min(2, {
				message: msg("form.business.fields.business_name.errors.min")
			})
			.max(100, {
				message: msg("form.business.fields.business_name.errors.max")
			}),
		business_website: z
			.string()
			.min(1, {
				message: msg(
					"form.business.fields.business_website.errors.required"
				)
			})
			.min(2, {
				message: msg("form.business.fields.business_website.errors.min")
			})
			.max(100, {
				message: msg("form.business.fields.business_website.errors.max")
			})
	}),
	legal: z.object({
		legal_company_name: z
			.string()
			.min(1, {
				message: msg(
					"form.legal.fields.legal_company_name.errors.required"
				)
			})
			.min(2, {
				message: msg("form.legal.fields.legal_company_name.errors.min")
			})
			.max(200, {
				message: msg("form.legal.fields.legal_company_name.errors.max")
			}),
		director: z
			.string()
			.min(1, {
				message: msg("form.legal.fields.director.errors.required")
			})
			.min(2, { message: msg("form.legal.fields.director.errors.min") })
			.max(100, {
				message: msg("form.legal.fields.director.errors.max")
			}),
		tin: z
			.string()
			.min(1, { message: msg("form.legal.fields.tin.errors.required") })
			.max(20, { message: msg("form.legal.fields.tin.errors.max") })
			.regex(/^\d{9}$/, {
				message: msg("form.legal.fields.tin.errors.pattern")
			}),
		type_of_business: z.enum(ENUM_BUSINESS_TYPES, {
			message: msg("form.legal.fields.type_of_business.errors.required")
		})
	}),
	address: z.object({
		address_line: z
			.string()
			.min(1, {
				message: msg("form.address.fields.address_line.errors.required")
			})
			.min(5, {
				message: msg("form.address.fields.address_line.errors.min")
			})
			.max(300, {
				message: msg("form.address.fields.address_line.errors.max")
			}),
		country: z
			.string()
			.min(1, {
				message: msg("form.address.fields.country.errors.required")
			})
			.min(2, { message: msg("form.address.fields.country.errors.min") })
			.max(100, {
				message: msg("form.address.fields.country.errors.max")
			}),
		city: z
			.string()
			.min(1, {
				message: msg("form.address.fields.city.errors.required")
			})
			.min(2, { message: msg("form.address.fields.city.errors.min") })
			.max(100, { message: msg("form.address.fields.city.errors.max") })
	}),
	contact: z.object({
		contact_person: z
			.string()
			.min(1, {
				message: msg(
					"form.contact.fields.contact_person.errors.required"
				)
			})
			.min(2, {
				message: msg("form.contact.fields.contact_person.errors.min")
			})
			.max(100, {
				message: msg("form.contact.fields.contact_person.errors.max")
			}),
		position: z
			.string()
			.min(1, {
				message: msg("form.contact.fields.position.errors.required")
			})
			.min(2, { message: msg("form.contact.fields.position.errors.min") })
			.max(100, {
				message: msg("form.contact.fields.position.errors.max")
			}),
		phone_number: z
			.string()
			.min(1, {
				message: msg("form.contact.fields.phone_number.errors.required")
			})
			.min(10, {
				message: msg("form.contact.fields.phone_number.errors.min")
			})
			.max(15, {
				message: msg("form.contact.fields.phone_number.errors.max")
			})
			.regex(/^\+?[1-9]\d{7,14}$/, {
				message: msg("form.contact.fields.phone_number.errors.pattern")
			}),
		email: z
			.string()
			.min(1, {
				message: msg("form.contact.fields.email.errors.required")
			})
			.email({ message: msg("form.contact.fields.email.errors.email") })
	}),
	avatar: z.string().optional()
});
