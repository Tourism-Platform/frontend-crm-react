import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

import type {
	IEventImage,
	IListEventImagesArgs,
	TEventImageBackend,
	TListEventImagesBackendQuery,
	TListEventImagesBackendResponse
} from "../types";

export const mapEventImageToFrontend = (
	backend: TEventImageBackend
): IEventImage => ({
	id: backend.id,
	imagePath: backend.image_path,
	isPrimary: backend.is_primary
});

export const mapEventImagesQueryToBackend = (
	args: IListEventImagesArgs
): TListEventImagesBackendQuery => ({
	...(args.page > 1 && { skip: (args.page - 1) * args.limit }),
	...(args.limit && { limit: args.limit })
});

export const mapEventImagesPaginatedToFrontend = (
	response: TListEventImagesBackendResponse
): IPaginationResponse<IEventImage> => ({
	data: response.map(mapEventImageToFrontend),
	total: TEMP_LIST_TOTAL
});
