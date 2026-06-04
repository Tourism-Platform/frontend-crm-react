import { Currency, type OrderAgencyInfo, TourType } from "@/shared/api";

import { AGENCY_BUSINESS_MOCK } from "@/entities/user/agency/mock/agency-business.mock";

import { ORDER_TOUR_ID_FALLBACK } from "../constants/order-tour-id.constants";

export const MOCK_OPERATOR_ID = "00000000-0000-4000-8000-000000000003";
export const MOCK_TOUR_OPTION_ID = "00000000-0000-4000-8000-000000000004";
export const MOCK_AGENCY_ID = AGENCY_BUSINESS_MOCK.agency_id;
export const MOCK_TOUR_ID = ORDER_TOUR_ID_FALLBACK;

export const MOCK_ORDER_AGENCY_TEMPLATE: OrderAgencyInfo = {
	id: MOCK_AGENCY_ID,
	name: AGENCY_BUSINESS_MOCK.business_name || "",
	business_name: AGENCY_BUSINESS_MOCK.business_name,
	legal_name: AGENCY_BUSINESS_MOCK.legal_name,
	director_name: AGENCY_BUSINESS_MOCK.director_name,
	contact_person: AGENCY_BUSINESS_MOCK.contact_person,
	contact_position: AGENCY_BUSINESS_MOCK.contact_position,
	contact_email: AGENCY_BUSINESS_MOCK.contact_email,
	contact_phone: AGENCY_BUSINESS_MOCK.contact_phone,
	tax_id: AGENCY_BUSINESS_MOCK.tax_id,
	address_line: AGENCY_BUSINESS_MOCK.address_line,
	city: AGENCY_BUSINESS_MOCK.city,
	country: AGENCY_BUSINESS_MOCK.country,
	website_url: AGENCY_BUSINESS_MOCK.website_url,
	description: AGENCY_BUSINESS_MOCK.description,
	logo_url: AGENCY_BUSINESS_MOCK.logo_path
};

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
