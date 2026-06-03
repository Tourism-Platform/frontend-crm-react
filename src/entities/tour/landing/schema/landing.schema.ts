import { z } from "zod";

import { type TLandingPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_AMENITIES,
	ENUM_FORM_LANDING,
	ENUM_LANGUAGES,
	ENUM_PICKUP_TYPE
} from "../types";

const msg = i18nKey<TLandingPageKeys>();

export const LANDING_SCHEMA = z.object({
	[ENUM_FORM_LANDING.DESCRIPTION]: z
		.string()
		.trim()
		.max(5000, {
			message: msg("form.overview.fields.description.errors.max")
		})
		.optional(),
	[ENUM_FORM_LANDING.LANGUAGES]: z.array(z.enum(ENUM_LANGUAGES)).optional(),
	[ENUM_FORM_LANDING.INCLUDED]: z.array(z.enum(ENUM_AMENITIES)).optional(),
	[ENUM_FORM_LANDING.NOT_INCLUDED]: z
		.array(z.enum(ENUM_AMENITIES))
		.optional(),
	[ENUM_FORM_LANDING.PICKUP_TYPE]: z
		.array(z.enum(ENUM_PICKUP_TYPE))
		.optional(),
	[ENUM_FORM_LANDING.PICKUP_DESCRIPTION]: z
		.string()
		.trim()
		.max(1000, {
			message: msg("form.pickup.fields.pickup_description.errors.max")
		})
		.optional(),
	[ENUM_FORM_LANDING.CANCELLATION_POLICY]: z
		.string()
		.trim()
		.max(2000, {
			message: msg(
				"form.cancellation.fields.cancellation_policy.errors.max"
			)
		})
		.optional(),
	[ENUM_FORM_LANDING.ADDITIONAL_INFO]: z
		.string()
		.trim()
		.max(2000, {
			message: msg(
				"form.additional_info.fields.additional_info.errors.max"
			)
		})
		.optional()
});
