import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { IPaginationRequest, IPaginationResponse } from "@/shared/types";

import type {
	ENUM_EVENT_TYPE,
	IEventPoolMemberSummary,
	ITourEventCreate,
	TAddPoolMemberIntent,
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
}

/** A tour event made from a library entry; day/position come from the drop target. */
export type TEventLibraryCreateEvent = Omit<
	ITourEventCreate,
	"day" | "position"
>;

/** Library entry as the event pages and the itinerary board use it. */
export interface IEventLibraryTemplate {
	pool: IEventPoolMemberSummary[];
	/** Null when the entry typ is not a board event type. */
	createEvent: TEventLibraryCreateEvent | null;
}

export type TEventLibraryPoolPatch =
	| { libraryId: string; action: "add"; intent: TAddPoolMemberIntent }
	| { libraryId: string; action: "remove"; supplyId: string };

export interface IEventLibraryCreate {
	type: ENUM_EVENT_TYPE;
	data: TTourEventUpdate;
	/** Язык UI — конвертируется в LanguageCode при save */
	language?: ENUM_LANGUAGES_TYPE;
}

/**
 * Copy source for `copyEventLibrary`. `library` — duplicate an entry;
 * `event` — save one alternative of a tour event (`eventOptionId` is
 * `event.id` on a single event, `details[].id` on a choice).
 */
export type TEventLibraryCopySource =
	| { kind: "library"; libraryId: string }
	| {
			kind: "event";
			tourId: string;
			optionId: string;
			eventOptionId: string;
	  };

export interface IEventLibraryCopy {
	source: TEventLibraryCopySource;
	/** Language for location `city`/`address` written into the copy. */
	language?: ENUM_LANGUAGES_TYPE;
}

/** Placeholder libraryId for create route `/library/events/new/transfer`. */
export const LIBRARY_EVENT_CREATE_ID = "new";

export interface IListLibraryImagesArgs extends IPaginationRequest {
	libraryId: string;
}
