import i18n from "./i18n.init";

export const preloadNamespaces = (namespaces: string[]) => {
	const unique = [...new Set(namespaces.filter(Boolean))];
	if (unique.length === 0) return Promise.resolve([]);

	return i18n.loadNamespaces(unique);
};
