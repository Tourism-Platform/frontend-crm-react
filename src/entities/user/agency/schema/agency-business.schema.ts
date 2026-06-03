import { z } from "zod";

import { type TBusinessSettingsPageKeys, i18nKey } from "@/shared/config";

import { ENUM_ROLE } from "../../account";

const msg = i18nKey<TBusinessSettingsPageKeys>();

export const AGENCY_BUSINESS_SCHEMA = z.object({
	business: z.object({
		business_description: z
			.string()
			// .min(1, {
			// 	message: msg(
			// 		"form.business.fields.business_description.errors.required"
			// 	)
			// })
			// .min(10, {
			// 	message: msg(
			// 		"form.business.fields.business_description.errors.min"
			// 	)
			// })
			.max(1000, {
				message: msg(
					"form.business.fields.business_description.errors.max"
				)
			})
			.optional(),
		business_name: z
			.string()
			// .min(1, {
			// 	message: msg(
			// 		"form.business.fields.business_name.errors.required"
			// 	)
			// })
			// .min(2, {
			// 	message: msg("form.business.fields.business_name.errors.min")
			// })
			.max(100, {
				message: msg("form.business.fields.business_name.errors.max")
			})
			.optional(),
		business_website: z
			.string()
			// .min(1, {
			// 	message: msg(
			// 		"form.business.fields.business_website.errors.required"
			// 	)
			// })
			// .min(2, {
			// 	message: msg("form.business.fields.business_website.errors.min")
			// })
			.max(100, {
				message: msg("form.business.fields.business_website.errors.max")
			})
			.regex(/^(\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/, {
				message: msg(
					"form.business.fields.business_website.errors.pattern"
				)
			})
			.or(z.literal(""))
			.optional()
	}),
	legal: z.object({
		legal_company_name: z
			.string()
			// .min(1, {
			// 	message: msg(
			// 		"form.legal.fields.legal_company_name.errors.required"
			// 	)
			// })
			// .min(2, {
			// 	message: msg("form.legal.fields.legal_company_name.errors.min")
			// })
			.max(200, {
				message: msg("form.legal.fields.legal_company_name.errors.max")
			})
			.optional(),
		director: z
			.string()
			// .min(1, {
			// 	message: msg("form.legal.fields.director.errors.required")
			// })
			// .min(2, { message: msg("form.legal.fields.director.errors.min") })
			.max(100, {
				message: msg("form.legal.fields.director.errors.max")
			})
			.optional(),
		tin: z
			.string()
			// .min(1, { message: msg("form.legal.fields.tin.errors.required") })
			.max(20, { message: msg("form.legal.fields.tin.errors.max") })
			.regex(/^\d{9}$/, {
				message: msg("form.legal.fields.tin.errors.pattern")
			})
			.or(z.literal(""))
			.optional(),
		type_of_business: z
			.enum(ENUM_ROLE, {
				message: msg(
					"form.legal.fields.type_of_business.errors.required"
				)
			})
			.optional()
	}),
	address: z.object({
		address_line: z
			.string()
			// .min(1, {
			// 	message: msg("form.address.fields.address_line.errors.required")
			// })
			// .min(5, {
			// 	message: msg("form.address.fields.address_line.errors.min")
			// })
			.max(300, {
				message: msg("form.address.fields.address_line.errors.max")
			})
			.optional(),
		country: z
			.string()
			// .min(1, {
			// 	message: msg("form.address.fields.country.errors.required")
			// })
			// .min(2, { message: msg("form.address.fields.country.errors.min") })
			.max(100, {
				message: msg("form.address.fields.country.errors.max")
			})
			.optional(),
		city: z
			.string()
			// .min(1, {
			// 	message: msg("form.address.fields.city.errors.required")
			// })
			// .min(2, { message: msg("form.address.fields.city.errors.min") })
			.max(100, { message: msg("form.address.fields.city.errors.max") })
			.optional()
	}),
	contact: z.object({
		contact_person: z
			.string()
			// .min(1, {
			// 	message: msg(
			// 		"form.contact.fields.contact_person.errors.required"
			// 	)
			// })
			// .min(2, {
			// 	message: msg("form.contact.fields.contact_person.errors.min")
			// })
			.max(100, {
				message: msg("form.contact.fields.contact_person.errors.max")
			})
			.optional(),
		position: z
			.string()
			// .min(1, {
			// 	message: msg("form.contact.fields.position.errors.required")
			// })
			// .min(2, { message: msg("form.contact.fields.position.errors.min") })
			.max(100, {
				message: msg("form.contact.fields.position.errors.max")
			})
			.optional(),
		phone_number: z
			.string()
			// .min(1, {
			// 	message: msg("form.contact.fields.phone_number.errors.required")
			// })
			.min(10, {
				message: msg("form.contact.fields.phone_number.errors.min")
			})
			.max(15, {
				message: msg("form.contact.fields.phone_number.errors.max")
			})
			.regex(/^\+?[1-9]\d{7,14}$/, {
				message: msg("form.contact.fields.phone_number.errors.pattern")
			})
			.or(z.literal(""))
			.optional(),
		email: z
			.email({
				message: msg("form.contact.fields.email.errors.email")
			})
			.or(z.literal(""))
			.optional()
	}),
	avatar: z.string().optional()
});
