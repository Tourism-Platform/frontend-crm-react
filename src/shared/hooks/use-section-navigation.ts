import { useEffect } from "react";

import {
	TRANSLATION_BLOCKS,
	type TRouteSection,
	preloadNamespaces
} from "@/shared/config";

type TI18nBlockKey = keyof typeof TRANSLATION_BLOCKS;

const SECTION_I18N_BLOCKS: Partial<Record<TRouteSection, TI18nBlockKey>> = {
	finance: "finance",
	library: "library",
	"booking-operator": "booking",
	"booking-agency": "booking",
	"tour-detail": "tours",
	"tour-events": "events"
};

export const useSectionI18nPreload = (section: TRouteSection) => {
	useEffect(() => {
		const blockKey = SECTION_I18N_BLOCKS[section];
		if (!blockKey) return;

		void preloadNamespaces([...TRANSLATION_BLOCKS[blockKey].namespaces]);
	}, [section]);
};
