import type {
	BusDetailSchemaOutput,
	CustomTrainDetailsOutput,
	FlightDetailsSchemaOutput,
	InheritedTrainDetailsOutput
} from "@/shared/api";

export type TFlightDetailsBackend = FlightDetailsSchemaOutput;
export type TCustomTrainDetailsBackend = CustomTrainDetailsOutput;
export type TInheritedTrainDetailsBackend = InheritedTrainDetailsOutput;
export type TTrainDetailsBackend =
	| TCustomTrainDetailsBackend
	| TInheritedTrainDetailsBackend;
export type TBusDetailsBackend = BusDetailSchemaOutput;

export type TTransportDetailsWithPricingBackend =
	| TFlightDetailsBackend
	| TCustomTrainDetailsBackend
	| TBusDetailsBackend;
