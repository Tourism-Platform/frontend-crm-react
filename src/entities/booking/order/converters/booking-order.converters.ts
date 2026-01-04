import { formatDate } from "@/shared/utils";

import {
	type ENUM_CLIENT_TYPE_OPTIONS_TYPE,
	type ENUM_INVOICE_STATUS_TYPE,
	type ENUM_ORDER_STATUS_TYPE,
	type ENUM_ORDER_TYPE_OPTIONS_TYPE,
	type IBookingOrderBackend,
	type IBookingOrderDetailBackend,
	type IBookingOrderFilters,
	type IOrder,
	type IOrderDetail,
	type TBookingOrderPaginatedResponse,
	type TBookingOrderPaginatedResponseBackend
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
	manager: data.manager ?? undefined,
	invoiceStatus:
		(data.invoice_status as ENUM_INVOICE_STATUS_TYPE) || undefined,
	status: data.status as ENUM_ORDER_STATUS_TYPE
});

export const mapBookingOrderDetailToFrontend = (
	data: IBookingOrderDetailBackend
): IOrderDetail => ({
	...mapBookingOrderToFrontend(data),
	duration: data.duration,
	route: data.route,
	comment: data.comment ?? undefined,
	email: data.email,
	phone: data.phone,
	roomType: data.room_type ?? undefined,
	carClass: data.car_class ?? undefined,
	isAvailable: data.is_available,
	report: data.report ?? undefined,
	paxDetails: data.pax_details?.map((pax) => ({
		...pax,
		dateOfBirth: formatDate(pax.dateOfBirth),
		expiredDate: formatDate(pax.expiredDate)
	})),
	tourReview: data.tour_review,
	supplierPayments: data.supplier_payments ?? undefined,
	tourSummary: data.tour_summary
});

export const mapBookingOrderToBackend = (
	data: Partial<IOrderDetail>
): Partial<IBookingOrderDetailBackend> => ({
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
	response: TBookingOrderPaginatedResponseBackend
): TBookingOrderPaginatedResponse => ({
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
