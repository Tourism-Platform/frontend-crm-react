import { z } from "zod";

import type { TOUR_SETTINGS_GENERAL_FORM_SCHEMA } from "../schema";

export const ENUM_TOUR_SETTINGS_GENERAL_FORM = {
	TOUR_TITLE: "tourTitle",
	TOUR_TYPE: "tourType",
	AGENCY_ID: "agencyId",
	GROUP_SIZE: "groupSize",
	GROUP_SIZE_MIN: "groupSizeMin",
	DURATION: "duration",
	DURATION_HOURS: "durationHours",
	AGE_REQUIRES: "ageRequires",
	TOUR_CATEGORIES: "tourCategories",
	LANGUAGES: "languages"
} as const;

export type ENUM_TOUR_SETTINGS_GENERAL_FORM_TYPE =
	(typeof ENUM_TOUR_SETTINGS_GENERAL_FORM)[keyof typeof ENUM_TOUR_SETTINGS_GENERAL_FORM];

export type TTourSettingsGeneralFormSchema = z.infer<
	typeof TOUR_SETTINGS_GENERAL_FORM_SCHEMA
>;
