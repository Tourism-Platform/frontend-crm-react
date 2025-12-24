export const ENUM_GENDER_OPTIONS = {
	MALE: "Male",
	FEMALE: "Female"
} as const;

export type ENUM_GENDER_OPTIONS_TYPE =
	(typeof ENUM_GENDER_OPTIONS)[keyof typeof ENUM_GENDER_OPTIONS];
