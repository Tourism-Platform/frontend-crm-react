import {
	type BookingOrderClientDetail,
	type BookingOrderDetail,
	type BookingOrderListResponse,
	type BookingOrderResponse,
	BookingStatus,
	BookingTransition
} from "@/shared/api";

import type {
	TBookingModelBackend,
	TBookingOrderListItemBackend
} from "../types";

import {
	MOCK_OPERATOR_ID,
	MOCK_ORDER_AGENCY_TEMPLATE
} from "./booking-order.mock.constants";
import { createBookingOrderMocks } from "./booking-order.mock.factory";

const { listItems, detailsById } = createBookingOrderMocks();

export const bookingOrderListItems: TBookingOrderListItemBackend[] = listItems;
export const bookingOrderDetailStore = detailsById;

export const detailToBookingModel = (
	detail: BookingOrderDetail
): TBookingModelBackend => ({ ...detail.order });

export const getBookingOrderDetail = (
	bookingId: string
): BookingOrderDetail | undefined => bookingOrderDetailStore.get(bookingId);

export const getOperatorBookingOrderDetail = (
	bookingId: string
): BookingOrderDetail | undefined => getBookingOrderDetail(bookingId);

export const getClientBookingOrderDetail = (
	bookingId: string
): BookingOrderClientDetail | undefined => {
	const detail = getBookingOrderDetail(bookingId);
	if (!detail) return undefined;

	return {
		order: detail.order,
		tour: detail.tour,
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
}: IListBookingOrdersQuery): BookingOrderListResponse => {
	let filtered = [...bookingOrderListItems];

	if (booking_status) {
		filtered = filtered.filter((item) => item.status === booking_status);
	}

	if (q) {
		const query = q.toLowerCase();
		filtered = filtered.filter(
			(item) =>
				item.client_name.toLowerCase().includes(query) ||
				item.tour_name.toLowerCase().includes(query) ||
				item.order_number.toLowerCase().includes(query)
		);
	}

	const total_count = filtered.length;
	const data = filtered.slice(skip, skip + limit);

	return { total_count, data };
};

const resolveStatusAfterTransition = (
	current: BookingStatus,
	transition: BookingTransition
): BookingStatus | null => {
	if (
		transition === BookingTransition.MoveToPending &&
		current === BookingStatus.New
	) {
		return BookingStatus.Pending;
	}

	if (
		transition === BookingTransition.MoveToConfirmed &&
		current === BookingStatus.Pending
	) {
		return BookingStatus.Confirmed;
	}

	if (
		transition === BookingTransition.Submit &&
		current === BookingStatus.Draft
	) {
		return BookingStatus.New;
	}

	return null;
};

export const transitionBookingStatusInStore = (
	bookingId: string,
	transition: BookingTransition
): BookingOrderResponse | null => {
	const detail = bookingOrderDetailStore.get(bookingId);
	if (!detail) return null;

	const nextStatus = resolveStatusAfterTransition(
		detail.order.status,
		transition
	);
	if (!nextStatus) return null;

	detail.order.status = nextStatus;

	const listItem = bookingOrderListItems.find(
		(item) => item.id === bookingId
	);
	if (listItem) {
		listItem.status = nextStatus;
	}

	return detailToBookingModel(detail);
};
