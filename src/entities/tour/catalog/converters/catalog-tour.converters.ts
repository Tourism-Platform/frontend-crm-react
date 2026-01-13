import { type IPaginationResponse } from "@/shared/types";

import type { ENUM_CATALOG_TOUR_STATUS_TYPE } from "../types";
import type {
	ICatalogTourBackend,
	ICatalogTourCard,
	ICatalogTourFilters,
	ICatalogTourInfo,
	ICatalogTourInfoBackend
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
	data: ICatalogTourBackend
): ICatalogTourCard => ({
	id: data.id,
	status: data.status as ENUM_CATALOG_TOUR_STATUS_TYPE,
	title: data.title,
	route: data.route,
	type: data.type,
	priceFrom: data.price_from,
	priceTo: data.price_to,
	imageUrl: data.image_url
});

export const mapCatalogTourListToFrontend = (
	data: ICatalogTourBackend[]
): ICatalogTourCard[] => data.map(mapCatalogTourToFrontend);

export const mapCatalogTourPaginatedToFrontend = (
	response: IPaginationResponse<ICatalogTourBackend>
): IPaginationResponse<ICatalogTourCard> => ({
	data: mapCatalogTourListToFrontend(response.data),
	total: response.total
});

export const mapCatalogTourFiltersToBackend = (
	filters: ICatalogTourFilters
) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined,
	region: filters.filters?.region?.join(",") || undefined,
	duration: filters.filters?.duration?.join(",") || undefined,
	language: filters.filters?.language?.join(",") || undefined,
	category: filters.filters?.category?.join(",") || undefined
});
