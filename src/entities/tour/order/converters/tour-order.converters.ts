import { formatDate } from "@/shared/utils";

import {
	type ITourOrder,
	type ITourOrderBackend,
	type ITourOrderFilters,
	type TTourOrderPaginatedResponse,
	type TTourOrderPaginatedResponseBackend
} from "../types";

export const mapTourOrderToFrontend = (
	data: ITourOrderBackend
): ITourOrder => ({
	orderId: data.order_id,
	client: data.client,
	type: data.type,
	pax: data.pax,
	dates: {
		from: formatDate(data.date_from),
		to: formatDate(data.date_to)
	},
	status: data.status
});

export const mapTourOrderListToFrontend = (
	data: ITourOrderBackend[]
): ITourOrder[] => data.map(mapTourOrderToFrontend);

export const mapTourOrderPaginatedToFrontend = (
	response: TTourOrderPaginatedResponseBackend
): TTourOrderPaginatedResponse => ({
	data: mapTourOrderListToFrontend(response.data),
	total: response.total
});

export const mapTourOrderFiltersToBackend = (filters: ITourOrderFilters) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined,
	tour_id: filters.tourId
});
