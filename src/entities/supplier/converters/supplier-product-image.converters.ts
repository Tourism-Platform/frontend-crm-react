import { TEMP_LIST_TOTAL } from "@/shared/config";
import type { IPaginationResponse } from "@/shared/types";

import type {
	IListProductImages,
	ISupplierNodeImage,
	ISupplierProductImage,
	TListProductImagesBackendQuery,
	TListProductImagesBackendResponse,
	TSupplierNodeImageBackend,
	TSupplierProductImageBackend
} from "../types";

export const mapSupplierProductImageToFrontend = (
	row: TSupplierProductImageBackend
): ISupplierProductImage => ({
	id: row.id,
	productId: row.product_id,
	imagePath: row.image_path,
	isPrimary: row.is_primary
});

export const mapSupplierNodeImageToFrontend = (
	row: TSupplierNodeImageBackend
): ISupplierNodeImage => ({
	id: row.id ?? "",
	imagePath: row.image_path,
	isPrimary: row.is_primary ?? false
});

export const mapProductImagesQueryToBackend = (
	args: IListProductImages
): TListProductImagesBackendQuery => ({
	...(args.page > 1 && { skip: (args.page - 1) * args.limit }),
	...(args.limit && { limit: args.limit })
});

export const mapProductImagesPaginatedToFrontend = (
	response: TListProductImagesBackendResponse
): IPaginationResponse<ISupplierProductImage> => ({
	data: response.map(mapSupplierProductImageToFrontend),
	total: TEMP_LIST_TOTAL
});
