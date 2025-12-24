import { z } from "zod";

import { ENUM_FORM_LANDING } from "../types/landing.types";

export const LANDING_SCHEMA = z.object({
	[ENUM_FORM_LANDING.PHOTOS]: z.array(z.string()).min(1, {
		message: "blocks.photos.errors.required"
	}),
	[ENUM_FORM_LANDING.DESCRIPTION]: z.string().trim().min(1, {
		message: "blocks.overview.fields.description.errors.required"
	}),
	[ENUM_FORM_LANDING.LANGUAGES]: z.array(z.string()).min(1, {
		message: "blocks.languages.fields.languages.errors.required"
	}),
	[ENUM_FORM_LANDING.INCLUDED]: z.array(z.string()).min(1, {
		message: "blocks.amenities.fields.included.errors.required"
	}),
	[ENUM_FORM_LANDING.NOT_INCLUDED]: z.array(z.string()).min(1, {
		message: "blocks.amenities.fields.not_included.errors.required"
	}),
	[ENUM_FORM_LANDING.PICKUP_TYPE]: z.enum(["airport", "hotel"], {
		message: "blocks.pickup.fields.pickup_type.errors.required"
	}),
	[ENUM_FORM_LANDING.PICKUP_DESCRIPTION]: z.string().trim().min(3, {
		message: "blocks.pickup.fields.pickup_description.errors.required"
	}),
	[ENUM_FORM_LANDING.CANCELLATION_POLICY]: z.string().trim().min(1, {
		message:
			"blocks.cancellation.fields.cancellation_policy.errors.required"
	}),
	[ENUM_FORM_LANDING.ADDITIONAL_INFO]: z.string().trim().min(1, {
		message: "blocks.additional_info.fields.additional_info.errors.required"
	})
});
