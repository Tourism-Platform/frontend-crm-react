import type { ENUM_CATALOG_TOUR_STATUS_TYPE } from "./catalog-tour-status.types";

export interface ICatalogTourFilters {
	search: string;
	status: ENUM_CATALOG_TOUR_STATUS_TYPE[];
	page: number;
	limit: number;
	filters?: IFilter;
}

interface IFilter {
	region?: string[];
	duration?: string[];
	language?: string[];
	category?: string[];
	price?: {
		from: number;
		to: number;
	};
}
