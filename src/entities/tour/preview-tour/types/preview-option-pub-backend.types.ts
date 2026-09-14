import type {
	ActivityEventPubReadOutput,
	BusEventPubReadOutput,
	EmptyDetailsPub,
	FlightEventPubReadOutput,
	HousingEventPubReadOutput,
	HousingRoomTypes,
	InformationEventPubReadOutput,
	LocationOutSchema,
	MultiEventPubOutput,
	TimeSchema,
	TrainEventPubReadOutput,
	TransferEventPubReadOutput,
	VehicleBodyType
} from "@/shared/api";

export type TFlightEventPubBackend = FlightEventPubReadOutput;
export type TTrainEventPubBackend = TrainEventPubReadOutput;
export type TBusEventPubBackend = BusEventPubReadOutput;
export type TTransferEventPubBackend = TransferEventPubReadOutput;
export type THousingEventPubBackend = HousingEventPubReadOutput;
export type TActivityEventPubBackend = ActivityEventPubReadOutput;
export type TInformationEventPubBackend = InformationEventPubReadOutput;
export type TMultiEventPubBackend = MultiEventPubOutput;
export type TPubLocationBackend = LocationOutSchema;
export type TPubTimeBackend = TimeSchema;
export type TPubEmptyDetailsBackend = EmptyDetailsPub;
export type TPubHousingRoomTypeBackend = HousingRoomTypes;
export type TPubVehicleBodyTypeBackend = VehicleBodyType;
