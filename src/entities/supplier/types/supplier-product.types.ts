import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { IPaginationRequest } from "@/shared/types";

import type { IActivityProduct, IActivityVariantWrite } from "./activity";
import type { TActivityProductGeneralSchema } from "./activity/product-form.types";
import type { IBusProduct, IBusVariantWrite } from "./bus";
import type { TBusProductGeneralSchema } from "./bus/product-form.types";
import type { IFlightProduct, IFlightVariantWrite } from "./flight";
import type { TFlightProductGeneralSchema } from "./flight/product-form.types";
import type { IHotelPolicy, IHotelProduct } from "./hotel";
import type { THotelProductGeneralSchema } from "./hotel/product-form.types";
import type { IHotelVariantWrite } from "./hotel/rooms.types";
import type { ENUM_SUPPLIER_TYPE_TYPE } from "./supplier-type.types";
import type { ITrainProduct, ITrainVariantWrite } from "./train";
import type { TTrainProductGeneralSchema } from "./train/product-form.types";
import type { ITransferProduct, ITransferVariantWrite } from "./transfer";
import type { TTransferProductGeneralSchema } from "./transfer/product-form.types";

export type TSupplierProduct =
	| IHotelProduct
	| ITrainProduct
	| IFlightProduct
	| IBusProduct
	| ITransferProduct
	| IActivityProduct;

export interface ISupplierProductFilters
	extends Omit<IPaginationRequest, "status"> {
	supplierId?: string;
	typ?: ENUM_SUPPLIER_TYPE_TYPE;
}

export interface IGetSupplierProduct {
	supplierId: string;
	productId: string;
}

export interface ICreateHotelProduct {
	supplierId: string;
	values: THotelProductGeneralSchema;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IUpdateHotelProduct {
	supplierId: string;
	productId: string;
	values: THotelProductGeneralSchema;
	language?: ENUM_LANGUAGES_TYPE;
	existingPolicy?: IHotelPolicy | null;
}

export interface ICreateTrainProduct {
	supplierId: string;
	values: TTrainProductGeneralSchema;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IUpdateTrainProduct {
	supplierId: string;
	productId: string;
	values: TTrainProductGeneralSchema;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IDeleteSupplierProduct {
	supplierId: string;
	productId: string;
}

export interface ICreateHotelVariant {
	supplierId: string;
	productId: string;
	data: IHotelVariantWrite;
}

export interface IUpdateHotelVariant {
	supplierId: string;
	productId: string;
	variantId: string;
	data: IHotelVariantWrite;
}

export interface IDeleteHotelVariant {
	supplierId: string;
	productId: string;
	variantId: string;
}

export interface ICreateTrainVariant {
	supplierId: string;
	productId: string;
	data: ITrainVariantWrite;
}

export interface IUpdateTrainVariant {
	supplierId: string;
	productId: string;
	variantId: string;
	data: ITrainVariantWrite;
}

export interface IDeleteTrainVariant {
	supplierId: string;
	productId: string;
	variantId: string;
}

export interface ICreateFlightProduct {
	supplierId: string;
	values: TFlightProductGeneralSchema;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IUpdateFlightProduct {
	supplierId: string;
	productId: string;
	values: TFlightProductGeneralSchema;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface ICreateFlightVariant {
	supplierId: string;
	productId: string;
	data: IFlightVariantWrite;
}

export interface IUpdateFlightVariant {
	supplierId: string;
	productId: string;
	variantId: string;
	data: IFlightVariantWrite;
}

export interface IDeleteFlightVariant {
	supplierId: string;
	productId: string;
	variantId: string;
}

export interface ICreateBusProduct {
	supplierId: string;
	values: TBusProductGeneralSchema;
}

export interface IUpdateBusProduct {
	supplierId: string;
	productId: string;
	values: TBusProductGeneralSchema;
}

export interface ICreateBusVariant {
	supplierId: string;
	productId: string;
	data: IBusVariantWrite;
}

export interface IUpdateBusVariant {
	supplierId: string;
	productId: string;
	variantId: string;
	data: IBusVariantWrite;
}

export interface IDeleteBusVariant {
	supplierId: string;
	productId: string;
	variantId: string;
}

export interface ICreateTransferProduct {
	supplierId: string;
	values: TTransferProductGeneralSchema;
}

export interface IUpdateTransferProduct {
	supplierId: string;
	productId: string;
	values: TTransferProductGeneralSchema;
}

export interface ICreateTransferVariant {
	supplierId: string;
	productId: string;
	data: ITransferVariantWrite;
}

export interface IUpdateTransferVariant {
	supplierId: string;
	productId: string;
	variantId: string;
	data: ITransferVariantWrite;
}

export interface IDeleteTransferVariant {
	supplierId: string;
	productId: string;
	variantId: string;
}

export interface ICreateActivityProduct {
	supplierId: string;
	values: TActivityProductGeneralSchema;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface IUpdateActivityProduct {
	supplierId: string;
	productId: string;
	values: TActivityProductGeneralSchema;
	language?: ENUM_LANGUAGES_TYPE;
}

export interface ICreateActivityVariant {
	supplierId: string;
	productId: string;
	data: IActivityVariantWrite;
}

export interface IUpdateActivityVariant {
	supplierId: string;
	productId: string;
	variantId: string;
	data: IActivityVariantWrite;
}

export interface IDeleteActivityVariant {
	supplierId: string;
	productId: string;
	variantId: string;
}
