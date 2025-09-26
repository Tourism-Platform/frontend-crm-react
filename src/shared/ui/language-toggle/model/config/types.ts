export const ENUM_LANGUAGES = {
	EN: "en",
	RU: "ru"
} as const;

export type ENUM_LANGUAGES_TYPE =
	(typeof ENUM_LANGUAGES)[keyof typeof ENUM_LANGUAGES];
