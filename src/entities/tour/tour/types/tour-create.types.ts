import { z } from "zod";

import type { TFormField } from "@/shared/types";

import type { TOUR_CREATE_SCHEMA } from "../schema";

export type TForm = TFormField<string, ENUM_TOUR_CREATE_FORM_TYPE>;

export const ENUM_TOUR_CREATE_FORM = {
	TOUR_TITLE: "tourTitle", // keeping internal key as camelCase but CONSTANT as PascalCase is standard
	TOUR_TYPE: "tourType",
	GROUP_SIZE: "groupSize",
	DURATION: "duration",
	AGE_REQUIRES: "ageRequires",
	TOUR_CATEGORIES: "tourCategories"
} as const;

export type ENUM_TOUR_CREATE_FORM_TYPE =
	(typeof ENUM_TOUR_CREATE_FORM)[keyof typeof ENUM_TOUR_CREATE_FORM];

export type TCreateTourSchema = z.infer<typeof TOUR_CREATE_SCHEMA>;
