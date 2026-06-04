import {
	BookingStatus,
	BookingTransition,
	type BookingModel,
	type BookingOrderDetail,
	type BookingOrderListItem,
	type BookingOrderListResponse
} from "@/shared/api";

import { createBookingOrderMocks } from "./booking-order.mock.factory";

const { listItems, detailsById } = createBookingOrderMocks();

export const bookingOrderListItems: BookingOrderListItem[] = listItems;
export const bookingOrderDetailStore = detailsById;

export const detailToBookingModel = (detail: BookingOrderDetail): BookingModel => ({
	id: detail.id,
	agency_id: detail.agency_id,
	operator_id: detail.operator_id,
	tour_option_id: detail.tour_option_id,
	snapshot_id: detail.snapshot_id ?? null,
	date: detail.date,
	end_date: detail.end_date,
	pax: detail.pax,
	status: detail.status,
	paid_amount: detail.paid_amount,
	paid_currency: detail.paid_currency,
	tour_amount: detail.tour_amount,
	tour_currency: detail.tour_currency,
	fx_rate_id: detail.fx_rate_id ?? null,
	fx_rate_applied: detail.fx_rate_applied ?? null,
	agreed_price: detail.agreed_price ?? null,
	cancelled_at: detail.cancelled_at ?? null,
	cancellation_reason: detail.cancellation_reason ?? null,
	comment: detail.comment ?? null,
	voucher_path: detail.voucher_path ?? null
});

export const getBookingOrderDetail = (
	bookingId: string
): BookingOrderDetail | undefined => bookingOrderDetailStore.get(bookingId);

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

	if (transition === BookingTransition.Submit && current === BookingStatus.Draft) {
		return BookingStatus.New;
	}

	return null;
};

export const transitionBookingStatusInStore = (
	bookingId: string,
	transition: BookingTransition
): BookingModel | null => {
	const detail = bookingOrderDetailStore.get(bookingId);
	if (!detail) return null;

	const nextStatus = resolveStatusAfterTransition(detail.status, transition);
	if (!nextStatus) return null;

	detail.status = nextStatus;

	const listItem = bookingOrderListItems.find((item) => item.id === bookingId);
	if (listItem) {
		listItem.status = nextStatus;
	}

	return detailToBookingModel(detail);
};
