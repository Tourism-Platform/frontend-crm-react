import type { DateRange } from "react-day-picker";

import { ENUM_PATH, type TQueryParams } from "@/shared/config";
import { parseStoredLocalDate } from "@/shared/lib";
import type { TGeoFormValue } from "@/shared/types/geo-form.types";
import { formatDateToISO } from "@/shared/utils";

import type { TSearchTours } from "../schema";

type TSearchQuery = TQueryParams[typeof ENUM_PATH.TOURS.SEARCH];

export const mapBackendDatesToDateRange = (
	dateFrom: string,
	dateTo: string
): DateRange => ({
	from: parseStoredLocalDate(dateFrom),
	to: parseStoredLocalDate(dateTo)
});

const resolveDestinationLabel = (
	destination: TGeoFormValue | null | undefined
): string | undefined => {
	if (!destination) return undefined;

	const label =
		destination.label?.trim() ||
		destination.name?.trim() ||
		destination.city?.trim() ||
		"";

	return label || undefined;
};

export const mapSearchToursToSearchQuery = (
	data: TSearchTours
): TSearchQuery => {
	const destination = data.destination;

	return {
		destination: resolveDestinationLabel(destination),
		lat:
			destination && Number.isFinite(destination.lat)
				? String(destination.lat)
				: undefined,
		long:
			destination && Number.isFinite(destination.long)
				? String(destination.long)
				: undefined,
		checkIn: formatDateToISO(data.dates?.from),
		checkOut: formatDateToISO(data.dates?.to)
	};
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

	const lat = query.lat !== undefined ? Number(query.lat) : NaN;
	const long = query.long !== undefined ? Number(query.long) : NaN;

	const destination: TGeoFormValue | null =
		Number.isFinite(lat) && Number.isFinite(long)
			? {
					lat,
					long,
					label: query.destination ?? null
				}
			: null;

	return {
		destination,
		dates: from || to ? { from, to } : undefined
	};
};
