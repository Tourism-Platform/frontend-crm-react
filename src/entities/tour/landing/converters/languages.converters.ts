import { Languages } from "@/shared/api";
import { createEnumMapper } from "@/shared/utils";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "../types";

const MAP_LANGUAGES: Partial<Record<ENUM_LANGUAGES_TYPE, Languages>> = {
	[ENUM_LANGUAGES.RUSSIAN]: Languages.Ru,
	[ENUM_LANGUAGES.ENGLISH]: Languages.En
};

export const languageMapper = createEnumMapper<ENUM_LANGUAGES_TYPE, Languages>(
	MAP_LANGUAGES
);
