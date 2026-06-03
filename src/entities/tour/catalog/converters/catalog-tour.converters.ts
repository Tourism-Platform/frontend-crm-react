import { type IPaginationResponse } from "@/shared/types";

import { languageMapper } from "../../landing";
import { tourCategoriesMapper } from "../../tour";
import { CATALOG_DURATION_PRESETS } from "../config";
import type {
	ENUM_CATALOG_DURATION_TYPE,
	TCatalogTourQueryBackend
} from "../types";
import type {
	ICatalogTourCard,
	ICatalogTourFilters,
	ICatalogTourInfo,
	ICatalogTourInfoBackend,
	TCatalogTourBackend,
	TListCatalogToursBackendResponse
} from "../types";

const mapDurationFiltersToQuery = (
	selected: ENUM_CATALOG_DURATION_TYPE[] | undefined
): Pick<
	TCatalogTourQueryBackend,
	"duration_days_min" | "duration_days_max"
> => {
	if (!selected?.length) return {};

	const presets = selected.map((key) => CATALOG_DURATION_PRESETS[key]);

	return {
		duration_days_min: Math.min(...presets.map((p) => p.from)),
		duration_days_max: Math.max(...presets.map((p) => p.to))
	};
};

export const mapCatalogTourStatsToFrontend = (
	data: ICatalogTourInfoBackend
): ICatalogTourInfo => ({
	total: data.total,
	completed: data.completed,
	inProgress: data.in_progress,
	tourists: data.tourists,
	confirmedRevenue: data.confirmed_revenue,
	potentialRevenue: data.potential_revenue
});

export const mapCatalogTourToFrontend = (
	data: TCatalogTourBackend
): ICatalogTourCard => ({
	id: data.tour_id,
	title: data.name,
	description: data.description ?? "",
	duration: data.days,
	priceFrom: data.price_range?.min ?? 0,
	priceTo: data.price_range?.max ?? 0,
	imageUrl: data.cover_image_url ?? ""
});

export const mapCatalogTourPaginatedToFrontend = (
	response: TListCatalogToursBackendResponse
): IPaginationResponse<ICatalogTourCard> => ({
	data: response.map(mapCatalogTourToFrontend),
	total: response.length || 10
});

export const mapCatalogTourFiltersToPublicCatalogQuery = (
	filters: ICatalogTourFilters
): TCatalogTourQueryBackend => ({
	...(filters?.page > 1 && { skip: (filters.page - 1) * filters?.limit }),
	...(filters?.limit && { limit: filters.limit }),
	...(!!filters?.filters?.category?.length && {
		categories: tourCategoriesMapper.toMany(filters.filters.category)
	}),
	...(!!filters?.filters?.region?.length && {
		city: filters.filters.region[0]
	}),
	...(!!filters?.filters?.language?.length && {
		language: languageMapper.to(filters.filters.language[0])
	}),
	...mapDurationFiltersToQuery(filters?.filters?.duration),
	...(!!filters?.search?.trim().length && { q: filters.search })
});
