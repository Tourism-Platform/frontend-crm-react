import { ENUM_TOUR_ORDER_STATUS } from "../types/order-status.types";
import { type ITourOrderBackend } from "../types/tour-order-backend.interface";

export const TOUR_ORDERS_MOCK_DATA: ITourOrderBackend[] = [
	{
		order_id: "OR-001",
		client: "John Doe",
		type: "Group",
		pax: 2,
		date_from: "2024-05-10",
		date_to: "2024-05-16",
		status: ENUM_TOUR_ORDER_STATUS.COMPLETED
	},
	{
		order_id: "OR-002",
		client: "Jane Smith",
		type: "Group",
		pax: 1,
		date_from: "2024-06-20",
		date_to: "2024-06-26",
		status: ENUM_TOUR_ORDER_STATUS.IN_PROGRESS
	},
	{
		order_id: "OR-003",
		client: "Alice Johnson",
		type: "Private",
		pax: 4,
		date_from: "2024-07-01",
		date_to: "2024-07-10",
		status: ENUM_TOUR_ORDER_STATUS.NEW
	},
	{
		order_id: "OR-004",
		client: "Bob Brown",
		type: "Group",
		pax: 5,
		date_from: "2024-08-15",
		date_to: "2024-08-22",
		status: ENUM_TOUR_ORDER_STATUS.BOOKING
	},
	{
		order_id: "OR-005",
		client: "Charlie Davis",
		type: "Private",
		pax: 2,
		date_from: "2024-09-01",
		date_to: "2024-09-07",
		status: ENUM_TOUR_ORDER_STATUS.IN_PROCESSING
	},
	{
		order_id: "OR-006",
		client: "Diana Evans",
		type: "Group",
		pax: 3,
		date_from: "2024-10-10",
		date_to: "2024-10-15",
		status: ENUM_TOUR_ORDER_STATUS.CANCELLED
	},
	{
		order_id: "OR-007",
		client: "Evan Foster",
		type: "Private",
		pax: 2,
		date_from: "2024-11-05",
		date_to: "2024-11-12",
		status: ENUM_TOUR_ORDER_STATUS.NEW
	},
	{
		order_id: "OR-008",
		client: "Fiona Green",
		type: "Group",
		pax: 6,
		date_from: "2024-12-01",
		date_to: "2024-12-10",
		status: ENUM_TOUR_ORDER_STATUS.IN_PROCESSING
	},
	{
		order_id: "OR-009",
		client: "George Harris",
		type: "Private",
		pax: 2,
		date_from: "2025-01-15",
		date_to: "2025-01-20",
		status: ENUM_TOUR_ORDER_STATUS.BOOKING
	},
	{
		order_id: "OR-010",
		client: "Hannah Irving",
		type: "Group",
		pax: 4,
		date_from: "2025-02-10",
		date_to: "2025-02-18",
		status: ENUM_TOUR_ORDER_STATUS.IN_PROGRESS
	},
	{
		order_id: "OR-011",
		client: "Ian Jones",
		type: "Private",
		pax: 2,
		date_from: "2025-03-01",
		date_to: "2025-03-08",
		status: ENUM_TOUR_ORDER_STATUS.COMPLETED
	}
];
