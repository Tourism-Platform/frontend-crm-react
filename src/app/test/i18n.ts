import i18n, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";

// Не из barrel `@/shared/config`: он импортирует подменяемый i18n.init
import { NS } from "@/shared/config/i18n/i18n.config";
import { ENUM_LANGUAGES } from "@/shared/config/languages/languages.types";

/** Те же JSON, что грузит HttpBackend в приложении, — но синхронно и без сети */
const EN_FILES = import.meta.glob<Record<string, unknown>>(
	"../../../public/locales/en/**/*.json",
	{ eager: true, import: "default" }
);

/** Неймспейс — имя файла, в том числе в папке блока (`en/tours/tours_page.json`) */
const toNamespace = (path: string) =>
	path.slice(path.lastIndexOf("/") + 1, -".json".length);

const resources: Resource = {
	[ENUM_LANGUAGES.EN]: Object.fromEntries(
		Object.entries(EN_FILES).map(([path, data]) => [
			toNamespace(path),
			data
		])
	)
};

/**
 * Подменяет `i18n.init` в тестах (см. setup.ts): без HttpBackend и детектора
 * языка, иначе каждый импорт `@/shared/config` делал бы запросы /locales/*
 */
export const testI18n = i18n.createInstance();

void testI18n.use(initReactI18next).init({
	lng: ENUM_LANGUAGES.EN,
	fallbackLng: ENUM_LANGUAGES.EN,
	ns: [...NS],
	defaultNS: NS[0],
	resources,
	interpolation: { escapeValue: false },
	initAsync: false
});
