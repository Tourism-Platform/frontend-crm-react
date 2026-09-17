import type {
	BusProductCreate,
	BusProductReadOutput,
	BusProductUpdate,
	PerVehicleBusVariantWrite,
	PricedVehicleOutput,
	ToPerVehicle,
	ToWholeFleet,
	Vehicle,
	WholeBusVariantWrite
} from "@/shared/api/generated/Api";

import type { TCreateProductBodyBackend } from "../supplier-product-backend.types";

export type TCreateBusProductBackend = Extract<
	TCreateProductBodyBackend,
	BusProductCreate
>;

export type TBusProductReadBackend = BusProductReadOutput;
export type TUpdateBusProductBackend = BusProductUpdate;
export type TBusProductDetailsBackend = NonNullable<
	TUpdateBusProductBackend["details"]
>;
export type TBusVariantWriteBackend =
	| PerVehicleBusVariantWrite
	| WholeBusVariantWrite;
export type TBusVariantReadBackend = PricedVehicleOutput | Vehicle;
export type TBusPricingSwitchBackend = ToPerVehicle | ToWholeFleet;
