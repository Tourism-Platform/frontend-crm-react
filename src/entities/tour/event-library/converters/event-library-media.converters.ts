import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

import type { IEventImage } from "@/entities/tour/itinerary";

import type {
	IListLibraryImagesArgs,
	TEventLibraryImageBackend,
	TListLibraryImagesBackendQuery,
	TListLibraryImagesBackendResponse
} from "../types";

export const mapLibraryImageToFrontend = (
	backend: TEventLibraryImageBackend
): IEventImage => ({
	id: backend.id,
	imagePath: backend.image_path,
	isPrimary: backend.is_primary
});

export const mapLibraryImagesQueryToBackend = (
	args: IListLibraryImagesArgs
): TListLibraryImagesBackendQuery => ({
	...(args.page > 1 && { skip: (args.page - 1) * args.limit }),
	...(args.limit && { limit: args.limit })
});

export const mapLibraryImagesPaginatedToFrontend = (
	response: TListLibraryImagesBackendResponse
): IPaginationResponse<IEventImage> => ({
	data: response.map(mapLibraryImageToFrontend),
	total: TEMP_LIST_TOTAL
});
