import type { ENUM_TOUR_CATEGORY_TYPE } from "../../tour";

export interface ICatalogTourFilters {
	search: string;
	page: number;
	limit: number;
	filters?: IFilter;
}

interface IFilter {
	region?: string[];
	duration?: string[];
	language?: string[];
	category?: ENUM_TOUR_CATEGORY_TYPE[];
	price?: {
		from: number;
		to: number;
	};
}
