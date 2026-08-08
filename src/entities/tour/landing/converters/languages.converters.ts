import { LanguageCode } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "../types";

const MAP_LANGUAGES: Partial<Record<ENUM_LANGUAGES_TYPE, LanguageCode>> = {
	[ENUM_LANGUAGES.RUSSIAN]: LanguageCode.Ru,
	[ENUM_LANGUAGES.ENGLISH]: LanguageCode.En,
	[ENUM_LANGUAGES.SPANISH]: LanguageCode.Es,
	[ENUM_LANGUAGES.ITALIAN]: LanguageCode.It,
	[ENUM_LANGUAGES.PORTUGUESE]: LanguageCode.Pt,
	[ENUM_LANGUAGES.UZBEK]: LanguageCode.Uz,
	[ENUM_LANGUAGES.FRENCH]: LanguageCode.Fr,
	[ENUM_LANGUAGES.CHINESE]: LanguageCode.Zh,
	[ENUM_LANGUAGES.JAPANESE]: LanguageCode.Ja
};

export const languageMapper = createEnumMapper<
	ENUM_LANGUAGES_TYPE,
	LanguageCode
>(MAP_LANGUAGES);
