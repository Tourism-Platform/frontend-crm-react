// import { formatDate } from "@/shared/utils";
import { BOOKING_ORDER_PATHS } from "@/shared/api";

import {
	// type ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	// type ENUM_INVOICE_STATUS_TYPE,
	// type ENUM_ORDER_STATUS_TYPE,
	// type ENUM_ORDER_TYPE_OPTIONS_TYPE,
	type IBookingOrderDetailBackend,
	type IBookingOrderFilters,
	type IOrder,
	type IOrderDetail,
	type TBookingOrderBackend,
	type TBookingOrderBackendResponse,
	type TBookingOrderPaginatedResponse
} from "../types";

import { orderStatusMapper } from "./order-status.convert";

export const mapBookingOrderToFrontend = (data: TBookingOrderBackend) => ({
	// ): IOrder => ({

	orderId: data.id
	// orderType: data.order_type as ENUM_ORDER_TYPE_OPTIONS_TYPE,
	// dateCreated: formatDate(data.date_created),
	// client: data.client,
	// clientType: data.client_type as ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	// pax: data.pax,
	// dates: {
	// 	from: formatDate(data.dates.from),
	// 	to: formatDate(data.dates.to)
	// },
	// tourName: data.tour_name,
	// manager: data.manager ?? undefined,
	// invoiceStatus:
	// 	(data.invoice_status as ENUM_INVOICE_STATUS_TYPE) || undefined,
	// status: data.status as ENUM_ORDER_STATUS_TYPE
});

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
	data: TBookingOrderBackend[]
): IOrder[] => data as unknown as IOrder[];
// ): IOrder[] => data.map(mapBookingOrderToFrontend);

export const mapBookingOrderPaginatedToFrontend = (
	response: TBookingOrderBackendResponse
): TBookingOrderPaginatedResponse => ({
	data: mapBookingOrderListToFrontend(response),
	total: response.length
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
