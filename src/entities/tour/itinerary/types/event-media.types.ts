import type { IPaginationRequest } from "@/shared/types";

export interface IEventImage {
	id: string;
	imagePath: string;
	isPrimary: boolean;
}

export interface IListEventImagesArgs extends IPaginationRequest {
	tourId: string;
	eventId: string;
}
