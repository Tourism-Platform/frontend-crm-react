import { BOOKING_ORDER_PATHS } from "@/shared/api";
import { formatDate } from "@/shared/utils";

import {
	type IBookingOrderDetailBackend,
	type IBookingOrderFilters,
	type IOrder,
	type IOrderDetail,
	type TBookingOrderBackend,
	type TBookingOrderBackendResponse,
	type TBookingOrderListItemBackend,
	type TBookingOrderPaginatedResponse
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

export const mapBookingOrderToFrontend = (data: TBookingOrderBackend) =>
	mapBookingOrderListItemToFrontend(
		data as unknown as TBookingOrderListItemBackend
	);

export const mapBookingOrderDetailToFrontend = (
	data: IBookingOrderDetailBackend
): IOrderDetail => ({
	...(mapBookingOrderToFrontend(
		data as unknown as TBookingOrderBackend
	) as IOrderDetail)
	// duration: data.duration,
	// route: data.route,
	// comment: data.comment ?? undefined,
	// email: data.email,
	// phone: data.phone,
	// roomType: data.room_type ?? undefined,
	// carClass: data.car_class ?? undefined,
	// isAvailable: data.is_available,
	// report: data.report ?? undefined,
	// paxDetails: data.pax_details?.map((pax) => ({
	// 	...pax,
	// 	dateOfBirth: formatDate(pax.dateOfBirth),
	// 	expiredDate: formatDate(pax.expiredDate)
	// })),
	// tourReview: data.tour_review,
	// supplierPayments: data.supplier_payments ?? undefined,
	// tourSummary: data.tour_summary
});

export const mapBookingOrderToBackend = (
	data: Partial<IOrderDetail>
): Partial<IBookingOrderDetailBackend> => ({
	// order_id: data.orderId,
	// order_type: data.orderType,
	// date_created: data.dateCreated,
	// client: data.client,
	// client_type: data.clientType,
	// pax: data.pax,
	// dates: data.dates,
	// tour_name: data.tourName,
	duration: data.duration,
	route: data.route,
	comment: data.comment,
	email: data.email,
	phone: data.phone,
	room_type: data.roomType,
	car_class: data.carClass,
	is_available: data.isAvailable,
	// manager: data.manager,
	// invoice_status: data.invoiceStatus,
	report: data.report,
	status: orderStatusMapper.to(data.status!),
	pax_details: data.paxDetails,
	tour_review: data.tourReview,
	supplier_payments: data.supplierPayments,
	tour_summary: data.tourSummary
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
	// page: filters.page,
	// limit: filters.limit,
	// search: filters.search || undefined,
	// status: filters.status.length > 0 ? filters.status.join(",") : undefined
	booking_status: orderStatusMapper.to(filters.status[0]) || null
});
