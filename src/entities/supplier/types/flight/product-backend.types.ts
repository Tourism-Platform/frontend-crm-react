import type {
	Fare,
	FlightLegInput,
	FlightLegOutput,
	FlightProductCreate,
	FlightProductReadOutput,
	FlightProductUpdate,
	PerFareFlightVariantWrite,
	PricedFareOutput,
	ToPerFare,
	ToWholeRoute,
	WholeFlightVariantWrite
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateFlightProductBackend = Extract<
	TCreateProductBodyBackend,
	FlightProductCreate
>;

export type TFlightProductReadBackend = FlightProductReadOutput;
export type TUpdateFlightProductBackend = FlightProductUpdate;
export type TFlightProductDetailsBackend = NonNullable<
	TUpdateFlightProductBackend["details"]
>;
export type TFlightVariantWriteBackend =
	| PerFareFlightVariantWrite
	| WholeFlightVariantWrite;
export type TFlightVariantReadBackend = PricedFareOutput | Fare;
export type TFlightLegInputBackend = FlightLegInput;
export type TFlightLegReadBackend = FlightLegOutput;
export type TFlightPricingSwitchBackend = ToPerFare | ToWholeRoute;
