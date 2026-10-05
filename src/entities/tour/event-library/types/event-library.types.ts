import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import type {
	ENUM_EVENT_TYPE,
	TEventDetailsBackend,
	TTourEventUpdate
} from "@/entities/tour/itinerary";

export interface IEventLibraryItem {
	id: string;
	name: string;
	eventType: ENUM_EVENT_TYPE;
	supplierId: string | null;
	/** Short details for table (route, time range). */
	summary: string | null;
	primaryImagePath: string | null;
}

export interface IEventLibraryFilters
	extends Omit<IPaginationRequest, "status"> {
	status: ENUM_EVENT_TYPE[];
}

/** Infinite list cache entry: pages merged per filter (status + search). */
export interface IEventLibraryInfiniteResponse
	extends IPaginationResponse<IEventLibraryItem> {
	/** Last merged page. */
	page: number;
	/** Filter the merged pages belong to — see `getEventLibraryFilterKey`. */
	filterKey: string;
}

export interface IEventLibraryUpdate {
	libraryId: string;
	type: ENUM_EVENT_TYPE;
	data: TTourEventUpdate;
	/** Язык UI — конвертируется в LanguageCode при save */
	language?: ENUM_LANGUAGES_TYPE;
	/** Current READ details — library PATCH always echoes the full pool. */
	currentDetails?: TEventDetailsBackend;
}

export interface IEventLibraryCreate {
	type: ENUM_EVENT_TYPE;
	data: TTourEventUpdate;
	/** Язык UI — конвертируется в LanguageCode при save */
	language?: ENUM_LANGUAGES_TYPE;
}

/** Placeholder libraryId for create route `/library/events/new/transfer`. */
export const LIBRARY_EVENT_CREATE_ID = "new";
