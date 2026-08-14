import type { DateRange } from "react-day-picker";

import type { TTourSearchLocationQuery } from "@/shared/config";
import { parseStoredLocalDate } from "@/shared/lib";
import { formatDateToISO } from "@/shared/utils";

import type { TSearchTours } from "../schema";
import { ENUM_LOCATION_SUGGEST_KIND } from "../types/location-suggest.types";

import { mapSearchQueryToLocationSuggest } from "./location-suggest.converters";

type TSearchQuery = TTourSearchLocationQuery;

export const mapBackendDatesToDateRange = (
	dateFrom: string,
	dateTo: string
): DateRange => ({
	from: parseStoredLocalDate(dateFrom),
	to: parseStoredLocalDate(dateTo)
});

export const mapSearchToursToSearchQuery = (
	data: TSearchTours
): TSearchQuery => {
	const destination = data.destination;
	const dates = {
		checkIn: formatDateToISO(data.dates?.from),
		checkOut: formatDateToISO(data.dates?.to)
	};

	if (!destination) {
		return dates;
	}

	let locationQuery: TSearchQuery;

	switch (destination.kind) {
		case ENUM_LOCATION_SUGGEST_KIND.CITY:
			locationQuery = { city: destination.value };
			break;
		case ENUM_LOCATION_SUGGEST_KIND.COUNTRY:
			locationQuery = { country: destination.value };
			break;
		case ENUM_LOCATION_SUGGEST_KIND.PLACE:
		default:
			locationQuery = { place: destination.value };
			break;
	}

	return { ...locationQuery, ...dates };
};

export const mapSearchQueryToSearchTours = (
	query: TSearchQuery
): TSearchTours => {
	const from = query.checkIn
		? parseStoredLocalDate(query.checkIn)
		: undefined;
	const to = query.checkOut
		? parseStoredLocalDate(query.checkOut)
		: undefined;

	return {
		destination: mapSearchQueryToLocationSuggest(query),
		dates: from || to ? { from, to } : undefined
	};
};
