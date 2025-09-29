interface ITranslationBlock {
	folder: string;
	namespaces: string[];
}

export const TRANSLATION_BLOCKS: Record<string, ITranslationBlock> = {
	// Блок настроек
	settings: {
		folder: "settings",
		namespaces: ["security_page"]
	},

	shared: {
		folder: "", // пустая строка = корень
		namespaces: ["header", "sidebar", "home"]
	}
};

// Утилитарные функции
export const getAllNamespaces = (): string[] => {
	return Object.values(TRANSLATION_BLOCKS).flatMap(
		(block) => block.namespaces
	);
};

export const getNamespacePath = (lng: string, ns: string): string => {
	for (const block of Object.values(TRANSLATION_BLOCKS)) {
		if (block.namespaces.includes(ns)) {
			return block.folder
				? `/locales/${lng}/${block.folder}/${ns}.json`
				: `/locales/${lng}/${ns}.json`;
		}
	}

	// Fallback для неизвестных namespace
	console.warn(`Unknown namespace: ${ns}, using root path`);
	return `/locales/${lng}/${ns}.json`;
};
