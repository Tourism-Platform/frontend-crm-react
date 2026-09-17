import type { SupplierProductListResponse } from "@/shared/api/generated/Api";
import type { SUPPLIER_PRODUCT_PATHS } from "@/shared/api/generated/paths/supplier-product.paths";

export type TListSupplierProductsQueryBackend =
	(typeof SUPPLIER_PRODUCT_PATHS.listAllProducts)["_types"]["query"];

export type TSupplierProductListBackend = SupplierProductListResponse;

export type TCreateProductBodyBackend = ReturnType<
	typeof SUPPLIER_PRODUCT_PATHS.createProduct
>["_types"]["body"];

export type TUpdateProductBodyBackend = ReturnType<
	typeof SUPPLIER_PRODUCT_PATHS.updateProduct
>["_types"]["body"];

export type TSwitchProductPricingBodyBackend = ReturnType<
	typeof SUPPLIER_PRODUCT_PATHS.switchProductPricing
>["_types"]["body"];

export type TSupplierVariantWriteBackend = ReturnType<
	typeof SUPPLIER_PRODUCT_PATHS.createVariant
>["_types"]["body"];

export type TSupplierProductReadBackend = ReturnType<
	typeof SUPPLIER_PRODUCT_PATHS.getProduct
>["_types"]["response"];

export type TSupplierVariantProductReadBackend = TSupplierProductReadBackend;
