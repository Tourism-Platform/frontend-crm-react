import type { IPaginationResponse } from "@/shared/types";

import {
	ENUM_SUPPLIER_TYPE,
	type ENUM_SUPPLIER_TYPE_TYPE,
	type TCreateProductBodyBackend,
	type TCreateSupplierProduct,
	type TSupplierProduct,
	type TSupplierProductEditForm,
	type TSupplierProductListBackend,
	type TSupplierProductReadBackend,
	type TSupplierVariantWriteBackend,
	type TSupplierVariantWriteInput,
	type TSwitchProductPricingBodyBackend,
	type TSwitchSupplierProductPricing,
	type TUpdateProductBodyBackend,
	type TUpdateSupplierProduct,
	type TUpdateSupplierVariant
} from "../types";

import {
	mapActivityOfferingRowToVariantWrite,
	mapActivityProductFromBackend,
	mapActivityProductGeneralToCreate,
	mapActivityProductGeneralToUpdate,
	mapActivityProductToEditForm,
	mapActivityVariantToWrite
} from "./activity";
import {
	mapBusEditFormToPricingSwitch,
	mapBusProductFromBackend,
	mapBusProductGeneralToCreate,
	mapBusProductGeneralToUpdate,
	mapBusProductToEditForm,
	mapBusVariantToWrite,
	mapBusVehicleRowToVariantWrite
} from "./bus";
import {
	mapFareRowToVariantWrite,
	mapFlightEditFormToPricingSwitch,
	mapFlightProductFromBackend,
	mapFlightProductGeneralToCreate,
	mapFlightProductGeneralToUpdate,
	mapFlightProductToEditForm,
	mapFlightVariantToWrite
} from "./flight";
import {
	mapHotelEditFormToPricingSwitch,
	mapHotelProductFromBackend,
	mapHotelProductGeneralToCreate,
	mapHotelProductGeneralToUpdate,
	mapHotelProductToEditForm,
	mapHotelRoomRowToVariantWrite,
	mapHotelVariantToWrite
} from "./hotel";
import {
	mapTrainEditFormToPricingSwitch,
	mapTrainProductFromBackend,
	mapTrainProductGeneralToCreate,
	mapTrainProductGeneralToUpdate,
	mapTrainProductToEditForm,
	mapTrainVariantToWrite
} from "./train";
import {
	mapTransferCarRowToVariantWrite,
	mapTransferEditFormToPricingSwitch,
	mapTransferProductFromBackend,
	mapTransferProductGeneralToCreate,
	mapTransferProductGeneralToUpdate,
	mapTransferProductToEditForm,
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

export function mapSupplierProductToEditForm(
	product: TSupplierProduct
): TSupplierProductEditForm;
export function mapSupplierProductToEditForm(
	product: null | undefined,
	typ: ENUM_SUPPLIER_TYPE_TYPE
): TSupplierProductEditForm;
export function mapSupplierProductToEditForm(
	product?: TSupplierProduct | null,
	typ?: ENUM_SUPPLIER_TYPE_TYPE
): TSupplierProductEditForm {
	const kind = product?.typ ?? typ;

	switch (kind) {
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return mapTrainProductToEditForm(
				product?.typ === ENUM_SUPPLIER_TYPE.TRAIN ? product : null
			);
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return mapFlightProductToEditForm(
				product?.typ === ENUM_SUPPLIER_TYPE.FLIGHT ? product : null
			);
		case ENUM_SUPPLIER_TYPE.BUS:
			return mapBusProductToEditForm(
				product?.typ === ENUM_SUPPLIER_TYPE.BUS ? product : null
			);
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return mapTransferProductToEditForm(
				product?.typ === ENUM_SUPPLIER_TYPE.TRANSFER ? product : null
			);
		case ENUM_SUPPLIER_TYPE.ACTIVITY:
			return mapActivityProductToEditForm(
				product?.typ === ENUM_SUPPLIER_TYPE.ACTIVITY ? product : null
			);
		case ENUM_SUPPLIER_TYPE.HOTEL:
		default:
			return mapHotelProductToEditForm(
				product?.typ === ENUM_SUPPLIER_TYPE.HOTEL ? product : null
			);
	}
}

export const mapSupplierProductReadToEditForm = (
	item: TSupplierProductReadBackend
): TSupplierProductEditForm =>
	mapSupplierProductToEditForm(mapSupplierProductFromBackend(item));

export const mapSupplierProductGeneralToCreate = (
	input: TCreateSupplierProduct
): TCreateProductBodyBackend => {
	switch (input.typ) {
		case ENUM_SUPPLIER_TYPE.HOTEL:
			return mapHotelProductGeneralToCreate(input.values, input.language);
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return mapTrainProductGeneralToCreate(input.values, input.language);
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return mapFlightProductGeneralToCreate(
				input.values,
				input.language
			);
		case ENUM_SUPPLIER_TYPE.BUS:
			return mapBusProductGeneralToCreate(input.values);
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return mapTransferProductGeneralToCreate(input.values);
		case ENUM_SUPPLIER_TYPE.ACTIVITY:
			return mapActivityProductGeneralToCreate(
				input.values,
				input.language
			);
	}
};

export const mapSupplierProductGeneralToUpdate = (
	input: TUpdateSupplierProduct
): TUpdateProductBodyBackend => {
	switch (input.typ) {
		case ENUM_SUPPLIER_TYPE.HOTEL:
			return mapHotelProductGeneralToUpdate(
				input.values,
				input.existing,
				input.language
			);
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return mapTrainProductGeneralToUpdate(
				input.values,
				input.existing,
				input.language
			);
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return mapFlightProductGeneralToUpdate(
				input.values,
				input.existing,
				input.language
			);
		case ENUM_SUPPLIER_TYPE.BUS:
			return mapBusProductGeneralToUpdate(input.values, input.existing);
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return mapTransferProductGeneralToUpdate(
				input.values,
				input.existing
			);
		case ENUM_SUPPLIER_TYPE.ACTIVITY:
			return mapActivityProductGeneralToUpdate(
				input.values,
				input.language
			);
	}
};

export const mapSupplierProductEditFormToPricingSwitch = (
	input: TSwitchSupplierProductPricing
): TSwitchProductPricingBodyBackend => {
	switch (input.typ) {
		case ENUM_SUPPLIER_TYPE.HOTEL:
			return mapHotelEditFormToPricingSwitch(
				input.values,
				input.existing
			);
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return mapTrainEditFormToPricingSwitch(input.values);
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return mapFlightEditFormToPricingSwitch(input.values);
		case ENUM_SUPPLIER_TYPE.BUS:
			return mapBusEditFormToPricingSwitch(input.values);
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return mapTransferEditFormToPricingSwitch(input.values);
	}
};

export const mapSupplierVariantFormToWrite = (
	input: TUpdateSupplierVariant
): TSupplierVariantWriteInput => {
	switch (input.typ) {
		case ENUM_SUPPLIER_TYPE.HOTEL:
			return {
				typ: ENUM_SUPPLIER_TYPE.HOTEL,
				pricing: input.existing.pricing,
				data: mapHotelRoomRowToVariantWrite(input.row, input.existing)
			};
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return {
				typ: ENUM_SUPPLIER_TYPE.TRAIN,
				pricing: input.existing.pricing,
				data: mapFareRowToVariantWrite(input.row, input.existing)
			};
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return {
				typ: ENUM_SUPPLIER_TYPE.FLIGHT,
				pricing: input.existing.pricing,
				data: mapFareRowToVariantWrite(input.row, input.existing)
			};
		case ENUM_SUPPLIER_TYPE.BUS:
			return {
				typ: ENUM_SUPPLIER_TYPE.BUS,
				pricing: input.existing.pricing,
				data: mapBusVehicleRowToVariantWrite(input.row, input.existing)
			};
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return {
				typ: ENUM_SUPPLIER_TYPE.TRANSFER,
				pricing: input.existing.pricing,
				data:
					input.variantWrite ??
					mapTransferCarRowToVariantWrite(input.row, input.existing)
			};
		case ENUM_SUPPLIER_TYPE.ACTIVITY:
			return {
				typ: ENUM_SUPPLIER_TYPE.ACTIVITY,
				data: mapActivityOfferingRowToVariantWrite(
					input.row,
					input.existing
				)
			};
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
