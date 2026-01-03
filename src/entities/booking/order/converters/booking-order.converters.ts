import { type IPaginationResponse } from "@/shared/types";
import { formatDate } from "@/shared/utils";

import {
	type ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	type ENUM_INVOICE_STATUS_TYPE,
	type ENUM_ORDER_STATUS_TYPE,
	type ENUM_ORDER_TYPE_OPTIONS_TYPE,
	type IBookingOrderBackend,
	type IBookingOrderFilters,
	type IOrder
} from "../types";

export const mapBookingOrderToFrontend = (
	data: IBookingOrderBackend
): IOrder => ({
	orderId: data.order_id,
	orderType: data.order_type as ENUM_ORDER_TYPE_OPTIONS_TYPE,
	dateCreated: formatDate(data.date_created),
	client: data.client,
	clientType: data.client_type as ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	pax: data.pax,
	dates: {
		from: formatDate(data.dates.from),
		to: formatDate(data.dates.to)
	},
	tourName: data.tour_name,
	duration: data.duration,
	route: data.route,
	comment: data.comment ?? undefined,
	email: data.email,
	phone: data.phone,
	roomType: data.room_type ?? undefined,
	carClass: data.car_class ?? undefined,
	isAvailable: data.is_available,
	manager: data.manager ?? undefined,
	invoiceStatus:
		(data.invoice_status as ENUM_INVOICE_STATUS_TYPE) || undefined,
	report: data.report ?? undefined,
	status: data.status as ENUM_ORDER_STATUS_TYPE,
	paxDetails: data.pax_details ?? undefined,
	tourReview: data.tour_review,
	supplierPayments: data.supplier_payments ?? undefined,
	tourSummary: data.tour_summary
});

export const mapBookingOrderToBackend = (
	data: Partial<IOrder>
): Partial<IBookingOrderBackend> => ({
	order_id: data.orderId,
	order_type: data.orderType,
	date_created: data.dateCreated,
	client: data.client,
	client_type: data.clientType,
	pax: data.pax,
	dates: data.dates,
	tour_name: data.tourName,
	duration: data.duration,
	route: data.route,
	comment: data.comment,
	email: data.email,
	phone: data.phone,
	room_type: data.roomType,
	car_class: data.carClass,
	is_available: data.isAvailable,
	manager: data.manager,
	invoice_status: data.invoiceStatus,
	report: data.report,
	status: data.status,
	pax_details: data.paxDetails,
	tour_review: data.tourReview,
	supplier_payments: data.supplierPayments,
	tour_summary: data.tourSummary
});

export const mapBookingOrderListToFrontend = (
	data: IBookingOrderBackend[]
): IOrder[] => data.map(mapBookingOrderToFrontend);

export const mapBookingOrderPaginatedToFrontend = (
	response: IPaginationResponse<IBookingOrderBackend>
): IPaginationResponse<IOrder> => ({
	data: mapBookingOrderListToFrontend(response.data),
	total: response.total
});

export const mapBookingOrderFiltersToBackend = (
	filters: IBookingOrderFilters
) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined
});
