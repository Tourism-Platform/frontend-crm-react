import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";

import { mapEventReadLangQueryToBackend } from "@/entities/tour/itinerary";

import type {
	TCopyEventLibraryBackend,
	TCopyEventLibraryQueryBackend,
	TEventLibraryCopySource
} from "../types";

/** Body for `copyEventLibrary` — `{ source }` discriminated by `kind`. */
export const mapEventLibraryCopyToBackend = (
	source: TEventLibraryCopySource
): TCopyEventLibraryBackend => {
	if (source.kind === "event") {
		return {
			source: {
				kind: "event",
				tour_id: source.tourId,
				option_id: source.optionId,
				event_option_id: source.eventOptionId
			}
		};
	}

	return {
		source: {
			kind: "library",
			library_id: source.libraryId
		}
	};
};

export const mapEventLibraryCopyQueryToBackend = (
	language?: ENUM_LANGUAGES_TYPE
): TCopyEventLibraryQueryBackend => mapEventReadLangQueryToBackend(language);
