import {
	type AnyEventWithCostOutput,
	Currency,
	type TourMinMaxCostSchemaOutput,
	type TourSummaryResponse
} from "@/shared/api";

import {
	MOCK_EVENT_IDS,
	MOCK_TOUR_ID,
	MOCK_TOUR_OPTION_ID
} from "@/entities/booking/order/mock/booking-order.mock.constants";

const costRange = (min: number, max: number): TourMinMaxCostSchemaOutput => ({
	min: { val: min, currency: Currency.USD },
	max: { val: max, currency: Currency.USD }
});

const MOCK_EVENTS: AnyEventWithCostOutput[] = [
	{
		event: {
			typ: "1",
			name: "International Flight: London - Tashkent",
			supplier_id: "Emirates",
			day: 1,
			position: 1,
			details: null
		},
		cost: costRange(1000, 1200),
		markup: costRange(100, 150)
	},
	{
		event: {
			typ: "8",
			name: "Hotel Selection: Tashkent",
			supplier_id: null,
			day: 2,
			position: 1,
			details: [
				{
					typ: "5",
					name: "Central Hotel",
					supplier_id: "Central Group",
					day: 2,
					position: 1,
					details: null
				},
				{
					typ: "5",
					name: "Hyatt Regency",
					supplier_id: "Hyatt Group",
					day: 2,
					position: 1,
					details: null
				}
			]
		},
		cost: costRange(800, 1200),
		markup: costRange(80, 120)
	},
	{
		event: {
			typ: "6",
			name: "City Sightseeing Tour",
			supplier_id: "Local Tours LLC",
			day: 3,
			position: 1,
			details: null
		},
		cost: costRange(250, 300),
		markup: costRange(40, 50)
	}
];

const MOCK_COST_TOTAL = costRange(2050, 2700);
const MOCK_MARKUP_TOTAL = costRange(220, 320);

export const TOUR_SUMMARY_MOCK: TourSummaryResponse = {
	id: MOCK_TOUR_OPTION_ID,
	events: MOCK_EVENTS,
	cost: MOCK_COST_TOTAL,
	markup: MOCK_MARKUP_TOTAL,
	profit_tax: costRange(0, 0),
	vat: costRange(0, 0),
	fees: costRange(0, 0),
	total: costRange(2270, 3020)
};

export const isTourSummaryMockPair = (
	tourId: string,
	optionId: string
): boolean => tourId === MOCK_TOUR_ID && optionId === MOCK_TOUR_OPTION_ID;

export { MOCK_EVENT_IDS };
