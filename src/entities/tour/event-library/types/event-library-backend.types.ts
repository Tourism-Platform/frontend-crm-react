import type {
	EventLibraryListResponse,
	EventLibraryResponse,
	EventTypes
} from "@/shared/api";
import { TOUR_EVENT_LIBRARY_PATHS } from "@/shared/api";

export type TEventLibraryListBackendResponse = EventLibraryListResponse;
export type TEventLibraryItemBackend = EventLibraryResponse;

export type TListEventLibraryQuery = {
	typ?: EventTypes | null;
	q?: string | null;
	skip?: number;
	limit?: number;
};

export type TCreateEventLibraryBackend =
	(typeof TOUR_EVENT_LIBRARY_PATHS.createLibraryEvent)["_types"]["body"];

export type TUpdateEventLibraryBackend = ReturnType<
	typeof TOUR_EVENT_LIBRARY_PATHS.updateLibraryEvent
>["_types"]["body"];
