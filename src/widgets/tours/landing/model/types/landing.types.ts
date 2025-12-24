import { z } from "zod";

import type { TFormField } from "@/shared/types";

import type { LANDING_SCHEMA } from "../schema/landing.schema";

export const ENUM_FORM_LANDING = {
	PHOTOS: "photos",
	DESCRIPTION: "description",
	LANGUAGES: "languages",
	INCLUDED: "included",
	NOT_INCLUDED: "not_included",
	PICKUP_TYPE: "pickup_type",
	PICKUP_DESCRIPTION: "pickup_description",
	CANCELLATION_POLICY: "cancellation_policy",
	ADDITIONAL_INFO: "additional_info"
} as const;

export type ENUM_FORM_LANDING_TYPE =
	(typeof ENUM_FORM_LANDING)[keyof typeof ENUM_FORM_LANDING];

export type TLandingSchema = z.infer<typeof LANDING_SCHEMA>;

export type TLandingForm = TFormField<string, ENUM_FORM_LANDING_TYPE>;
