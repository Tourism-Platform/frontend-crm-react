import type { ENUM_LANGUAGES_TYPE } from "../config";

import { default as i18n } from "./i18n";

export const changeLanguage = (lng: ENUM_LANGUAGES_TYPE) => {
	i18n.changeLanguage(lng);
	localStorage.setItem("i18nextLng", lng);
};
