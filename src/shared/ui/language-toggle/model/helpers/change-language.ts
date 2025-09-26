import { default as i18n } from "./i18n";

export const changeLanguage = (lng: string) => {
	i18n.changeLanguage(lng);
	localStorage.setItem("i18nextLng", lng);
};
