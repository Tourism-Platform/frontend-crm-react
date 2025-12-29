import type { TTourSettingsPageKeys } from "@/shared/config";
import type { TFormField } from "@/shared/types";

export const ENUM_GENERAL_FORM = {
	TOUR_TITLE: "tourTitle",
	TOUR_TYPE: "tourType",
	GROUP_SIZE: "groupSize",
	DURATION: "duration",
	AGE_REQUIRES: "ageRequires",
	TOUR_CATEGORIES: "tourCategories"
} as const;

export type ENUM_GENERAL_FORM_TYPE =
	(typeof ENUM_GENERAL_FORM)[keyof typeof ENUM_GENERAL_FORM];

export type TGeneralForm = TFormField<
	TTourSettingsPageKeys,
	ENUM_GENERAL_FORM_TYPE
>;
