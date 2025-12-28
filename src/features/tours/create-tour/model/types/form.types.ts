import { z } from "zod";

import type { TFormField } from "@/shared/types";

import type { CREATE_TOUR_SCHEMA } from "../config";

export type TForm = TFormField<string, ENUM_FORM_CREATE_TOUR_TYPE>;

export const ENUM_FORM_CREATE_TOUR = {
	TOUR_TITLE: "tourTitle",
	TOUR_TYPE: "tourType",
	GROUP_SIZE: "groupSize",
	DURATION: "duration",
	AGE_REQUIRES: "ageRequires",
	TOUR_CATEGORIES: "tourCategories"
} as const;

export type ENUM_FORM_CREATE_TOUR_TYPE =
	(typeof ENUM_FORM_CREATE_TOUR)[keyof typeof ENUM_FORM_CREATE_TOUR];

export type TCreateTourSchema = z.infer<typeof CREATE_TOUR_SCHEMA>;
