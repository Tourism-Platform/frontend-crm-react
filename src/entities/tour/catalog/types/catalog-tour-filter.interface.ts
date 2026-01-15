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
	category?: string[];
	price?: {
		from: number;
		to: number;
	};
}
