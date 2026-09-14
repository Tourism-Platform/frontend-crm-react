import type {
	ActivityProductCreate,
	ActivityProductDetails,
	ActivityProductReadOutput,
	ActivityProductUpdate,
	ActivityVariantWrite,
	FoodOfferingOutput,
	TicketedOfferingOutput
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateActivityProductBackend = Extract<
	TCreateProductBodyBackend,
	ActivityProductCreate
>;

export type TActivityProductReadBackend = ActivityProductReadOutput;
export type TUpdateActivityProductBackend = ActivityProductUpdate;
export type TActivityProductDetailsBackend = ActivityProductDetails;
export type TActivityVariantWriteBackend = ActivityVariantWrite;
export type TActivityVariantReadBackend =
	| TicketedOfferingOutput
	| FoodOfferingOutput;
