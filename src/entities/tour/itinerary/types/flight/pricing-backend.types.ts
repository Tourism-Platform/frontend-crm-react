import type {
	BusDetailSchemaOutput,
	CustomTrainDetailsOutput,
	FlightDetailsSchemaOutput,
	InheritedBusDetailsOutput,
	InheritedFlightDetailsOutput,
	InheritedTrainDetailsOutput
} from "@/shared/api";

export type TFlightDetailsBackend = FlightDetailsSchemaOutput;
export type TInheritedFlightDetailsBackend = InheritedFlightDetailsOutput;
export type TFlightEventDetailsBackend =
	| TFlightDetailsBackend
	| TInheritedFlightDetailsBackend;

export type TCustomTrainDetailsBackend = CustomTrainDetailsOutput;
export type TInheritedTrainDetailsBackend = InheritedTrainDetailsOutput;
export type TTrainDetailsBackend =
	| TCustomTrainDetailsBackend
	| TInheritedTrainDetailsBackend;

export type TBusDetailsBackend = BusDetailSchemaOutput;
export type TInheritedBusDetailsBackend = InheritedBusDetailsOutput;
export type TBusEventDetailsBackend =
	| TBusDetailsBackend
	| TInheritedBusDetailsBackend;

export type TTransportDetailsWithPricingBackend =
	| TFlightDetailsBackend
	| TCustomTrainDetailsBackend
	| TBusDetailsBackend;
