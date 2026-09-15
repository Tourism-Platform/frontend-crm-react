import type {
	Car,
	CategorisedCarOutput,
	PerCarCategoryTransferVariantWrite,
	PerCarTransferVariantWrite,
	PricedCarOutput,
	ToPerCar,
	ToPerCarCategory,
	ToWholeTransfer,
	TransferProductCreate,
	TransferProductReadOutput,
	TransferProductUpdate,
	WholeTransferVariantWrite
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateTransferProductBackend = Extract<
	TCreateProductBodyBackend,
	TransferProductCreate
>;

export type TTransferProductReadBackend = TransferProductReadOutput;
export type TUpdateTransferProductBackend = TransferProductUpdate;
export type TTransferProductDetailsBackend = NonNullable<
	TUpdateTransferProductBackend["details"]
>;
export type TTransferVariantWriteBackend =
	| PerCarTransferVariantWrite
	| PerCarCategoryTransferVariantWrite
	| WholeTransferVariantWrite;
export type TTransferVariantReadBackend =
	| PricedCarOutput
	| CategorisedCarOutput
	| Car;
export type TTransferPricingSwitchBackend =
	| ToPerCar
	| ToPerCarCategory
	| ToWholeTransfer;
