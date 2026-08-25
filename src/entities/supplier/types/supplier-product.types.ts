import type { IPaginationRequest } from "@/shared/types";

import type {
	IHotelProduct,
	IHotelProductCreate,
	IHotelProductDetails
} from "./hotel";
import type { IHotelVariantWrite } from "./hotel/rooms.types";
import type { ENUM_SUPPLIER_TYPE_TYPE } from "./supplier-type.types";
import type {
	ITrainHop,
	ITrainProduct,
	ITrainProductCreate,
	ITrainVariantWrite
} from "./train";

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
	data: IHotelProductCreate;
}

export interface IUpdateHotelProductName {
	supplierId: string;
	productId: string;
	name: string;
}

export interface IUpdateHotelProductDetails {
	supplierId: string;
	productId: string;
	data: IHotelProductDetails;
}

export interface ICreateTrainProduct {
	supplierId: string;
	data: ITrainProductCreate;
}

export interface IUpdateTrainProductName {
	supplierId: string;
	productId: string;
	name: string;
}

export interface IUpdateTrainProductHops {
	supplierId: string;
	productId: string;
	hops: ITrainHop[];
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
