import type {
	Fare,
	PerFareTrainVariantWrite,
	PricedFareOutput,
	ToPerFare,
	ToWholeRoute,
	TrainLegInput,
	TrainLegOutput,
	TrainProductCreate,
	TrainProductReadOutput,
	TrainProductUpdate,
	WholeTrainVariantWrite
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateTrainProductBackend = Extract<
	TCreateProductBodyBackend,
	TrainProductCreate
>;

export type TTrainProductReadBackend = TrainProductReadOutput;
export type TUpdateTrainProductBackend = TrainProductUpdate;
export type TTrainProductDetailsBackend = NonNullable<
	TUpdateTrainProductBackend["details"]
>;
export type TTrainVariantWriteBackend =
	| PerFareTrainVariantWrite
	| WholeTrainVariantWrite;
export type TTrainVariantReadBackend = PricedFareOutput | Fare;
export type TTrainLegInputBackend = TrainLegInput;
export type TTrainLegReadBackend = TrainLegOutput;
export type TTrainPricingSwitchBackend = ToPerFare | ToWholeRoute;
