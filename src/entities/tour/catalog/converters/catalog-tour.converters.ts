import { type IPaginationResponse } from "@/shared/types";

import { tourCategoriesMapper } from "../../tour";
import type { TCatalogTourQueryBackend } from "../types";
import type {
	ICatalogTourCard,
	ICatalogTourFilters,
	ICatalogTourInfo,
	ICatalogTourInfoBackend,
	TCatalogTourBackend,
	TListCatalogToursBackendResponse
} from "../types";

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
		region: filters.filters.region[0]
	}),
	...(!!filters?.search?.trim().length && { q: filters.search })
});

export const mapCatalogTourFiltersToBackend = (
	filters: ICatalogTourFilters
) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	region: filters.filters?.region?.join(",") || undefined,
	duration: filters.filters?.duration?.join(",") || undefined,
	language: filters.filters?.language?.join(",") || undefined,
	category: filters.filters?.category?.join(",") || undefined
});
