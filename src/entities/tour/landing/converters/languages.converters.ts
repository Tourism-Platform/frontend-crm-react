import { Language } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "../types";

const MAP_LANGUAGES: Partial<Record<ENUM_LANGUAGES_TYPE, Language>> = {
	[ENUM_LANGUAGES.RUSSIAN]: Language.Russian,
	[ENUM_LANGUAGES.ENGLISH]: Language.English,
	[ENUM_LANGUAGES.SPANISH]: Language.Spanish,
	[ENUM_LANGUAGES.ITALIAN]: Language.Italian,
	[ENUM_LANGUAGES.PORTUGUESE]: Language.Portuguese,
	[ENUM_LANGUAGES.UZBEK]: Language.Uzbek
};

export const languageMapper = createEnumMapper<ENUM_LANGUAGES_TYPE, Language>(
	MAP_LANGUAGES
);
