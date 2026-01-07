import { z } from "zod";

import type { SETTINGS_GENERAL_FORM_SCHEMA } from "../schema";

export const ENUM_SETTINGS_GENERAL_FORM = {
	TOUR_TITLE: "tourTitle",
	TOUR_TYPE: "tourType",
	GROUP_SIZE: "groupSize",
	DURATION: "duration",
	AGE_REQUIRES: "ageRequires",
	TOUR_CATEGORIES: "tourCategories"
} as const;

export type ENUM_SETTINGS_GENERAL_FORM_TYPE =
	(typeof ENUM_SETTINGS_GENERAL_FORM)[keyof typeof ENUM_SETTINGS_GENERAL_FORM];

export type TSettingsGeneralFormSchema = z.infer<
	typeof SETTINGS_GENERAL_FORM_SCHEMA
>;
