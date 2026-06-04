import {
	BookingClientType,
	BookingStatus,
	type BookingOrderDetail,
	type BookingOrderListItem,
	TourType
} from "@/shared/api";

import {
	MOCK_BOOKING_DEFAULTS,
	MOCK_CLIENT_NAMES,
	MOCK_TOUR_INFO_TEMPLATE,
	MOCK_TOUR_NAMES,
	buildBookingUuid
} from "./booking-order.mock.constants";

const STATUS_ROWS: {
	status: BookingStatus;
	label: string;
	clientType: BookingClientType;
	tourType: TourType;
}[] = [
	{
		status: BookingStatus.New,
		label: "NEW",
		clientType: BookingClientType.Agency,
		tourType: TourType.Regular
	},
	{
		status: BookingStatus.Pending,
		label: "PROC",
		clientType: BookingClientType.Tourist,
		tourType: TourType.Regular
	},
	{
		status: BookingStatus.Confirmed,
		label: "BOOK",
		clientType: BookingClientType.Agency,
		tourType: TourType.Custom
	},
	{
		status: BookingStatus.InProgress,
		label: "PROG",
		clientType: BookingClientType.Tourist,
		tourType: TourType.Regular
	},
	{
		status: BookingStatus.Completed,
		label: "DONE",
		clientType: BookingClientType.Tourist,
		tourType: TourType.Custom
	},
	{
		status: BookingStatus.Cancelled,
		label: "CNCL",
		clientType: BookingClientType.Agency,
		tourType: TourType.Regular
	}
];

const padOrderNum = (n: number) => String(n).padStart(2, "0");

const buildDates = (statusIndex: number, orderIndex: number) => {
	const month = String(((statusIndex + 1) * 2 + orderIndex) % 12 || 12).padStart(
		2,
		"0"
	);
	const startDay = String(5 + orderIndex).padStart(2, "0");
	const endDay = String(12 + orderIndex).padStart(2, "0");
	return {
		date: `2025-${month}-${startDay}`,
		end_date: `2025-${month}-${endDay}`
	};
};

const buildAmounts = (statusIndex: number, orderIndex: number) => {
	const base = (statusIndex + 1) * 2500 + orderIndex * 500;
	const paidRatio =
		statusIndex === 4 ? 1 : statusIndex === 5 ? 0 : statusIndex >= 2 ? 0.6 : 0;
	const paid = Math.round(base * paidRatio);
	return {
		tour_amount: String(base),
		paid_amount: String(paid)
	};
};

export interface IBookingOrderMockBundle {
	listItems: BookingOrderListItem[];
	detailsById: Map<string, BookingOrderDetail>;
}

export const createBookingOrderMocks = (): IBookingOrderMockBundle => {
	const listItems: BookingOrderListItem[] = [];
	const detailsById = new Map<string, BookingOrderDetail>();

	STATUS_ROWS.forEach((row, statusIndex) => {
		for (let orderIndex = 1; orderIndex <= 5; orderIndex += 1) {
			const id = buildBookingUuid(statusIndex, orderIndex);
			const dates = buildDates(statusIndex, orderIndex);
			const amounts = buildAmounts(statusIndex, orderIndex);
			const clientName =
				MOCK_CLIENT_NAMES[
					(statusIndex + orderIndex - 1) % MOCK_CLIENT_NAMES.length
				];
			const tourName =
				MOCK_TOUR_NAMES[(statusIndex + orderIndex - 1) % MOCK_TOUR_NAMES.length];
			const orderNumber = `RQA-${row.label}-${padOrderNum(orderIndex)}`;
			const createdMonth = String(statusIndex + 6).padStart(2, "0");

			const listItem: BookingOrderListItem = {
				id,
				client_name: clientName,
				tour_name: tourName,
				tour_type: row.tourType,
				status: row.status,
				date: dates.date,
				end_date: dates.end_date,
				created_at: `2025-${createdMonth}-${padOrderNum(orderIndex)}T10:00:00Z`,
				pax: 2 + orderIndex,
				order_number: orderNumber,
				client_type: row.clientType
			};

			const detail: BookingOrderDetail = {
				...MOCK_BOOKING_DEFAULTS,
				id,
				...dates,
				pax: listItem.pax,
				status: row.status,
				...amounts,
				comment:
					row.status === BookingStatus.Cancelled
						? null
						: `Mock comment for ${orderNumber}`,
				cancelled_at:
					row.status === BookingStatus.Cancelled
						? `2025-${createdMonth}-${padOrderNum(orderIndex)}T16:00:00Z`
						: null,
				cancellation_reason:
					row.status === BookingStatus.Cancelled
						? "Cancelled by client request (mock)."
						: null,
				tour: {
					...MOCK_TOUR_INFO_TEMPLATE,
					name: tourName,
					typ: row.tourType
				}
			};

			listItems.push(listItem);
			detailsById.set(id, detail);
		}
	});

	return { listItems, detailsById };
};
