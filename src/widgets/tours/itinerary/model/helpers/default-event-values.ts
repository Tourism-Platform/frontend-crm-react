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
import { getDeviceUtcOffset } from "@/shared/hooks";

import { ENUM_EVENT, type ENUM_EVENT_TYPE } from "@/entities/tour";

const DEFAULT_LOCATION = { lat: 0, long: 0 } as const;

const getDefaultTime = (time = "00:00:00") => ({
	time,
	timezone: Number(getDeviceUtcOffset())
});

const DEFAULT_FIXED_EXPENSE = {
	typ: "fixed" as const,
	cost: { val: 0, currency: Currency.USD }
} satisfies FixedExpenseInput;

export const getDefaultEventDetails = (
	eventType: ENUM_EVENT_TYPE
): Record<string, unknown> => {
	switch (eventType) {
		case ENUM_EVENT.FLIGHT:
			return { hop: [] } satisfies FlightDetailsSchemaInput;
		case ENUM_EVENT.TRANSPORTATION:
			return {
				typ: TransferTypes.AirportTransfer,
				departure: {
					time: getDefaultTime("09:00:00"),
					location: DEFAULT_LOCATION
				},
				arrival: {
					time: getDefaultTime("10:00:00"),
					location: DEFAULT_LOCATION
				},
				expenses: DEFAULT_FIXED_EXPENSE
			} satisfies TransferDetailsSchemaInput;
		case ENUM_EVENT.ACCOMMODATION:
			return {
				location: DEFAULT_LOCATION,
				amenities: [],
				duration: 1,
				check_in: getDefaultTime("14:00:00"),
				check_out: getDefaultTime("12:00:00"),
				expenses: DEFAULT_FIXED_EXPENSE
			} satisfies HousingDetailsSchemaInput;
		case ENUM_EVENT.ACTIVITY:
			return {
				typ: ActivityType.Wellness,
				location: DEFAULT_LOCATION,
				start_time: getDefaultTime("09:00:00"),
				end_time: getDefaultTime("10:00:00"),
				expenses: DEFAULT_FIXED_EXPENSE
			} satisfies ActivityDetailsSchemaInput;
		case ENUM_EVENT.INFO:
			return {};
		case ENUM_EVENT.SUPPLEMENT:
			return { item: [] };
		case ENUM_EVENT.GUIDE:
			return { duration: 1, categories: [] };
		case ENUM_EVENT.MULTIPLY_OPTION:
		case ENUM_EVENT.TOUR_DETAILS:
		case ENUM_EVENT.EVENT_LIBRARY:
		case ENUM_EVENT.ITINERARY_LIBRARY:
		default:
			return {};
	}
};
