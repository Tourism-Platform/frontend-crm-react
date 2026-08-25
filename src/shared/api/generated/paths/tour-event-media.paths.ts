import type {
	BodyUploadEventImagesTourTourIdEventEventIdImagesPost,
	BodyUploadEventNodeImagesTourTourIdEventEventIdNodeNodeIdImagesPost,
	EventImageModel,
	NodeImageSchema
} from "../Api";

// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TOUR_EVENT_MEDIA_PATHS = {
	uploadEventImages: (tourId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/event/${eventId}/images`,
			method: "POST",
			_types: {} as {
				body: BodyUploadEventImagesTourTourIdEventEventIdImagesPost;
				query: void;
				response: EventImageModel[];
			}
		}) as const,
	listEventImages: (tourId: string, eventId: string) =>
		({
			url: `/tour/${tourId}/event/${eventId}/images/all`,
			method: "GET",
			_types: {} as {
				body: void;
				query: { skip?: number; limit?: number };
				response: EventImageModel[];
			}
		}) as const,
	deleteEventImage: (tourId: string, eventId: string, imageId: string) =>
		({
			url: `/tour/${tourId}/event/${eventId}/images/${imageId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	updateEventImage: (tourId: string, eventId: string, imageId: string) =>
		({
			url: `/tour/${tourId}/event/${eventId}/images/${imageId}/set-primary`,
			method: "PATCH",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	uploadEventNodeImages: (tourId: string, eventId: string, nodeId: string) =>
		({
			url: `/tour/${tourId}/event/${eventId}/node/${nodeId}/images`,
			method: "POST",
			_types: {} as {
				body: BodyUploadEventNodeImagesTourTourIdEventEventIdNodeNodeIdImagesPost;
				query: void;
				response: NodeImageSchema[];
			}
		}) as const,
	deleteEventNodeImage: (
		tourId: string,
		eventId: string,
		nodeId: string,
		imageId: string
	) =>
		({
			url: `/tour/${tourId}/event/${eventId}/node/${nodeId}/images/${imageId}`,
			method: "DELETE",
			_types: {} as { body: void; query: void; response: void }
		}) as const,
	setPrimaryEventNodeImage: (
		tourId: string,
		eventId: string,
		nodeId: string,
		imageId: string
	) =>
		({
			url: `/tour/${tourId}/event/${eventId}/node/${nodeId}/images/${imageId}/set-primary`,
			method: "PATCH",
			_types: {} as { body: void; query: void; response: void }
		}) as const
} as const;
