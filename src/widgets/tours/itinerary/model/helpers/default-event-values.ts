import {
	type ActivityDetailsSchemaInput,
	ActivityType,
	Currency,
	type FixedExpenseInput,
	type FlightDetailsSchemaInput,
	type HousingDetailsSchemaInput,
	type TransferDetailsSchemaInput,
	TransferTypes
} from "@/shared/api/generated/Api";

import { ENUM_EVENT, type ENUM_EVENT_TYPE } from "@/entities/tour";

// ─── Переиспользуемые заглушки ─────────────────────────────────────

const DEFAULT_LOCATION = { lat: 0, long: 0 } as const;

const DEFAULT_TIME = { time: "00:00:00", timezone: 5 } as const;

const DEFAULT_DATE = "2025-01-01";

const DEFAULT_FIXED_EXPENSE = {
	typ: "fixed" as const,
	cost: { val: 0, currency: Currency.USD }
} satisfies FixedExpenseInput;

// ─── Details по типам событий ───────────────────────────────────────

const FLIGHT_DETAILS: FlightDetailsSchemaInput = {
	hop: []
};

const ACCOMMODATION_DETAILS: HousingDetailsSchemaInput = {
	location: DEFAULT_LOCATION,
	amenities: [],
	duration: 1,
	check_in: { ...DEFAULT_TIME, time: "14:00:00" },
	check_out: { ...DEFAULT_TIME, time: "12:00:00" },
	expenses: DEFAULT_FIXED_EXPENSE
};

const ACTIVITY_DETAILS: ActivityDetailsSchemaInput = {
	typ: ActivityType.Wellness,
	location: DEFAULT_LOCATION,
	start_time: { ...DEFAULT_TIME, time: "09:00:00" },
	end_time: { ...DEFAULT_TIME, time: "10:00:00" },
	expenses: DEFAULT_FIXED_EXPENSE
};

const TRANSFER_DETAILS: TransferDetailsSchemaInput = {
	typ: TransferTypes.AirportTransfer,
	departure: {
		date: DEFAULT_DATE,
		time: { ...DEFAULT_TIME, time: "09:00:00" },
		location: DEFAULT_LOCATION
	},
	arrival: {
		date: DEFAULT_DATE,
		time: { ...DEFAULT_TIME, time: "10:00:00" },
		location: DEFAULT_LOCATION
	},
	expenses: DEFAULT_FIXED_EXPENSE
};

// INFO (typ "7") → details?: EmptyDetails = {}, поле optional
const INFO_DETAILS = {};

// ─── Маппинг ENUM_EVENT → details ───────────────────────────────────

export const DEFAULT_EVENT_DETAILS: Record<ENUM_EVENT_TYPE, any> = {
	[ENUM_EVENT.FLIGHT]: FLIGHT_DETAILS,
	[ENUM_EVENT.TRANSPORTATION]: TRANSFER_DETAILS,
	[ENUM_EVENT.ACCOMMODATION]: ACCOMMODATION_DETAILS,
	[ENUM_EVENT.ACTIVITY]: ACTIVITY_DETAILS,
	[ENUM_EVENT.INFO]: INFO_DETAILS,
	[ENUM_EVENT.MULTIPLY_OPTION]: {},
	[ENUM_EVENT.TOUR_DETAILS]: {},
	[ENUM_EVENT.EVENT_LIBRARY]: {},
	[ENUM_EVENT.ITINERARY_LIBRARY]: {}
};
