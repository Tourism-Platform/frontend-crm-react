import { buildRoute } from "@/shared/config";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "@/entities/supplier";

import { SUPPLIER_PRODUCT_EDIT_PATH_BY_TYPE } from "../config/product-edit-path.config";

export const buildSupplierProductEditRoute = (
	typ: ENUM_SUPPLIER_TYPE_TYPE,
	params: { supplierId: string; productId: string }
) => {
	const path =
		SUPPLIER_PRODUCT_EDIT_PATH_BY_TYPE[
			typ as keyof typeof SUPPLIER_PRODUCT_EDIT_PATH_BY_TYPE
		];

	if (!path) return undefined;

	return buildRoute(path, params);
};
