import type { ENUM_LANGUAGES_TYPE } from "../../landing";
import type { ENUM_TOUR_CATEGORY_TYPE } from "../../tour";

import type { ENUM_CATALOG_DURATION_TYPE } from "./catalog-duration.types";

export interface ICatalogTourFilters {
	search: string;
	page: number;
	limit: number;
	filters?: IFilter;
}

interface IFilter {
	region?: string[];
	duration?: ENUM_CATALOG_DURATION_TYPE[];
	language?: ENUM_LANGUAGES_TYPE[];
	category?: ENUM_TOUR_CATEGORY_TYPE[];
	price?: {
		from: number;
		to: number;
	};
}
