import { createEnumMapper } from "@/shared/utils";

import { ENUM_LANGUAGES, type ENUM_LANGUAGES_TYPE } from "./languages.types";

const MAP_I18N_LOCALE: Partial<Record<string, ENUM_LANGUAGES_TYPE>> = {
	en: ENUM_LANGUAGES.EN,
	ru: ENUM_LANGUAGES.RU,
	uz: ENUM_LANGUAGES.UZ
};

export const i18nLanguageMapper = createEnumMapper<string, ENUM_LANGUAGES_TYPE>(
	MAP_I18N_LOCALE
);
