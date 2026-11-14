import { parseStoredLocalDate } from "@/shared/lib";
import { formatDateToISO } from "@/shared/utils";

import { ENUM_LANGUAGES } from "../../landing";
import { ENUM_TOUR_CATEGORY } from "../../tour";
import { ENUM_CATALOG_DURATION } from "../types/catalog-duration.types";
import type {
	TCatalogLocationBar,
	TCatalogUrlQuery
} from "../types/catalog-query.types";
import { ENUM_CATALOG_SORT } from "../types/catalog-sort.types";
import type { ICatalogTourFilters } from "../types/catalog-tour-filter.interface";
import { ENUM_LOCATION_SUGGEST_KIND } from "../types/location-suggest.types";

/** Из адреса — только значения enum'а; вписанные руками неверные отбрасываются */
const pickEnumValues = <T extends string>(
	values: string[] | undefined,
	allowed: Record<string, T>
): T[] => {
	const allowedValues: string[] = Object.values(allowed);

	return (values ?? []).filter((value): value is T =>
		allowedValues.includes(value)
	);
};

export const mapCatalogQueryToLocationBar = (
	query: TCatalogUrlQuery
): TCatalogLocationBar => {
	const from = query.checkIn
		? parseStoredLocalDate(query.checkIn)
		: undefined;
	const to = query.checkOut
		? parseStoredLocalDate(query.checkOut)
		: undefined;

	const city = query.city?.[0];
	const country = query.country?.[0];

	let destination: TCatalogLocationBar["destination"] = null;

	if (city) {
		destination = {
			value: city,
			kind: ENUM_LOCATION_SUGGEST_KIND.CITY,
			label: city
		};
	} else if (country) {
		destination = {
			value: country,
			kind: ENUM_LOCATION_SUGGEST_KIND.COUNTRY,
			label: country
		};
	} else if (query.place) {
		destination = {
			value: query.place,
			kind: ENUM_LOCATION_SUGGEST_KIND.PLACE,
			label: query.place
		};
	}

	return {
		destination,
		dates: from || to ? { from, to } : undefined
	};
};

export const mapLocationBarToCatalogQuery = (
	data: TCatalogLocationBar
): TCatalogUrlQuery => {
	const query: TCatalogUrlQuery = {
		...(data.dates?.from && {
			checkIn: formatDateToISO(data.dates.from)
		}),
		...(data.dates?.to && {
			checkOut: formatDateToISO(data.dates.to)
		})
	};

	const destination = data.destination;

	if (!destination) {
		return query;
	}

	switch (destination.kind) {
		case ENUM_LOCATION_SUGGEST_KIND.CITY:
			query.city = [destination.value];
			break;
		case ENUM_LOCATION_SUGGEST_KIND.COUNTRY:
			query.country = [destination.value];
			break;
		case ENUM_LOCATION_SUGGEST_KIND.PLACE:
			query.place = destination.value;
			break;
	}

	return query;
};

export const mapCatalogQueryToCatalogFilters = (
	query: TCatalogUrlQuery,
	defaults: ICatalogTourFilters
): ICatalogTourFilters => ({
	...defaults,
	search: query.place ?? "",
	page: query.page ?? defaults.page,
	sort: pickEnumValues(query.sort ? [query.sort] : [], ENUM_CATALOG_SORT)[0],
	filters: {
		country: query.country ?? [],
		city: query.city ?? [],
		duration: pickEnumValues(query.duration, ENUM_CATALOG_DURATION),
		language: pickEnumValues(query.language, ENUM_LANGUAGES),
		category: pickEnumValues(query.category, ENUM_TOUR_CATEGORY)
	}
});

export const mapCatalogFiltersToCatalogQuery = (
	filters: ICatalogTourFilters
): TCatalogUrlQuery => {
	const query: TCatalogUrlQuery = {
		page: filters.page,
		sort: filters.sort,
		duration: filters.filters?.duration,
		category: filters.filters?.category,
		language: filters.filters?.language,
		city: filters.filters?.city?.length ? filters.filters.city : undefined,
		country: filters.filters?.country?.length
			? filters.filters.country
			: undefined
	};

	const search = filters.search?.trim();
	if (search) {
		query.place = search;
	}

	return query;
};

export const mergeCatalogQuery = (
	base: TCatalogUrlQuery,
	override: TCatalogUrlQuery
): TCatalogUrlQuery => ({ ...base, ...override });
