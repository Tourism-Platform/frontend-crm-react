import type { IPaginationResponse } from "@/shared/types";

import {
	ENUM_SUPPLIER_TYPE_BACKEND,
	type THotelProductReadBackend,
	type TSupplierProduct,
	type TSupplierProductListBackend,
	type TTrainProductReadBackend
} from "../types";

import { mapHotelProductFromBackend } from "./hotel";
import { mapTrainProductFromBackend } from "./train";

export const mapSupplierProductFromBackend = (
	item: THotelProductReadBackend | TTrainProductReadBackend
): TSupplierProduct => {
	switch (item.typ) {
		case ENUM_SUPPLIER_TYPE_BACKEND.TRAIN:
			return mapTrainProductFromBackend(item as TTrainProductReadBackend);
		case ENUM_SUPPLIER_TYPE_BACKEND.HOTEL:
		default:
			return mapHotelProductFromBackend(item as THotelProductReadBackend);
	}
};

export const mapSupplierProductListToFrontend = (
	response: TSupplierProductListBackend
): IPaginationResponse<TSupplierProduct> => ({
	data: response.data.map(mapSupplierProductFromBackend),
	total: response.total_count
});
