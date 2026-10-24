import type {
	ActivityInlineSupplyNew,
	ActivityOverrideInput,
	ActivityOverrideOutput,
	AllVariants,
	BusDetailsOutput,
	BusDetailsWrite,
	BusInlineSupplyNew,
	BusLegInput,
	BusLegOutput,
	BusOverrideInput,
	BusOverrideOutput,
	BusPointInput,
	DurationChargeInput,
	DurationChargeOutput,
	EventImageSchema,
	FixedChargeInput,
	FixedChargeOutput,
	FixedExpenseInput,
	FixedExpenseOutput,
	FlightDetailsOutput,
	FlightDetailsWrite,
	FlightInlineSupplyNew,
	GeneralVenueOutput,
	GroupSizeTierInput,
	GroupSizeTierOutput,
	GuideDetailsWrite,
	GuideSpecInput,
	HotelOverrideInput,
	HotelOverrideOutput,
	HousingDetailsOutput,
	HousingDetailsWrite,
	HousingInlineSupplyNew,
	InformationDetailsOutput,
	OnlyVariants,
	PerPersonChargeInput,
	PerPersonChargeOutput,
	PricedCategoryOutput,
	PricedRoomOutput,
	ProductSupplyNew,
	RoomRateInput,
	RouteOverrideInput,
	RouteOverrideOutput,
	Schedule,
	Stay,
	SupplementaryDetailsOutput,
	SupplementaryDetailsWrite,
	TrainDetailsOutput,
	TrainDetailsWrite,
	TrainInlineSupplyNew,
	TrainStopInput,
	TransferDetailsWrite,
	TransferInlineSupplyNew,
	TransferLegInput,
	TransferOverrideInput,
	TransferOverrideOutput,
	TransferPointInput
} from "@/shared/api";

export type TFixedChargeBackend = FixedChargeOutput;
export type TFixedChargeInputBackend = FixedChargeInput;

export type TDurationChargeBackend = DurationChargeOutput;
export type TDurationChargeInputBackend = DurationChargeInput;

export type TPerPersonChargeBackend = PerPersonChargeOutput;
export type TPerPersonChargeInputBackend = PerPersonChargeInput;

export type TFixedExpenseBackend = FixedExpenseOutput;
export type TFixedExpenseInputBackend = FixedExpenseInput;

export type TPerGroupTierBackend = GroupSizeTierOutput;
export type TPerGroupTierInputBackend = GroupSizeTierInput;

export type TCommissionMarkupBackend = NonNullable<FixedChargeOutput["markup"]>;
export type TCommissionMarkupInputBackend = NonNullable<
	FixedChargeInput["markup"]
>;
export type TBusDetailsOutputBackend = BusDetailsOutput;
export type TFlightDetailsOutputBackend = FlightDetailsOutput;
export type THousingDetailsOutputBackend = HousingDetailsOutput;
export type TInformationDetailsOutputBackend = InformationDetailsOutput;
export type TSupplementaryDetailsOutputBackend = SupplementaryDetailsOutput;
export type TPricedCategoryOutputBackend = PricedCategoryOutput;
export type TPricedRoomOutputBackend = PricedRoomOutput;
export type THousingDetailsWriteBackend = HousingDetailsWrite;
export type TStayBackend = Stay;
export type THotelOverrideInputBackend = HotelOverrideInput;
export type THotelOverrideOutputBackend = HotelOverrideOutput;
export type TActivityOverrideInputBackend = ActivityOverrideInput;
export type TActivityOverrideOutputBackend = ActivityOverrideOutput;
export type TActivityInlineSupplyNewBackend = ActivityInlineSupplyNew;
export type TAllVariantsBackend = AllVariants;
export type TBusDetailsWriteBackend = BusDetailsWrite;
export type TBusInlineSupplyNewBackend = BusInlineSupplyNew;
export type TFlightDetailsWriteBackend = FlightDetailsWrite;
export type TFlightInlineSupplyNewBackend = FlightInlineSupplyNew;
export type TGuideDetailsWriteBackend = GuideDetailsWrite;
export type THousingInlineSupplyNewBackend = HousingInlineSupplyNew;
export type TOnlyVariantsBackend = OnlyVariants;
export type TProductSupplyNewBackend = ProductSupplyNew;
export type TSupplementaryDetailsWriteBackend = SupplementaryDetailsWrite;
export type TTrainDetailsOutputBackend = TrainDetailsOutput;
export type TTrainDetailsWriteBackend = TrainDetailsWrite;
export type TTrainInlineSupplyNewBackend = TrainInlineSupplyNew;
export type TTransferDetailsWriteBackend = TransferDetailsWrite;
export type TTransferInlineSupplyNewBackend = TransferInlineSupplyNew;
export type TBusOverrideInputBackend = BusOverrideInput;
export type TRoomRateInputBackend = RoomRateInput;
export type TRouteOverrideInputBackend = RouteOverrideInput;
export type TTransferOverrideInputBackend = TransferOverrideInput;
export type TBusOverrideOutputBackend = BusOverrideOutput;
export type TRouteOverrideOutputBackend = RouteOverrideOutput;
export type TTransferOverrideOutputBackend = TransferOverrideOutput;
export type TGuideSpecInputBackend = GuideSpecInput;
export type TTransferLegInputBackend = TransferLegInput;
export type TTransferPointInputBackend = TransferPointInput;
export type TScheduleBackend = Schedule;
export type TBusLegInputBackend = BusLegInput;
export type TBusLegOutputBackend = BusLegOutput;
export type TBusPointInputBackend = BusPointInput;
export type TTrainStopInputBackend = TrainStopInput;
export type TEventImageSchemaBackend = EventImageSchema;
export type TGeneralVenueOutputBackend = GeneralVenueOutput;
