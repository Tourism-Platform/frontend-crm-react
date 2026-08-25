import type {
	TrainHopSchemaInput,
	TrainProductCreate,
	TrainProductReadOutput,
	TrainProductUpdate,
	TrainVariantReadOutput,
	TrainVariantWrite
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateTrainProductBackend = Extract<
	TCreateProductBodyBackend,
	TrainProductCreate
>;

export type TTrainProductReadBackend = TrainProductReadOutput;
export type TUpdateTrainProductBackend = TrainProductUpdate;
export type TTrainVariantWriteBackend = TrainVariantWrite;
export type TTrainVariantReadBackend = TrainVariantReadOutput;
export type TTrainHopInputBackend = TrainHopSchemaInput;
export type TTrainVariantChargeInputBackend = NonNullable<
	TrainVariantWrite["details"]
>["expenses"];
