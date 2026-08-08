import { formatDate } from "@/shared/utils";

import type {
	IBookingOrderFilters,
	IOrder,
	TBookingOrderBackendResponse,
	TBookingOrderListItemBackend,
	TBookingOrderPaginatedQuery,
	TBookingOrderPaginatedResponse
} from "../types";

import { bookingClientTypeMapper } from "./booking-client-type.convert";
import { bookingTourTypeMapper } from "./booking-tour-type.convert";
import { orderStatusMapper } from "./order-status.convert";

export const mapBookingOrderListItemToFrontend = (
	data: TBookingOrderListItemBackend
): IOrder => ({
	orderId: data.id,
	orderNumber: data.order_number,
	orderType: bookingTourTypeMapper.from(data.tour_type)!,
	dateCreated: formatDate(data.created_at),
	client: data.client_name,
	clientType: bookingClientTypeMapper.from(data.client_type)!,
	pax: data.pax,
	dates: {
		from: formatDate(data.date),
		to: formatDate(data.end_date)
	},
	tourName: data.tour_name,
	status: orderStatusMapper.from(data.status)!
});

export const mapBookingOrderListToFrontend = (
	data: TBookingOrderListItemBackend[]
): IOrder[] => data.map(mapBookingOrderListItemToFrontend);

export const mapBookingOrderPaginatedToFrontend = (
	response: TBookingOrderBackendResponse
): TBookingOrderPaginatedResponse => ({
	data: response.data.map(mapBookingOrderListItemToFrontend),
	total: response.total_count
});

export const mapBookingOrderFiltersToBackend = (
	filters: IBookingOrderFilters
): TBookingOrderPaginatedQuery => ({
	booking_status: orderStatusMapper.to(filters.status?.[0]),
	tour_id: filters.tourId || null,
	q: filters.search || null,
	date_from: filters.dateFrom || null,
	date_to: filters.dateTo || null,
	skip: (filters.page - 1) * filters.limit,
	limit: filters.limit
});
