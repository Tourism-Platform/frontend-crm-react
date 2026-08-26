import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { IPaginationRequest } from "@/shared/types";

import type { THotelProductGeneralSchema } from "../schema/hotel-product.schema";
import type { TTrainProductGeneralSchema } from "../schema/train-product.schema";

import type { IHotelPolicy, IHotelProduct } from "./hotel";
import type { IHotelVariantWrite } from "./hotel/rooms.types";
import type { ENUM_SUPPLIER_TYPE_TYPE } from "./supplier-type.types";
import type { ITrainProduct, ITrainVariantWrite } from "./train";

export type TSupplierProduct = IHotelProduct | ITrainProduct;

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
