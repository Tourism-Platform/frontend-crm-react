import type { TOptionsKeys } from "@/shared/config";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "../types";

export const LANGUAGES_LABELS: Record<ENUM_LANGUAGES_TYPE, TOptionsKeys> = {
	[ENUM_LANGUAGES.ENGLISH]: "tour.languages.english",
	[ENUM_LANGUAGES.RUSSIAN]: "tour.languages.russian",
	[ENUM_LANGUAGES.SPANISH]: "tour.languages.spanish",
	[ENUM_LANGUAGES.ITALIAN]: "tour.languages.italian",
	[ENUM_LANGUAGES.FRENCH]: "tour.languages.french",
	[ENUM_LANGUAGES.CHINESE]: "tour.languages.chinese",
	[ENUM_LANGUAGES.JAPANESE]: "tour.languages.japanese",
	[ENUM_LANGUAGES.UZBEK]: "tour.languages.uzbek",
	[ENUM_LANGUAGES.PORTUGUESE]: "tour.languages.portuguese"
};
