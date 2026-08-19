import {
	MOCK_EVENT_IDS,
	MOCK_TOUR_ID,
	MOCK_TOUR_OPTION_ID
} from "@/entities/booking/order/mock/booking-order.mock.constants";

import {
	ENUM_EVENT_BACKEND,
	type TGetTourSummaryBackendResponce,
	type TTourMinMaxCostBackend,
	type TTourSummaryEventBackend
} from "../types";

const costRange = (min: number, max: number): TTourMinMaxCostBackend => ({
	min: { val: min },
	max: { val: max }
});

const MOCK_EVENTS: TTourSummaryEventBackend[] = [
	{
		event_id: "event_1",
		typ: "individual_bill",
		event: {
			typ: ENUM_EVENT_BACKEND.FLIGHT,
			name: "International Flight: London - Tashkent",
			supplier_id: "Emirates",
			day: 1,
			position: 1,
			details: null
		},
		cost: costRange(1000, 1200),
		markup: costRange(100, 150),
		fees: costRange(0, 0)
	},
	{
		event_id: "event_2",
		typ: "individual_bill",
		event: {
			typ: ENUM_EVENT_BACKEND.OPTIONS,
			day: 2,
			position: 1,
			details: [
				{
					typ: ENUM_EVENT_BACKEND.HOUSING,
					name: "Central Hotel",
					supplier_id: "Central Group",
					details: null
				},
				{
					typ: ENUM_EVENT_BACKEND.HOUSING,
					name: "Hyatt Regency",
					supplier_id: "Hyatt Group",
					details: null
				}
			]
		},
		cost: costRange(800, 1200),
		markup: costRange(80, 120),
		fees: costRange(0, 0)
	},
	{
		event_id: "event_3",
		typ: "individual_bill",
		event: {
			typ: ENUM_EVENT_BACKEND.ACTIVITY,
			name: "City Sightseeing Tour",
			supplier_id: "Local Tours LLC",
			day: 3,
			position: 1,
			details: null
		},
		cost: costRange(250, 300),
		markup: costRange(40, 50),
		fees: costRange(0, 0)
	},
	{
		typ: "package_bill",
		package: {
			id: "package_1",
			name: "City Transfer Package"
		},
		events: [
			{
				event_id: "event_4",
				event: {
					typ: ENUM_EVENT_BACKEND.TRANSFER,
					name: "Airport Transfer",
					supplier_id: "Transfer Co",
					day: 1,
					position: 2,
					details: null
				}
			},
			{
				event_id: "event_5",
				event: {
					typ: ENUM_EVENT_BACKEND.OPTIONS,
					day: 4,
					position: 1,
					details: [
						{
							typ: ENUM_EVENT_BACKEND.ACTIVITY,
							name: "Museum Tour",
							supplier_id: "Museums LLC",
							details: null
						},
						{
							typ: ENUM_EVENT_BACKEND.ACTIVITY,
							name: "Walking Tour",
							supplier_id: "Walks LLC",
							details: null
						}
					]
				}
			}
		],
		cost: costRange(400, 500),
		markup: costRange(40, 50),
		fees: costRange(0, 0)
	}
];

const MOCK_COST_TOTAL = costRange(2450, 3200);
const MOCK_MARKUP_TOTAL = costRange(260, 370);

export const TOUR_SUMMARY_MOCK: TGetTourSummaryBackendResponce = {
	id: MOCK_TOUR_OPTION_ID,
	events: MOCK_EVENTS,
	estimated_cost: MOCK_COST_TOTAL,
	estimated_profit: MOCK_MARKUP_TOTAL,
	estimated_revenue: costRange(2710, 3570)
};

export const isTourSummaryMockPair = (
	tourId: string,
	optionId: string
): boolean => tourId === MOCK_TOUR_ID && optionId === MOCK_TOUR_OPTION_ID;

export { MOCK_EVENT_IDS };
