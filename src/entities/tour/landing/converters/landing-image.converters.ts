import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

import type {
	ILandingImageSchema,
	IListLandingImagesArgs,
	TLandingImageBackend,
	TListLandingImagesBackendQuery,
	TListLandingImagesBackendResponse
} from "../types";

export const mapLandingImageToFrontend = (
	backend: TLandingImageBackend
): ILandingImageSchema => ({
	id: backend.id,
	landingPageId: backend.landing_page_id,
	imagePath: backend.image_path,
	isPrimary: backend.is_primary
});

export const mapLandingImagesToFrontend = (
	backend: TLandingImageBackend[]
): ILandingImageSchema[] => backend.map(mapLandingImageToFrontend);

export const mapLandingImagesQueryToBackend = (
	args: IListLandingImagesArgs
): TListLandingImagesBackendQuery => ({
	...(args.page > 1 && { skip: (args.page - 1) * args.limit }),
	...(args.limit && { limit: args.limit })
});

export const mapLandingImagesPaginatedToFrontend = (
	response: TListLandingImagesBackendResponse
): IPaginationResponse<ILandingImageSchema> => ({
	data: response.map(mapLandingImageToFrontend),
	total: TEMP_LIST_TOTAL
});
