import type {
	BodyUploadEventImagesTourTourIdEventEventIdImagesPost,
	EventImageModel
} from "@/shared/api";

export type TEventImageBackend = EventImageModel;
// Тело multipart-запроса загрузки изображений
export type TUploadEventImagesBody =
	BodyUploadEventImagesTourTourIdEventEventIdImagesPost;
