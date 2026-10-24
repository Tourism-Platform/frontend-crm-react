import { LanguageCode } from "@/shared/api";

export const ENUM_LANGUAGES = {
	ENGLISH: "english",
	RUSSIAN: "russian",
	SPANISH: "spanish",
	ITALIAN: "italian",
	FRENCH: "french",
	CHINESE: "chinese",
	JAPANESE: "japanese",
	UZBEK: "uzbek",
	PORTUGUESE: "portuguese"
} as const;

export type ENUM_LANGUAGES_TYPE =
	(typeof ENUM_LANGUAGES)[keyof typeof ENUM_LANGUAGES];

export const ENUM_LANGUAGES_BACKEND = {
	ENGLISH: LanguageCode.En,
	RUSSIAN: LanguageCode.Ru,
	SPANISH: LanguageCode.Es,
	ITALIAN: LanguageCode.It,
	FRENCH: LanguageCode.Fr,
	CHINESE: LanguageCode.Zh,
	JAPANESE: LanguageCode.Ja,
	UZBEK: LanguageCode.Uz,
	PORTUGUESE: LanguageCode.Pt,
	GERMAN: LanguageCode.De
} as const;

export type ENUM_LANGUAGES_BACKEND_TYPE = LanguageCode;
