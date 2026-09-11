import type {
	ActivityProductCreate,
	ActivityProductReadOutput,
	ActivityProductUpdate,
	ActivityVariantReadOutput,
	ActivityVariantWrite
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateActivityProductBackend = Extract<
	TCreateProductBodyBackend,
	ActivityProductCreate
>;

export type TActivityProductReadBackend = ActivityProductReadOutput;
export type TUpdateActivityProductBackend = ActivityProductUpdate;
export type TActivityVariantWriteBackend = ActivityVariantWrite;
export type TActivityVariantReadBackend = ActivityVariantReadOutput;
export type TActivityVariantChargeInputBackend = NonNullable<
	ActivityVariantWrite["details"]
>["expenses"];
