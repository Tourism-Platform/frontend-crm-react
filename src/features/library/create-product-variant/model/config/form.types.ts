import type {
	TActivityProductEditPageKeys,
	TBusProductEditPageKeys,
	TFlightProductEditPageKeys,
	THotelProductEditPageKeys,
	TTrainProductEditPageKeys,
	TTransferProductEditPageKeys
} from "@/shared/config";
import type { TFormField } from "@/shared/types";

import {
	type ENUM_BUS_PRICING_TYPE,
	type ENUM_FLIGHT_PRICING_TYPE,
	type ENUM_HOTEL_PRICING_TYPE,
	ENUM_SUPPLIER_TYPE,
	type ENUM_TRAIN_PRICING_TYPE,
	type ENUM_TRANSFER_PRICING_TYPE,
	type TActivityVariantCreateSchema,
	type TBusVariantCreateSchema,
	type TFlightVariantCreateSchema,
	type THotelVariantCreateSchema,
	type TTrainVariantCreateSchema,
	type TTransferVariantCreateSchema
} from "@/entities/supplier";

export type TProductVariantPageNs =
	| "hotel_product_edit_page"
	| "train_product_edit_page"
	| "flight_product_edit_page"
	| "bus_product_edit_page"
	| "transfer_product_edit_page"
	| "activity_product_edit_page";

export type TForm = Extract<
	TFormField<
		| THotelProductEditPageKeys
		| TTrainProductEditPageKeys
		| TFlightProductEditPageKeys
		| TBusProductEditPageKeys
		| TTransferProductEditPageKeys
		| TActivityProductEditPageKeys,
		"name"
	>,
	{ fieldType?: "input" }
>;

export type TCreateProductVariantForm = THotelVariantCreateSchema &
	TTrainVariantCreateSchema &
	TFlightVariantCreateSchema &
	TBusVariantCreateSchema &
	TTransferVariantCreateSchema &
	TActivityVariantCreateSchema;

export type TCreateProductVariantProps = {
	supplierId: string;
	productId: string;
	ns: TProductVariantPageNs;
	onSuccess?: (variantId: string) => void;
} & (
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.HOTEL;
			pricing: ENUM_HOTEL_PRICING_TYPE;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRAIN;
			pricing: ENUM_TRAIN_PRICING_TYPE;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.FLIGHT;
			pricing: ENUM_FLIGHT_PRICING_TYPE;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.BUS;
			pricing: ENUM_BUS_PRICING_TYPE;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRANSFER;
			pricing: ENUM_TRANSFER_PRICING_TYPE;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.ACTIVITY;
	  }
);
