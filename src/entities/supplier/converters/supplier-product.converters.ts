import type { IPaginationResponse } from "@/shared/types";

import {
	ENUM_SUPPLIER_TYPE_BACKEND,
	type TActivityProductReadBackend,
	type TBusProductReadBackend,
	type TFlightProductReadBackend,
	type THotelProductReadBackend,
	type TSupplierProduct,
	type TSupplierProductListBackend,
	type TTrainProductReadBackend,
	type TTransferProductReadBackend
} from "../types";

import { mapActivityProductFromBackend } from "./activity";
import { mapBusProductFromBackend } from "./bus";
import { mapFlightProductFromBackend } from "./flight";
import { mapHotelProductFromBackend } from "./hotel";
import { mapTrainProductFromBackend } from "./train";
import { mapTransferProductFromBackend } from "./transfer";

type TSupplierProductReadBackend =
	| THotelProductReadBackend
	| TTrainProductReadBackend
	| TFlightProductReadBackend
	| TBusProductReadBackend
	| TTransferProductReadBackend
	| TActivityProductReadBackend;

export const mapSupplierProductFromBackend = (
	item: TSupplierProductReadBackend
): TSupplierProduct => {
	switch (item.typ) {
		case ENUM_SUPPLIER_TYPE_BACKEND.TRAIN:
			return mapTrainProductFromBackend(item as TTrainProductReadBackend);
		case ENUM_SUPPLIER_TYPE_BACKEND.FLIGHT:
			return mapFlightProductFromBackend(
				item as TFlightProductReadBackend
			);
		case ENUM_SUPPLIER_TYPE_BACKEND.BUS:
			return mapBusProductFromBackend(item as TBusProductReadBackend);
		case ENUM_SUPPLIER_TYPE_BACKEND.TRANSFER:
			return mapTransferProductFromBackend(
				item as TTransferProductReadBackend
			);
		case ENUM_SUPPLIER_TYPE_BACKEND.ACTIVITY:
			return mapActivityProductFromBackend(
				item as TActivityProductReadBackend
			);
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
