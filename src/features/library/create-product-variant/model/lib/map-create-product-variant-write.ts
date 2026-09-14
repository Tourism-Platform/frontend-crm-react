import {
	ENUM_SUPPLIER_TYPE,
	type TSupplierVariantWriteInput,
	emptyActivityVariantForm,
	emptyBusVariantForm,
	emptyFlightVariantForm,
	emptyHotelVariantForm,
	emptyTrainVariantForm,
	emptyTransferVariantForm,
	mapActivityVariantFormToWrite,
	mapBusVariantFormToWrite,
	mapFlightVariantFormToWrite,
	mapHotelVariantFormToWrite,
	mapTrainVariantFormToWrite,
	mapTransferVariantFormToWrite
} from "@/entities/supplier";

import type { TCreateProductVariantProps } from "../config";

export const mapCreateProductVariantWrite = (
	props: TCreateProductVariantProps,
	name: string
): TSupplierVariantWriteInput => {
	switch (props.typ) {
		case ENUM_SUPPLIER_TYPE.HOTEL:
			return {
				typ: props.typ,
				pricing: props.pricing,
				data: mapHotelVariantFormToWrite({
					...emptyHotelVariantForm(),
					name
				})
			};
		case ENUM_SUPPLIER_TYPE.TRAIN:
			return {
				typ: props.typ,
				pricing: props.pricing,
				data: mapTrainVariantFormToWrite({
					...emptyTrainVariantForm(),
					name
				})
			};
		case ENUM_SUPPLIER_TYPE.FLIGHT:
			return {
				typ: props.typ,
				pricing: props.pricing,
				data: mapFlightVariantFormToWrite({
					...emptyFlightVariantForm(),
					name
				})
			};
		case ENUM_SUPPLIER_TYPE.BUS:
			return {
				typ: props.typ,
				pricing: props.pricing,
				data: mapBusVariantFormToWrite({
					...emptyBusVariantForm(),
					name
				})
			};
		case ENUM_SUPPLIER_TYPE.TRANSFER:
			return {
				typ: props.typ,
				pricing: props.pricing,
				data: mapTransferVariantFormToWrite({
					...emptyTransferVariantForm(),
					name
				})
			};
		case ENUM_SUPPLIER_TYPE.ACTIVITY:
			return {
				typ: props.typ,
				data: mapActivityVariantFormToWrite({
					...emptyActivityVariantForm(),
					name
				})
			};
	}
};
