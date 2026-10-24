import { createMockIdSequence } from "@/shared/api";

import {
	ENUM_BOOKING_CLIENT_TYPE_BACKEND,
	ENUM_ORDER_STATUS_BACKEND,
	type ENUM_ORDER_STATUS_BACKEND_TYPE,
	ENUM_ORDER_TRANSITION_BACKEND,
	type ENUM_ORDER_TRANSITION_BACKEND_TYPE,
	type TBookingCreateBackend,
	type TBookingModelBackend,
	type TBookingOrderClientDetailBackend,
	type TBookingOrderDetailBackend,
	type TBookingOrderListItemBackend,
	type TBookingOrderListResponseBackend,
	type TBookingOrderResponseBackend,
	type TBookingUpdateBackend
} from "../types";

import {
	MOCK_BOOKING_DEFAULTS,
	MOCK_OPERATOR_ID,
	MOCK_ORDER_AGENCY_TEMPLATE,
	MOCK_ORDER_USER_TEMPLATE,
	MOCK_TOUR_INFO_TEMPLATE
} from "./booking-order.mock.constants";
import {
	MOCK_OPERATOR_INFO,
	createBookingOrderMocks
} from "./booking-order.mock.factory";

const { listItems, detailsById } = createBookingOrderMocks();

/** Мутируются на месте: на массив ссылаются моки платежей */
export const bookingOrderListItems: TBookingOrderListItemBackend[] = listItems;
export const bookingOrderDetailStore = detailsById;

const bookingIds = createMockIdSequence("d100", 1);
let nextOrderNumber = 1;

export const detailToBookingModel = (
	detail: TBookingOrderDetailBackend
): TBookingModelBackend => ({ ...detail.order });

export const getBookingOrderDetail = (
	bookingId: string
): TBookingOrderDetailBackend | undefined =>
	bookingOrderDetailStore.get(bookingId);

export const getOperatorBookingOrderDetail = (
	bookingId: string
): TBookingOrderDetailBackend | undefined => getBookingOrderDetail(bookingId);

export const getClientBookingOrderDetail = (
	bookingId: string
): TBookingOrderClientDetailBackend | undefined => {
	const detail = getBookingOrderDetail(bookingId);
	if (!detail) return undefined;

	return {
		order: detail.order,
		tour: detail.tour,
		discount: null,
		operator: {
			id: detail.order.operator_id || MOCK_OPERATOR_ID,
			name: "Mock Operator",
			business_name: MOCK_ORDER_AGENCY_TEMPLATE.business_name,
			contact_person: MOCK_ORDER_AGENCY_TEMPLATE.contact_person,
			contact_position: MOCK_ORDER_AGENCY_TEMPLATE.contact_position,
			contact_email: MOCK_ORDER_AGENCY_TEMPLATE.contact_email,
			contact_phone: MOCK_ORDER_AGENCY_TEMPLATE.contact_phone,
			website_url: MOCK_ORDER_AGENCY_TEMPLATE.website_url,
			logo_url: MOCK_ORDER_AGENCY_TEMPLATE.logo_url
		}
	};
};

export interface IListBookingOrdersQuery {
	booking_status: string | null;
	q: string | null;
	skip: number;
	limit: number;
}

export const listBookingOrders = ({
	booking_status,
	q,
	skip,
	limit
}: IListBookingOrdersQuery): TBookingOrderListResponseBackend => {
	let filtered = [...bookingOrderListItems];

	if (booking_status) {
		filtered = filtered.filter((item) => item.status === booking_status);
	}

	if (q) {
		const query = q.toLowerCase();
		filtered = filtered.filter(
			(item) =>
				item.client_name.toLowerCase().includes(query) ||
				(item.tour_name ?? "").toLowerCase().includes(query) ||
				(item.order_number ?? "").toLowerCase().includes(query)
		);
	}

	const total_count = filtered.length;
	const data = filtered.slice(skip, skip + limit);

	return { total_count, data };
};

const resolveStatusAfterTransition = (
	current: ENUM_ORDER_STATUS_BACKEND_TYPE,
	transition: ENUM_ORDER_TRANSITION_BACKEND_TYPE
): ENUM_ORDER_STATUS_BACKEND_TYPE | null => {
	if (
		transition === ENUM_ORDER_TRANSITION_BACKEND.IN_PROCESSING &&
		current === ENUM_ORDER_STATUS_BACKEND.NEW
	) {
		return ENUM_ORDER_STATUS_BACKEND.IN_PROCESSING;
	}

	if (
		transition === ENUM_ORDER_TRANSITION_BACKEND.BOOKING &&
		current === ENUM_ORDER_STATUS_BACKEND.IN_PROCESSING
	) {
		return ENUM_ORDER_STATUS_BACKEND.BOOKING;
	}

	if (
		transition === ENUM_ORDER_TRANSITION_BACKEND.SUBMIT &&
		current === ENUM_ORDER_STATUS_BACKEND.DRAFT
	) {
		return ENUM_ORDER_STATUS_BACKEND.NEW;
	}

	if (
		transition === ENUM_ORDER_TRANSITION_BACKEND.IN_PROGRESS &&
		current === ENUM_ORDER_STATUS_BACKEND.BOOKING
	) {
		return ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS;
	}

	if (
		transition === ENUM_ORDER_TRANSITION_BACKEND.COMPLETED &&
		current === ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS
	) {
		return ENUM_ORDER_STATUS_BACKEND.COMPLETED;
	}

	return null;
};

