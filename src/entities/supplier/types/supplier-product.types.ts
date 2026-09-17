import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { IPaginationRequest } from "@/shared/types";

import type { IActivityProduct, IActivityVariantWrite } from "./activity";
import type { TActivityProductGeneralSchema } from "./activity/product-form.types";
import type {
	ENUM_BUS_PRICING_TYPE,
	IBusProduct,
	IBusVariantWrite
} from "./bus";
import type {
	TBusProductEditSchema,
	TBusProductGeneralSchema
} from "./bus/product-form.types";
import type {
	ENUM_FLIGHT_PRICING_TYPE,
	IFlightProduct,
	IFlightVariantWrite
} from "./flight";
import type {
	TFlightProductEditSchema,
	TFlightProductGeneralSchema
} from "./flight/product-form.types";
import type {
	ENUM_HOTEL_PRICING_TYPE,
	IHotelProduct,
	IHotelVariantWrite
} from "./hotel";
import type {
	THotelProductEditSchema,
	THotelProductGeneralSchema
} from "./hotel/product-form.types";
import {
	ENUM_SUPPLIER_TYPE,
	type ENUM_SUPPLIER_TYPE_TYPE
} from "./supplier-type.types";
import type {
	ENUM_TRAIN_PRICING_TYPE,
	ITrainProduct,
	ITrainVariantWrite
} from "./train";
import type {
	TTrainProductEditSchema,
	TTrainProductGeneralSchema
} from "./train/product-form.types";
import type {
	ENUM_TRANSFER_PRICING_TYPE,
	ITransferProduct,
	ITransferVariantWrite
} from "./transfer";
import type {
	TTransferProductEditSchema,
	TTransferProductGeneralSchema
} from "./transfer/product-form.types";

export type TSupplierProduct =
	| IHotelProduct
	| ITrainProduct
	| IFlightProduct
	| IBusProduct
	| ITransferProduct
	| IActivityProduct;

/** asyncSelect option — domain product + label/value required by CustomAsyncSelect */
export type TSupplierProductSelectOption = {
	label: string;
	value: string;
} & TSupplierProduct;

export interface ISupplierProductFilters
	extends Omit<IPaginationRequest, "status"> {
	supplierId?: string;
	typ?: ENUM_SUPPLIER_TYPE_TYPE;
}

export interface IGetSupplierProduct {
	supplierId: string;
	productId: string;
}

/**
 * Result of the create-variant route: the new variant id together with the
 * freshly read product it landed on.
 */
export interface ISupplierVariantCreated<
	TProduct extends TSupplierProduct = TSupplierProduct
> {
	variantId: string;
	product: TProduct;
}

export type TSupplierVariantWriteInput =
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.HOTEL;
			pricing: ENUM_HOTEL_PRICING_TYPE;
			data: IHotelVariantWrite;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRAIN;
			pricing: ENUM_TRAIN_PRICING_TYPE;
			data: ITrainVariantWrite;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.FLIGHT;
			pricing: ENUM_FLIGHT_PRICING_TYPE;
			data: IFlightVariantWrite;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.BUS;
			pricing: ENUM_BUS_PRICING_TYPE;
			data: IBusVariantWrite;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRANSFER;
			pricing: ENUM_TRANSFER_PRICING_TYPE;
			data: ITransferVariantWrite;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.ACTIVITY;
			data: IActivityVariantWrite;
	  };

export type TCreateSupplierVariant = {
	supplierId: string;
	productId: string;
} & TSupplierVariantWriteInput;

export type TUpdateSupplierVariant = TCreateSupplierVariant & {
	variantId: string;
};

export interface IDeleteSupplierVariant {
	supplierId: string;
	productId: string;
	variantId: string;
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
	existing?: IHotelProduct | null;
}

export interface ISwitchHotelProductPricing {
	supplierId: string;
	productId: string;
	values: THotelProductEditSchema;
	existing: IHotelProduct;
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
	existing?: ITrainProduct | null;
}

export interface ISwitchTrainProductPricing {
	supplierId: string;
	productId: string;
	values: TTrainProductEditSchema;
}

export interface IDeleteSupplierProduct {
	supplierId: string;
	productId: string;
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
	existing?: IFlightProduct | null;
}

export interface ISwitchFlightProductPricing {
	supplierId: string;
	productId: string;
	values: TFlightProductEditSchema;
}

export interface ICreateBusProduct {
	supplierId: string;
	values: TBusProductGeneralSchema;
}

export interface IUpdateBusProduct {
	supplierId: string;
	productId: string;
	values: TBusProductGeneralSchema;
	existing?: IBusProduct | null;
}

export interface ISwitchBusProductPricing {
	supplierId: string;
	productId: string;
	values: TBusProductEditSchema;
}

export interface ICreateTransferProduct {
	supplierId: string;
	values: TTransferProductGeneralSchema;
}

export interface IUpdateTransferProduct {
	supplierId: string;
	productId: string;
	values: TTransferProductGeneralSchema;
	existing?: ITransferProduct | null;
}

export interface ISwitchTransferProductPricing {
	supplierId: string;
	productId: string;
	values: TTransferProductEditSchema;
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
