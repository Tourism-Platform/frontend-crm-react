import type { IPaginationResponse } from "@/shared/types";

import {
	ENUM_SUPPLIER_TYPE,
	type TSupplierProduct,
	type TSupplierProductListBackend,
	type TSupplierProductReadBackend,
	type TSupplierVariantWriteBackend,
	type TSupplierVariantWriteInput
} from "../types";

import {
	mapActivityProductFromBackend,
	mapActivityVariantToWrite
} from "./activity";
import { mapBusProductFromBackend, mapBusVariantToWrite } from "./bus";
import { mapFlightProductFromBackend, mapFlightVariantToWrite } from "./flight";
import { mapHotelProductFromBackend, mapHotelVariantToWrite } from "./hotel";
import { mapTrainProductFromBackend, mapTrainVariantToWrite } from "./train";
import {
	mapTransferProductFromBackend,
	mapTransferVariantToWrite
} from "./transfer";

export const mapSupplierProductFromBackend = (
	item: TSupplierProductReadBackend
): TSupplierProduct => {
	switch (item.typ) {
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return mapTrainProductFromBackend(item);
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return mapFlightProductFromBackend(item);
		case ENUM_SUPPLIER_TYPE.BUS:
			return mapBusProductFromBackend(item);
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return mapTransferProductFromBackend(item);
		case ENUM_SUPPLIER_TYPE.ACTIVITY:
			return mapActivityProductFromBackend(item);
		case ENUM_SUPPLIER_TYPE.HOTEL:
		default:
			return mapHotelProductFromBackend(item);
	}
};

export const mapSupplierVariantToWrite = (
	input: TSupplierVariantWriteInput
): TSupplierVariantWriteBackend => {
	switch (input.typ) {
		case ENUM_SUPPLIER_TYPE.HOTEL:
			return mapHotelVariantToWrite(input.data, input.pricing);
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return mapTrainVariantToWrite(input.data, input.pricing);
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return mapFlightVariantToWrite(input.data, input.pricing);
		case ENUM_SUPPLIER_TYPE.BUS:
			return mapBusVariantToWrite(input.data, input.pricing);
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return mapTransferVariantToWrite(input.data, input.pricing);
		case ENUM_SUPPLIER_TYPE.ACTIVITY:
			return mapActivityVariantToWrite(input.data);
	}
};

export const mapSupplierProductListToFrontend = (
	response: TSupplierProductListBackend
): IPaginationResponse<TSupplierProduct> => ({
	data: response.data.map(mapSupplierProductFromBackend),
	total: response.total_count
});
