import { Gender } from "@/shared/api";

export const ENUM_GENDER_OPTIONS = {
	MALE: "Male",
	FEMALE: "Female"
} as const;

export type ENUM_GENDER_OPTIONS_TYPE =
	(typeof ENUM_GENDER_OPTIONS)[keyof typeof ENUM_GENDER_OPTIONS];

export const ENUM_GENDER_OPTIONS_BACKEND = {
	MALE: Gender.M,
	FEMALE: Gender.F
} as const;

export type ENUM_GENDER_OPTIONS_BACKEND_TYPE = Gender;
