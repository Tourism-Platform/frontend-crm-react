import {
	type ActivityDetailsOutput,
	type FlightDetailsOutput,
	type GeneralVenueOutput,
	GeneralVenueOutputSubTypEnum,
	type HousingDetailsOutput,
	type TransferDetailsOutput
} from "@/shared/api";

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

const inlineSupply = { source: "inline", supplier_id: null } as const;

const flightDetails = (): FlightDetailsOutput => ({
	plan: {},
	supply: inlineSupply,
	spec: {
		pricing: "whole",
		images: [],
		name: null,
		legs: [],
		charge: {
			typ: "fixed",
			cost: { val: 0 },
			fees: null,
			extra_costs: [],
			markup: null
		},
		fares: []
	}
});

const housingDetails = (): HousingDetailsOutput => ({
	plan: {},
	supply: inlineSupply,
	spec: {
		pricing: "per_room",
		images: [],
		name: null,
		location: null,
		stars: null,
		typs: [],
		amenities: [],
		policy: null,
		categories: []
	}
});

const activityDetails = (): ActivityDetailsOutput => ({
	plan: {},
	supply: inlineSupply,
	// The generated spec union intersects the literal discriminant with the
	// native enum (`{ sub_typ: "sightseeing" } & GeneralVenueOutput`), which TS
	// reduces to never — a targeted cast is the only way to state a sub_typ.
	spec: {
		sub_typ: GeneralVenueOutputSubTypEnum.Sightseeing,
		images: [],
		name: null,
		location: null,
		offerings: []
	} as { sub_typ: "sightseeing" } & GeneralVenueOutput
});

const transferDetails = (): TransferDetailsOutput => ({
	plan: { typ: null, departure: null, arrival: null },
	supply: inlineSupply,
	spec: {
		pricing: "whole",
		images: [],
		name: null,
		charge: {
			typ: "fixed",
			cost: { val: 0 },
			fees: null,
			extra_costs: [],
			markup: null
		},
		cars: []
	}
});

const MOCK_EVENTS: TTourSummaryEventBackend[] = [
	{
		event_id: "event_1",
		typ: "individual_bill",
		event: {
			typ: ENUM_EVENT_BACKEND.FLIGHT,
			id: "event_1-option_1",
			name: "International Flight: London - Tashkent",
			description: null,
			package_id: null,
			day: 1,
			position: 1,
			is_optional: false,
			images: [],
			details: flightDetails()
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
			is_optional: false,
			images: [],
			details: [
				{
					typ: ENUM_EVENT_BACKEND.HOUSING,
					id: "event_2-option_1",
					name: "Central Hotel",
					description: null,
					package_id: null,
					details: housingDetails()
				},
				{
					typ: ENUM_EVENT_BACKEND.HOUSING,
					id: "event_2-option_2",
					name: "Hyatt Regency",
					description: null,
					package_id: null,
					details: housingDetails()
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
			id: "event_3-option_1",
			name: "City Sightseeing Tour",
			description: null,
			package_id: null,
			day: 3,
			position: 1,
			is_optional: false,
			images: [],
			details: activityDetails()
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
					id: "event_4-option_1",
					name: "Airport Transfer",
					description: null,
					package_id: "package_1",
					day: 1,
					position: 2,
					is_optional: false,
					images: [],
					details: transferDetails()
				}
			},
			{
				event_id: "event_5",
				event: {
					typ: ENUM_EVENT_BACKEND.OPTIONS,
					day: 4,
					position: 1,
					is_optional: false,
					images: [],
					details: [
						{
							typ: ENUM_EVENT_BACKEND.ACTIVITY,
							id: "event_5-option_1",
							name: "Museum Tour",
							description: null,
							package_id: "package_1",
							details: activityDetails()
						},
						{
							typ: ENUM_EVENT_BACKEND.ACTIVITY,
							id: "event_5-option_2",
							name: "Walking Tour",
							description: null,
							package_id: "package_1",
							details: activityDetails()
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
