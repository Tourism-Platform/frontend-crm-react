import type {
	BusProductCreate,
	BusProductReadOutput,
	BusProductUpdate,
	BusVariantReadOutput,
	BusVariantWrite
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateBusProductBackend = Extract<
	TCreateProductBodyBackend,
	BusProductCreate
>;

export type TBusProductReadBackend = BusProductReadOutput;
export type TUpdateBusProductBackend = BusProductUpdate;
export type TBusVariantWriteBackend = BusVariantWrite;
export type TBusVariantReadBackend = BusVariantReadOutput;
