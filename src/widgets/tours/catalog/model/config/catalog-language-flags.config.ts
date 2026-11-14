import {
	CN,
	ES,
	FR,
	GB,
	IT,
	JP,
	PT,
	RU,
	UZ
} from "country-flag-icons/react/3x2";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "@/entities/tour";

/** Флаг каждого языка тура — те же страны, что у `LocaleFlag` на карточках тура */
export const CATALOG_LANGUAGE_FLAGS: Record<ENUM_LANGUAGES_TYPE, typeof GB> = {
	[ENUM_LANGUAGES.ENGLISH]: GB,
	[ENUM_LANGUAGES.RUSSIAN]: RU,
	[ENUM_LANGUAGES.SPANISH]: ES,
	[ENUM_LANGUAGES.ITALIAN]: IT,
	[ENUM_LANGUAGES.FRENCH]: FR,
	[ENUM_LANGUAGES.CHINESE]: CN,
	[ENUM_LANGUAGES.JAPANESE]: JP,
	[ENUM_LANGUAGES.UZBEK]: UZ,
	[ENUM_LANGUAGES.PORTUGUESE]: PT
};
