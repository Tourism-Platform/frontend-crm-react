import type {
	BusDetailSchemaOutput,
	FlightDetailsSchemaOutput,
	TrainDetailSchemaOutput
} from "@/shared/api";

export type TFlightDetailsBackend = FlightDetailsSchemaOutput;
export type TTrainDetailsBackend = TrainDetailSchemaOutput;
export type TBusDetailsBackend = BusDetailSchemaOutput;

export type TTransportDetailsWithPricingBackend =
	| TFlightDetailsBackend
	| TTrainDetailsBackend
	| TBusDetailsBackend;
