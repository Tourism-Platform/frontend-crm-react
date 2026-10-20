import type { SUPPLIER_PRODUCT_PATHS } from "@/shared/api";
import type {
	NodeImageSchema,
	SupplierProductImageModel
} from "@/shared/api/generated/Api";

export type TSupplierProductImageBackend = SupplierProductImageModel;
export type TSupplierNodeImageBackend = NodeImageSchema;

export type TListProductImagesBackendQuery = ReturnType<
	typeof SUPPLIER_PRODUCT_PATHS.listProductImages
>["_types"]["query"];

export type TListProductImagesBackendResponse = ReturnType<
	typeof SUPPLIER_PRODUCT_PATHS.listProductImages
>["_types"]["response"];
