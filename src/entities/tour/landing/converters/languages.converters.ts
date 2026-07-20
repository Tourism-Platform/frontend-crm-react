import { LanguageCode } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "../types";

const MAP_LANGUAGES: Partial<Record<ENUM_LANGUAGES_TYPE, LanguageCode>> = {
	[ENUM_LANGUAGES.RUSSIAN]: LanguageCode.Ru,
	[ENUM_LANGUAGES.ENGLISH]: LanguageCode.En,
	[ENUM_LANGUAGES.SPANISH]: LanguageCode.En,
	[ENUM_LANGUAGES.ITALIAN]: LanguageCode.En,
	[ENUM_LANGUAGES.PORTUGUESE]: LanguageCode.En,
	[ENUM_LANGUAGES.UZBEK]: LanguageCode.Uz
};

export const languageMapper = createEnumMapper<
	ENUM_LANGUAGES_TYPE,
	LanguageCode
>(MAP_LANGUAGES);
