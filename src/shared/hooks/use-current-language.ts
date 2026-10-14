import { useTranslation } from "react-i18next";

import {
	ENUM_LANGUAGES,
	type ENUM_LANGUAGES_TYPE,
	i18nLanguageMapper
} from "@/shared/config/languages";

/** Current UI language as the app enum; falls back to English. */
export const useCurrentLanguage = (): ENUM_LANGUAGES_TYPE => {
	const { i18n } = useTranslation();

	return i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
};
