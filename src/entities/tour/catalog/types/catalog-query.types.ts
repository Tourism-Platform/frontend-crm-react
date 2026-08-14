import type { TLocationSuggestion } from "./location-suggest.types";

/** Location part of parsed catalog URL — mirrors ENUM_LOCATION_SUGGEST_KIND */
export type TCatalogLocationQuery = {
	city?: string[];
	country?: string[];
	place?: string;
};

/** Parsed catalog URL state (after parseCatalogQuery) */
export type TCatalogUrlQuery = TCatalogLocationQuery & {
	checkIn?: string;
	checkOut?: string;
	page?: number;
	limit?: number;
	duration?: string[];
	category?: string[];
	language?: string[];
};

/** Location bar values on catalog (destination + dates) */
export type TCatalogLocationBar = {
	destination: TLocationSuggestion | null;
	dates?: {
		from: Date | undefined;
		to?: Date | undefined;
	};
};
