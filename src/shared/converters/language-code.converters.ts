import { LanguageCode } from "@/shared/api/generated/Api";
import {
	ENUM_LANGUAGES,
	type ENUM_LANGUAGES_TYPE
} from "@/shared/config/languages";
import { createEnumMapper } from "@/shared/utils";

const MAP_LANGUAGE_CODE: Partial<Record<ENUM_LANGUAGES_TYPE, LanguageCode>> = {
	[ENUM_LANGUAGES.EN]: LanguageCode.En,
	[ENUM_LANGUAGES.RU]: LanguageCode.Ru,
	[ENUM_LANGUAGES.UZ]: LanguageCode.Uz
};

export const languageCodeMapper = createEnumMapper<
	ENUM_LANGUAGES_TYPE,
	LanguageCode
>(MAP_LANGUAGE_CODE);
