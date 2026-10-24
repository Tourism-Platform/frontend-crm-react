import { LanguageCode } from "@/shared/api/generated/Api";
import {
	ENUM_LANGUAGES,
	type ENUM_LANGUAGES_TYPE,
	i18nLanguageMapper
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

/** `?read_lang=` for content reads; always an object — no ternary in services. */
export const mapReadLangQueryToBackend = (
	language?: ENUM_LANGUAGES_TYPE
): { read_lang?: LanguageCode } => {
	if (!language) {
		return {};
	}

	return { read_lang: languageCodeMapper.to(language) ?? LanguageCode.En };
};

/** `?lang=` for booking order details. */
export const mapOrderLangQueryToBackend = (
	language?: ENUM_LANGUAGES_TYPE
): { lang?: LanguageCode } => {
	if (!language) {
		return {};
	}

	return { lang: languageCodeMapper.to(language) ?? LanguageCode.En };
};

/**
 * Локаль i18next (`i18n.language`) → `LanguageCode`.
 * UI передаёт локаль как есть; обе ступени (локаль → язык приложения → код бэка) — только здесь.
 */
export const mapLocaleToLanguageCode = (locale?: string): LanguageCode =>
	languageCodeMapper.to(
		(locale && i18nLanguageMapper.to(locale)) || ENUM_LANGUAGES.EN
	) ?? LanguageCode.En;
