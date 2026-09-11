import type {
	FlightLegSchemaInput,
	FlightProductCreate,
	FlightProductReadOutput,
	FlightProductUpdate,
	FlightVariantReadOutput,
	FlightVariantWrite
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateFlightProductBackend = Extract<
	TCreateProductBodyBackend,
	FlightProductCreate
>;

export type TFlightProductReadBackend = FlightProductReadOutput;
export type TUpdateFlightProductBackend = FlightProductUpdate;
export type TFlightVariantWriteBackend = FlightVariantWrite;
export type TFlightVariantReadBackend = FlightVariantReadOutput;
export type TFlightHopInputBackend = FlightLegSchemaInput;
export type TFlightVariantChargeInputBackend = NonNullable<
	FlightVariantWrite["details"]
>["expenses"];
