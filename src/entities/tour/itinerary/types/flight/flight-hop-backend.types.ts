import type {
	BusHopSchemaInput,
	BusHopSchemaOutput,
	BusJourneyPointSchemaInput,
	FlightHopSchemaInput,
	FlightHopSchemaOutput,
	FlightLegSchemaOutput,
	TrainHopSchemaInput,
	TrainHopSchemaOutput,
	TrainJourneyPointSchemaOutput,
	TrainLegSchemaOutput
} from "@/shared/api";

export type TFlightHopInputBackend = FlightHopSchemaInput;
export type TFlightHopOutputBackend = FlightHopSchemaOutput;
export type TFlightLegOutputBackend = FlightLegSchemaOutput;

export type TTrainHopInputBackend = TrainHopSchemaInput;
export type TTrainHopOutputBackend = TrainHopSchemaOutput;
export type TTrainLegOutputBackend = TrainLegSchemaOutput;
export type TTrainJourneyPointOutputBackend = TrainJourneyPointSchemaOutput;

export type TBusHopInputBackend = BusHopSchemaInput;
export type TBusHopOutputBackend = BusHopSchemaOutput;
export type TBusJourneyPointInputBackend = BusJourneyPointSchemaInput;
