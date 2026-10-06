import type {
	EventLibraryListResponse,
	EventLibraryResponse,
	TourEventLibraryImageModel
} from "@/shared/api";
import { TOUR_EVENT_LIBRARY_PATHS } from "@/shared/api";

export type TEventLibraryListBackendResponse = EventLibraryListResponse;
export type TEventLibraryItemBackend = EventLibraryResponse;

export type TListEventLibraryQuery =
	(typeof TOUR_EVENT_LIBRARY_PATHS.listLibraryEvents)["_types"]["query"];

export type TCreateEventLibraryBackend =
	(typeof TOUR_EVENT_LIBRARY_PATHS.createLibraryEvent)["_types"]["body"];

export type TCopyEventLibraryBackend =
	(typeof TOUR_EVENT_LIBRARY_PATHS.copyLibraryEvent)["_types"]["body"];

export type TCopyEventLibraryQueryBackend =
	(typeof TOUR_EVENT_LIBRARY_PATHS.copyLibraryEvent)["_types"]["query"];

export type TUpdateEventLibraryBackend = ReturnType<
	typeof TOUR_EVENT_LIBRARY_PATHS.updateLibraryEvent
>["_types"]["body"];

export type TEventLibraryImageBackend = TourEventLibraryImageModel;
