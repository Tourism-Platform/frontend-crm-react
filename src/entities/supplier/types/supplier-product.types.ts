import type { ENUM_LANGUAGES_TYPE } from "@/shared/config";
import type { IPaginationRequest } from "@/shared/types";

import type {
	IActivityProduct,
	IActivityVariantWrite,
	TActivityProductEditSchema,
	TActivityProductGeneralSchema,
	TActivityVariantRow
} from "./activity";
import type {
	ENUM_BUS_PRICING_TYPE,
	IBusProduct,
	IBusVariantWrite,
	TBusProductEditSchema,
	TBusProductGeneralSchema,
	TBusVehicleRow
} from "./bus";
import type {
	ENUM_FLIGHT_PRICING_TYPE,
	IFlightProduct,
	IFlightVariantWrite,
	TFlightFareRow,
	TFlightProductEditSchema,
	TFlightProductGeneralSchema
} from "./flight";
import type {
	ENUM_HOTEL_PRICING_TYPE,
	IHotelProduct,
	IHotelVariantWrite,
	THotelProductEditSchema,
	THotelProductGeneralSchema,
	THotelRoomRow
} from "./hotel";
import {
	ENUM_SUPPLIER_TYPE,
	type ENUM_SUPPLIER_TYPE_TYPE
} from "./supplier-type.types";
import type {
	ENUM_TRAIN_PRICING_TYPE,
	ITrainProduct,
	ITrainVariantWrite,
	TTrainFareRow,
	TTrainProductEditSchema,
	TTrainProductGeneralSchema
} from "./train";
import type {
	ENUM_TRANSFER_PRICING_TYPE,
	ITransferProduct,
	ITransferVariantWrite,
	TTransferCarRow,
	TTransferProductEditSchema,
	TTransferProductGeneralSchema
} from "./transfer";

export type TSupplierProduct =
	| IHotelProduct
	| ITrainProduct
	| IFlightProduct
	| IBusProduct
	| ITransferProduct
	| IActivityProduct;

export type TSupplierProductEditForm =
	| THotelProductEditSchema
	| TTrainProductEditSchema
	| TFlightProductEditSchema
	| TBusProductEditSchema
	| TTransferProductEditSchema
	| TActivityProductEditSchema;

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

export type TUpdateSupplierVariant =
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.HOTEL;
			supplierId: string;
			productId: string;
			variantId: string;
			row: THotelRoomRow;
			existing: IHotelProduct;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRAIN;
			supplierId: string;
			productId: string;
			variantId: string;
			row: TTrainFareRow;
			existing: ITrainProduct;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.FLIGHT;
			supplierId: string;
			productId: string;
			variantId: string;
			row: TFlightFareRow;
			existing: IFlightProduct;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.BUS;
			supplierId: string;
			productId: string;
			variantId: string;
			row: TBusVehicleRow;
			existing: IBusProduct;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRANSFER;
			supplierId: string;
			productId: string;
			variantId: string;
			row: TTransferCarRow;
			existing: ITransferProduct;
			variantWrite?: ITransferVariantWrite;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.ACTIVITY;
			supplierId: string;
			productId: string;
			variantId: string;
			row: TActivityVariantRow;
			existing: IActivityProduct;
	  };

export interface IDeleteSupplierVariant {
	supplierId: string;
	productId: string;
	variantId: string;
}

export interface IDeleteSupplierProduct {
	supplierId: string;
	productId: string;
}

export type TCreateSupplierProduct =
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.HOTEL;
			supplierId: string;
			values: THotelProductGeneralSchema;
			language?: ENUM_LANGUAGES_TYPE;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRAIN;
			supplierId: string;
			values: TTrainProductGeneralSchema;
			language?: ENUM_LANGUAGES_TYPE;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.FLIGHT;
			supplierId: string;
			values: TFlightProductGeneralSchema;
			language?: ENUM_LANGUAGES_TYPE;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.BUS;
			supplierId: string;
			values: TBusProductGeneralSchema;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRANSFER;
			supplierId: string;
			values: TTransferProductGeneralSchema;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.ACTIVITY;
			supplierId: string;
			values: TActivityProductGeneralSchema;
			language?: ENUM_LANGUAGES_TYPE;
	  };

export type TUpdateSupplierProduct =
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.HOTEL;
			supplierId: string;
			productId: string;
			values: THotelProductGeneralSchema;
			language?: ENUM_LANGUAGES_TYPE;
			existing?: IHotelProduct | null;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRAIN;
			supplierId: string;
			productId: string;
			values: TTrainProductGeneralSchema;
			language?: ENUM_LANGUAGES_TYPE;
			existing?: ITrainProduct | null;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.FLIGHT;
			supplierId: string;
			productId: string;
			values: TFlightProductGeneralSchema;
			language?: ENUM_LANGUAGES_TYPE;
			existing?: IFlightProduct | null;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.BUS;
			supplierId: string;
			productId: string;
			values: TBusProductGeneralSchema;
			existing?: IBusProduct | null;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRANSFER;
			supplierId: string;
			productId: string;
			values: TTransferProductGeneralSchema;
			existing?: ITransferProduct | null;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.ACTIVITY;
			supplierId: string;
			productId: string;
			values: TActivityProductGeneralSchema;
			language?: ENUM_LANGUAGES_TYPE;
	  };

export type TSwitchSupplierProductPricing =
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.HOTEL;
			supplierId: string;
			productId: string;
			values: THotelProductEditSchema;
			existing: IHotelProduct;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRAIN;
			supplierId: string;
			productId: string;
			values: TTrainProductEditSchema;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.FLIGHT;
			supplierId: string;
			productId: string;
			values: TFlightProductEditSchema;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.BUS;
			supplierId: string;
			productId: string;
			values: TBusProductEditSchema;
	  }
	| {
			typ: typeof ENUM_SUPPLIER_TYPE.TRANSFER;
			supplierId: string;
			productId: string;
			values: TTransferProductEditSchema;
	  };
