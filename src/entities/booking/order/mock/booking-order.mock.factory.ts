import {
	ENUM_TOUR_TYPE_BACKEND,
	type ENUM_TOUR_TYPE_BACKEND_TYPE
} from "@/entities/tour/tour/types/tour-backend-enum.types";

import {
	ENUM_BOOKING_CLIENT_TYPE_BACKEND,
	type ENUM_BOOKING_CLIENT_TYPE_BACKEND_TYPE,
	ENUM_ORDER_STATUS_BACKEND,
	type ENUM_ORDER_STATUS_BACKEND_TYPE,
	type TBookingOrderDetailBackend,
	type TBookingOrderListItemBackend,
	type TBookingOrderResponseBackend,
	type TOrderOperatorInfoBackend
} from "../types";

import {
	MOCK_AGENCY_ID,
	MOCK_BOOKING_DEFAULTS,
	MOCK_CLIENT_NAMES,
	MOCK_OPERATOR_ID,
	MOCK_ORDER_AGENCY_TEMPLATE,
	MOCK_ORDER_USER_TEMPLATE,
	MOCK_TOUR_INFO_TEMPLATE,
	MOCK_TOUR_NAMES,
	buildBookingUuid
} from "./booking-order.mock.constants";

const STATUS_ROWS: {
	status: ENUM_ORDER_STATUS_BACKEND_TYPE;
	label: string;
	clientType: ENUM_BOOKING_CLIENT_TYPE_BACKEND_TYPE;
	tourType: ENUM_TOUR_TYPE_BACKEND_TYPE;
}[] = [
	{
		status: ENUM_ORDER_STATUS_BACKEND.NEW,
		label: "NEW",
		clientType: ENUM_BOOKING_CLIENT_TYPE_BACKEND.AGENCY,
		tourType: ENUM_TOUR_TYPE_BACKEND.REGULAR
	},
	{
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROCESSING,
		label: "PROC",
		clientType: ENUM_BOOKING_CLIENT_TYPE_BACKEND.TOURIST,
		tourType: ENUM_TOUR_TYPE_BACKEND.REGULAR
	},
	{
		status: ENUM_ORDER_STATUS_BACKEND.BOOKING,
		label: "BOOK",
		clientType: ENUM_BOOKING_CLIENT_TYPE_BACKEND.AGENCY,
		tourType: ENUM_TOUR_TYPE_BACKEND.CUSTOM
	},
	{
		status: ENUM_ORDER_STATUS_BACKEND.IN_PROGRESS,
		label: "PROG",
		clientType: ENUM_BOOKING_CLIENT_TYPE_BACKEND.TOURIST,
		tourType: ENUM_TOUR_TYPE_BACKEND.REGULAR
	},
	{
		status: ENUM_ORDER_STATUS_BACKEND.COMPLETED,
		label: "DONE",
		clientType: ENUM_BOOKING_CLIENT_TYPE_BACKEND.TOURIST,
		tourType: ENUM_TOUR_TYPE_BACKEND.CUSTOM
	},
	{
		status: ENUM_ORDER_STATUS_BACKEND.CANCELLED,
		label: "CNCL",
		clientType: ENUM_BOOKING_CLIENT_TYPE_BACKEND.AGENCY,
		tourType: ENUM_TOUR_TYPE_BACKEND.REGULAR
	}
];

const padOrderNum = (n: number) => String(n).padStart(2, "0");

const buildDates = (statusIndex: number, orderIndex: number) => {
	const month = String(
		((statusIndex + 1) * 2 + orderIndex) % 12 || 12
	).padStart(2, "0");
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
		statusIndex === 4
			? 1
			: statusIndex === 5
				? 0
				: statusIndex >= 2
					? 0.6
					: 0;
	const paid = Math.round(base * paidRatio);
	return {
		tour_amount: String(base),
		paid_amount: String(paid)
	};
};

export const MOCK_OPERATOR_INFO: TOrderOperatorInfoBackend = {
	id: MOCK_OPERATOR_ID,
	name: "Mock Operator",
	business_name: "Mock Operator LLC",
	contact_person: "Alex Operator",
	contact_position: "Manager",
	contact_email: "operator@example.com",
	contact_phone: "+998901112233",
	website_url: null,
	logo_url: null
};

export interface IBookingOrderMockBundle {
	listItems: TBookingOrderListItemBackend[];
	detailsById: Map<string, TBookingOrderDetailBackend>;
}

export const createBookingOrderMocks = (): IBookingOrderMockBundle => {
	const listItems: TBookingOrderListItemBackend[] = [];
	const detailsById = new Map<string, TBookingOrderDetailBackend>();

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
				MOCK_TOUR_NAMES[
					(statusIndex + orderIndex - 1) % MOCK_TOUR_NAMES.length
				];
			const orderNumber = `RQA-${row.label}-${padOrderNum(orderIndex)}`;
			const createdMonth = String(statusIndex + 6).padStart(2, "0");
			const pax = 2 + orderIndex;
			const isAgencyClient =
				row.clientType === ENUM_BOOKING_CLIENT_TYPE_BACKEND.AGENCY;

			const listItem: TBookingOrderListItemBackend = {
				id,
				client_name: clientName,
				client_type: row.clientType,
				tour_name: tourName,
				tour_type: row.tourType,
				status: row.status,
				date: dates.date,
				end_date: dates.end_date,
				created_at: `2025-${createdMonth}-${padOrderNum(orderIndex)}T10:00:00Z`,
				pax,
				order_number: orderNumber,
				operator: MOCK_OPERATOR_INFO
			};

			const order: TBookingOrderResponseBackend = {
				...MOCK_BOOKING_DEFAULTS,
				id,
				order_number: orderNumber,
				...dates,
				pax,
				status: row.status,
				...amounts,
				agency_id: isAgencyClient ? MOCK_AGENCY_ID : null,
				user_id: isAgencyClient ? null : MOCK_BOOKING_DEFAULTS.user_id,
				comment:
					row.status === ENUM_ORDER_STATUS_BACKEND.CANCELLED
						? null
						: `Mock comment for ${orderNumber}`,
				cancelled_at:
					row.status === ENUM_ORDER_STATUS_BACKEND.CANCELLED
						? `2025-${createdMonth}-${padOrderNum(orderIndex)}T16:00:00Z`
						: null,
				cancellation_reason:
					row.status === ENUM_ORDER_STATUS_BACKEND.CANCELLED
						? "Cancelled by client request (mock)."
						: null
			};

			const detail: TBookingOrderDetailBackend = {
				order,
				tour: {
					...MOCK_TOUR_INFO_TEMPLATE,
					title: tourName,
					typ: row.tourType
				},
				agency: isAgencyClient
					? {
							...MOCK_ORDER_AGENCY_TEMPLATE,
							id: MOCK_AGENCY_ID,
							name: clientName,
							contact_person: clientName
						}
					: null,
				user: isAgencyClient
					? null
					: {
							...MOCK_ORDER_USER_TEMPLATE,
							first_name: clientName.split(" ")[0] ?? "John",
							last_name:
								clientName.split(" ").slice(1).join(" ") ||
								"Doe"
						}
			};

			listItems.push(listItem);
			detailsById.set(id, detail);
		}
	});

	return { listItems, detailsById };
};
