import type { ENUM_LANGUAGES_TYPE } from "../../landing";
import type { ENUM_TOUR_CATEGORY_TYPE } from "../../tour";

import type { ENUM_CATALOG_DURATION_TYPE } from "./catalog-duration.types";
import type { ENUM_CATALOG_SORT_TYPE } from "./catalog-sort.types";

export interface ICatalogTourFilters {
	search: string;
	page: number;
	limit: number;
	sort?: ENUM_CATALOG_SORT_TYPE;
	/** Локаль i18next как есть (i18n.language) — в backend переводит converter */
	readLang?: string;
	filters?: IFilter;
}

interface IFilter {
	country?: string[];
	city?: string[];
	duration?: ENUM_CATALOG_DURATION_TYPE[];
	language?: ENUM_LANGUAGES_TYPE[];
	category?: ENUM_TOUR_CATEGORY_TYPE[];
	// price?: {
	// 	from: number;
	// 	to: number;
	// };
}
