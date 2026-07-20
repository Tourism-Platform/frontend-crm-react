import type {
	ActivityEventInput,
	BodyUploadLibraryImagesTourEventLibraryLibraryIdImagesPost,
	BusEventInput,
	EventLibraryListResponse,
	EventLibraryResponse,
	EventTypes,
	FlightEventInput,
	GuideEventInput,
	HousingEventInput,
	InformationEventInput,
	SupplementaryEventInput,
	TourEventLibraryImageModel,
	TrainEventInput,
	TransferEventInput
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_EVENT_LIBRARY_PATHS = {
	listLibraryEvents: {
		url: "/tour/event/library",
		method: "GET",
		_types: {} as {
			body: void;
			query: {
				typ?: EventTypes | null;
				q?: string | null;
				skip?: number;
				limit?: number;
			};
			response: EventLibraryListResponse;
		}
	} as const,
	createLibraryEvent: {
		url: "/tour/event/library",
		method: "POST",
		_types: {} as {
			body:
				| InformationEventInput
				| BusEventInput
				| TrainEventInput
				| TransferEventInput
				| ActivityEventInput
				| HousingEventInput
				| FlightEventInput
				| GuideEventInput
				| SupplementaryEventInput;
			query: void;
			response: EventLibraryResponse;
		}
	} as const,
	getLibraryEvent: (libraryId: string) =>
		({
			url: `/tour/event/library/${libraryId}`,
			method: "GET",
			_types: {} as {
				body: void;
				query: void;
				response: EventLibraryResponse;
			}
		}) as const,
	updateLibraryEvent: (libraryId: string) =>
		({
			url: `/tour/event/library/${libraryId}`,
			method: "PATCH",
			_types: {} as {
				body:
					| InformationEventInput
					| BusEventInput
					| TrainEventInput
					| TransferEventInput
					| ActivityEventInput
					| HousingEventInput
					| FlightEventInput
					| GuideEventInput
					| SupplementaryEventInput;
				query: void;
				response: EventLibraryResponse;
			}
		}) as const,
	deleteLibraryEvent: (libraryId: string) =>
		({
			url: `/tour/event/library/${libraryId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	uploadLibraryImages: (libraryId: string) =>
		({
			url: `/tour/event/library/${libraryId}/images`,
			method: "POST",
			_types: {} as {
				body: BodyUploadLibraryImagesTourEventLibraryLibraryIdImagesPost;
				query: void;
				response: TourEventLibraryImageModel[];
			}
		}) as const,
	listLibraryImages: (libraryId: string) =>
		({
			url: `/tour/event/library/${libraryId}/images/all`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { skip?: number; limit?: number };
				response: TourEventLibraryImageModel[];
			}
		}) as const,
	deleteLibraryImage: (libraryId: string, imageId: string) =>
		({
			url: `/tour/event/library/${libraryId}/images/${imageId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	setPrimaryLibraryImage: (libraryId: string, imageId: string) =>
		({
			url: `/tour/event/library/${libraryId}/images/${imageId}/set-primary`,
			method: "PATCH",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
