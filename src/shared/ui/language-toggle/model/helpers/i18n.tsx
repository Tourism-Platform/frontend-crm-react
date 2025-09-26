import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { ENUM_LANGUAGES } from "../config";

// namespaces, которые у вас лежат в public/languages/{lng}/{ns}.json
const ns = ["header", "footer", "home"] as const;

// Явный объект ресурсов (тип выводится автоматически от импортов)
i18n.use(HttpBackend) // для загрузки JSON с public при runtime (не мешает явным resources)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: ENUM_LANGUAGES.EN,
		debug: true,
		ns: [...ns],
		defaultNS: "header", // установите тот же defaultNS, что и в вашей декларации types (.d.ts)
		interpolation: {
			escapeValue: false
		},
		backend: {
			loadPath: "/languages/{{lng}}/{{ns}}.json"
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"]
		}
	});

export default i18n;
