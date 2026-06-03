import type { BookingOrderDetail } from "@/shared/api";
import { BOOKING_ORDER_PATHS } from "@/shared/api";
import { formatDate } from "@/shared/utils";

import {
	ENUM_CLIENT_TYPE_OPTIONS,
	type IBookingOrderFilters,
	type IOrder,
	type IOrderDetail,
	type IOrderTourInfo,
	type TBookingOrderBackend,
	type TBookingOrderBackendResponse,
	type TBookingOrderDetailBackend,
	type TBookingOrderListItemBackend,
	type TBookingOrderPaginatedResponse
} from "../types";

import { bookingClientTypeMapper } from "./booking-client-type.convert";
import { bookingTourTypeMapper } from "./booking-tour-type.convert";
import { orderStatusMapper } from "./order-status.convert";

const formatTourDuration = (days: number, nights: number): string =>
	`${days} days / ${nights} nights`;

const mapOrderTourInfo = (tour: BookingOrderDetail["tour"]): IOrderTourInfo => {
	const orderType = bookingTourTypeMapper.from(tour.typ)!;

	return {
		name: tour.name,
		type: orderType,
		days: tour.days,
		nights: tour.nights,
		route: tour.route?.join(" - ") ?? "-",
		duration: formatTourDuration(tour.days, tour.nights)
	};
};

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

export const mapBookingOrderToFrontend = (data: TBookingOrderBackend) =>
	mapBookingOrderListItemToFrontend(
		data as unknown as TBookingOrderListItemBackend
	);

export const mapBookingOrderDetailToFrontend = (
	data: TBookingOrderDetailBackend
): IOrderDetail => {
	const tour = mapOrderTourInfo(data.tour);

	return {
		orderId: data.id,
		orderNumber: data.id,
		orderType: tour.type,
		dateCreated: "",
		client: "",
		clientType: ENUM_CLIENT_TYPE_OPTIONS.AGENCY,
		pax: data.pax,
		dates: {
			from: formatDate(data.date),
			to: formatDate(data.end_date)
		},
		tourName: tour.name,
		status: orderStatusMapper.from(data.status)!,
		agencyId: data.agency_id,
		tourOptionId: data.tour_option_id,
		tour,
		duration: tour.duration,
		route: tour.route,
		comment: data.comment ?? undefined,
		tourAmount: data.tour_amount,
		paidAmount: data.paid_amount
	};
};

export const mapBookingOrderToBackend = (
	data: Partial<IOrderDetail>
): Partial<TBookingOrderDetailBackend> => ({
	comment: data.comment ?? null,
	status: data.status ? orderStatusMapper.to(data.status) : undefined
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
): typeof BOOKING_ORDER_PATHS.listMyBookings._types.query => ({
	booking_status: orderStatusMapper.to(filters.status[0]) || null
});
