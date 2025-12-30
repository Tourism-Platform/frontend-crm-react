import { type IPaginationResponse } from "@/shared/types";

import type { ITourBackend, ITourCard, ITourFilters } from "../types";
import type { ENUM_TOUR_STATUS_TYPE } from "../constants";

export const mapTourToFrontend = (data: ITourBackend): ITourCard => ({
	id: data.id,
	status: data.status as ENUM_TOUR_STATUS_TYPE,
	title: data.title,
	route: data.route,
	type: data.type,
	price_from: data.price_from,
	price_to: data.price_to,
	image_url: data.image_url
});

export const mapTourToBackend = (
	data: Partial<ITourCard>
): Partial<ITourBackend> => ({
	id: data.id,
	status: data.status,
	title: data.title,
	route: data.route,
	type: data.type,
	price_from: data.price_from,
	price_to: data.price_to,
	image_url: data.image_url
});

export const mapTourListToFrontend = (data: ITourBackend[]): ITourCard[] =>
	data.map(mapTourToFrontend);

export const mapTourPaginatedToFrontend = (
	response: IPaginationResponse<ITourBackend>
): IPaginationResponse<ITourCard> => ({
	data: mapTourListToFrontend(response.data),
	total: response.total
});

export const mapTourFiltersToBackend = (filters: ITourFilters) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined
});