/** Статус в детали и в строке списка меняются вместе */
const setBookingStatus = (
	detail: TBookingOrderDetailBackend,
	status: ENUM_ORDER_STATUS_BACKEND_TYPE
) => {
	detail.order.status = status;
	const listItem = bookingOrderListItems.find(
		(item) => item.id === detail.order.id
	);
	if (listItem) listItem.status = status;
};

export const transitionBookingStatusInStore = (
	bookingId: string,
	transition: ENUM_ORDER_TRANSITION_BACKEND_TYPE
): TBookingOrderResponseBackend | null => {
	const detail = bookingOrderDetailStore.get(bookingId);
	if (!detail) return null;

	const nextStatus = resolveStatusAfterTransition(
		detail.order.status,
		transition
	);
	if (!nextStatus) return null;

	setBookingStatus(detail, nextStatus);
	return detailToBookingModel(detail);
};

const addDays = (date: string, days: number) =>
	new Date(Date.parse(date) + days * 86_400_000).toISOString().slice(0, 10);

interface IBookingClient {
	agencyId: string | null;
	userId: string | null;
	name: string;
}

export const createBookingOrder = (
	body: TBookingCreateBackend,
	client: IBookingClient
): TBookingOrderResponseBackend => {
	const id = bookingIds.next();
	const orderNumber = `RQA-NEW-${String(100 + nextOrderNumber++)}`;
	const tour = MOCK_TOUR_INFO_TEMPLATE;
	const endDate = addDays(body.date, Math.max(tour.days - 1, 0));

	const order: TBookingOrderResponseBackend = {
		...MOCK_BOOKING_DEFAULTS,
		id,
		order_number: orderNumber,
		agency_id: client.agencyId,
		user_id: client.userId,
		tour_option_id: body.tour_option_id,
		date: body.date,
		end_date: endDate,
		pax: body.pax,
		status: ENUM_ORDER_STATUS_BACKEND.DRAFT,
		paid_amount: "0",
		tour_amount: String(body.pax * 850),
		cancelled_at: null,
		cancellation_reason: null,
		comment: body.comment ?? null
	};

	bookingOrderDetailStore.set(id, {
		order,
		tour,
		agency: client.agencyId
			? { ...MOCK_ORDER_AGENCY_TEMPLATE, id: client.agencyId }
			: null,
		user: client.agencyId ? null : MOCK_ORDER_USER_TEMPLATE
	});
	bookingOrderListItems.unshift({
		id,
		client_name: client.name,
		client_type: client.agencyId
			? ENUM_BOOKING_CLIENT_TYPE_BACKEND.AGENCY
			: ENUM_BOOKING_CLIENT_TYPE_BACKEND.TOURIST,
		tour_name: tour.title,
		tour_type: tour.typ,
		status: order.status,
		date: order.date,
		end_date: order.end_date,
		created_at: new Date().toISOString(),
		pax: order.pax,
		order_number: orderNumber,
		operator: MOCK_OPERATOR_INFO
	});
	return order;
};

export const updateBookingOrder = (
	bookingId: string,
	body: TBookingUpdateBackend
) => {
	const detail = getBookingOrderDetail(bookingId);
	if (!detail) return undefined;

	const { order } = detail;
	if (body.date) {
		order.date = body.date;
		order.end_date = addDays(body.date, Math.max(detail.tour.days - 1, 0));
	}
	if (body.pax) order.pax = body.pax;
	if (body.comment !== undefined) order.comment = body.comment;

	const listItem = bookingOrderListItems.find(
		(item) => item.id === bookingId
	);
	if (listItem) {
		Object.assign(listItem, {
			date: order.date,
			end_date: order.end_date,
			pax: order.pax
		});
	}
	return order;
};

/** Отмена клиентом или отклонение оператором */
export const closeBookingOrder = (
	bookingId: string,
	status:
		| typeof ENUM_ORDER_STATUS_BACKEND.CANCELLED
		| typeof ENUM_ORDER_STATUS_BACKEND.DECLINED,
	reason: string | null
) => {
	const detail = getBookingOrderDetail(bookingId);
	if (!detail) return undefined;

	setBookingStatus(detail, status);
	detail.order.cancelled_at = new Date().toISOString();
	detail.order.cancellation_reason = reason;
	return detail.order;
};

export const deleteBookingOrder = (bookingId: string) => {
	const index = bookingOrderListItems.findIndex(
		(item) => item.id === bookingId
	);
	if (index !== -1) bookingOrderListItems.splice(index, 1);
	return bookingOrderDetailStore.delete(bookingId);
};

export const resetBookingOrderStore = () => {
	const fresh = createBookingOrderMocks();
	bookingOrderListItems.splice(
		0,
		bookingOrderListItems.length,
		...fresh.listItems
	);
	bookingOrderDetailStore.clear();
	fresh.detailsById.forEach((detail, id) =>
		bookingOrderDetailStore.set(id, detail)
	);
	bookingIds.reset(1);
	nextOrderNumber = 1;
};
