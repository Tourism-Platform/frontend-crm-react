import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { ENUM_LANGUAGES } from "../languages";

import { getNamespacePath } from "./i18n.blocks";
import { NS } from "./i18n.config";

i18n.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: ENUM_LANGUAGES.EN,
		debug: true,
		ns: [...NS], // используем ваш существующий массив
		defaultNS: NS[0], // первый элемент как default
		interpolation: {
			escapeValue: false
		},
		backend: {
			loadPath: (languages: string[], namespaces: string[]) => {
				const lng = languages[0];
				const ns = namespaces[0];
				return getNamespacePath(lng, ns);
			}
		},
		detection: {
			order: ["localStorage", "navigator"],
			caches: ["localStorage"]
		}
	});

i18n.on("failedLoading", (lng, ns, msg) => {
	console.error("❌ Failed to load translation:", { lng, ns, msg });
});

i18n.on("loaded", (loaded) => {
	console.log("✅ Translations loaded:", loaded);
});

export default i18n;
