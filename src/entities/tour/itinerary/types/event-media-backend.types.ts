import type {
	BodyUploadEventImagesTourTourIdEventEventIdImagesPost,
	EventImageModel,
	TOUR_EVENT_MEDIA_PATHS
} from "@/shared/api";

export type TEventImageBackend = EventImageModel;
// Тело multipart-запроса загрузки изображений
export type TUploadEventImagesBody =
	BodyUploadEventImagesTourTourIdEventEventIdImagesPost;

export type TListEventImagesBackendQuery = ReturnType<
	typeof TOUR_EVENT_MEDIA_PATHS.listEventImages
>["_types"]["query"];

export type TListEventImagesBackendResponse = ReturnType<
	typeof TOUR_EVENT_MEDIA_PATHS.listEventImages
>["_types"]["response"];
