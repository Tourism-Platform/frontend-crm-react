import { z } from "zod";

import { type TLandingPageKeys, i18nKey } from "@/shared/config";

import {
	ENUM_AMENITIES,
	ENUM_LANGUAGES,
	ENUM_PICKUP_TYPE
} from "@/entities/tour";

import { ENUM_FORM_LANDING } from "../types";

const msg = i18nKey<TLandingPageKeys>();

export const LANDING_SCHEMA = z.object({
	[ENUM_FORM_LANDING.PHOTOS]: z.string().min(1, {
		message: msg("form.photos.errors.required")
	}),
	[ENUM_FORM_LANDING.DESCRIPTION]: z
		.string()
		.trim()
		.min(1, {
			message: msg("form.overview.fields.description.errors.required")
		})
		.min(3, {
			message: msg("form.overview.fields.description.errors.min")
		})
		.max(5000, {
			message: msg("form.overview.fields.description.errors.max")
		}),
	[ENUM_FORM_LANDING.LANGUAGES]: z.array(z.enum(ENUM_LANGUAGES)).min(1, {
		message: msg("form.languages.fields.languages.errors.required")
	}),
	[ENUM_FORM_LANDING.INCLUDED]: z.array(z.enum(ENUM_AMENITIES)).min(1, {
		message: msg("form.amenities.fields.included.errors.required")
	}),
	[ENUM_FORM_LANDING.NOT_INCLUDED]: z.array(z.enum(ENUM_AMENITIES)).min(1, {
		message: msg("form.amenities.fields.not_included.errors.required")
	}),
	[ENUM_FORM_LANDING.PICKUP_TYPE]: z.array(z.enum(ENUM_PICKUP_TYPE)).min(1, {
		message: msg("form.pickup.fields.pickup_type.errors.required")
	}),
	[ENUM_FORM_LANDING.PICKUP_DESCRIPTION]: z
		.string()
		.trim()
		.min(1, {
			message: msg(
				"form.pickup.fields.pickup_description.errors.required"
			)
		})
		.min(3, {
			message: msg("form.pickup.fields.pickup_description.errors.min")
		})
		.max(1000, {
			message: msg("form.pickup.fields.pickup_description.errors.max")
		}),
	[ENUM_FORM_LANDING.CANCELLATION_POLICY]: z
		.string()
		.trim()
		.min(1, {
			message: msg(
				"form.cancellation.fields.cancellation_policy.errors.required"
			)
		})
		.min(3, {
			message: msg(
				"form.cancellation.fields.cancellation_policy.errors.min"
			)
		})
		.max(2000, {
			message: msg(
				"form.cancellation.fields.cancellation_policy.errors.max"
			)
		}),
	[ENUM_FORM_LANDING.ADDITIONAL_INFO]: z
		.string()
		.trim()
		.min(1, {
			message: msg(
				"form.additional_info.fields.additional_info.errors.required"
			)
		})
		.min(3, {
			message: msg(
				"form.additional_info.fields.additional_info.errors.min"
			)
		})
		.max(2000, {
			message: msg(
				"form.additional_info.fields.additional_info.errors.max"
			)
		})
});
