import { Currency, TourType } from "@/shared/api";

import { AGENCY_BUSINESS_MOCK } from "@/entities/user/agency/mock/agency-business.mock";

import { ORDER_TOUR_ID_FALLBACK } from "../constants/order-tour-id.constants";

export const MOCK_OPERATOR_ID = "00000000-0000-4000-8000-000000000003";
export const MOCK_TOUR_OPTION_ID = "00000000-0000-4000-8000-000000000004";
export const MOCK_AGENCY_ID = AGENCY_BUSINESS_MOCK.agency_id;
export const MOCK_TOUR_ID = ORDER_TOUR_ID_FALLBACK;

export const MOCK_EVENT_IDS = {
	flight: "e1000001-0000-4000-8000-000000000001",
	multiply: "e1000002-0000-4000-8000-000000000002",
	activity: "e1000003-0000-4000-8000-000000000003"
} as const;

export const MOCK_BOOKING_DEFAULTS = {
	agency_id: MOCK_AGENCY_ID,
	operator_id: MOCK_OPERATOR_ID,
	tour_option_id: MOCK_TOUR_OPTION_ID,
	paid_currency: Currency.USD,
	tour_currency: Currency.USD,
	snapshot_id: null,
	fx_rate_id: null,
	fx_rate_applied: null,
	agreed_price: null,
	voucher_path: null
} as const;

export const MOCK_TOUR_INFO_TEMPLATE = {
	name: "Uzbekistan Cultural Tour",
	typ: TourType.Regular,
	days: 8,
	nights: 7,
	duration_hours: null,
	route: ["Tashkent", "Samarkand", "Bukhara", "Tashkent"]
} as const;

export const MOCK_CLIENT_NAMES = [
	"Danda Fisher",
	"John Wick",
	"Bender Rodriguez",
	"221B Consulting",
	"Global Corp Logistics"
] as const;

export const MOCK_TOUR_NAMES = [
	"Uzbekistan Cultural Tour",
	"London Mystery Tour",
	"Classic Tour",
	"Corporate Retreat",
	"Year End Retreat"
] as const;

export const buildBookingUuid = (
	statusIndex: number,
	orderIndex: number
): string => {
	const status = statusIndex.toString(16).padStart(1, "0");
	const order = orderIndex.toString(16).padStart(1, "0");
	return `b100${status}${order}00-0000-4000-8000-000000000001`;
};
