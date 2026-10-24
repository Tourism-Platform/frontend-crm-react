import {
	BreakdownLineKind,
	DetachKeep,
	ExpenseType,
	GeneralVenueInputSubTypEnum,
	GuideType,
	PricingWarning,
	RouteOverrideInputTypEnum,
	RouteOverrideOutputTypEnum,
	SupplierPolicyWarning,
	TransferTypes,
	TranslationState
} from "@/shared/api";

export const ENUM_BREAKDOWN_LINE_KIND_BACKEND = {
	UNIT: BreakdownLineKind.Unit,
	EXTRA_COST: BreakdownLineKind.ExtraCost,
	SURCHARGE: BreakdownLineKind.Surcharge
} as const;

export type ENUM_BREAKDOWN_LINE_KIND_BACKEND_TYPE = BreakdownLineKind;

export const ENUM_EXPENSE_TYPE_BACKEND = {
	FIXED: ExpenseType.Fixed,
	PER_PERSON: ExpenseType.PerPerson,
	PER_GROUP: ExpenseType.PerGroup,
	PER_DURATION: ExpenseType.PerDuration,
	PER_CAR: ExpenseType.PerCar,
	PER_CAR_CATEGORY: ExpenseType.PerCarCategory,
	PER_ROOM: ExpenseType.PerRoom,
	PER_ROOM_CATEGORY: ExpenseType.PerRoomCategory
} as const;

export type ENUM_EXPENSE_TYPE_BACKEND_TYPE = ExpenseType;

export const ENUM_PRICING_WARNING_BACKEND = {
	FLAT_CHARGE_ON_MULTI_NIGHT_STAY: PricingWarning.FlatChargeOnMultiNightStay,
	FLAT_CHARGE_ON_MULTI_DAY_GUIDE: PricingWarning.FlatChargeOnMultiDayGuide,
	FIXED_CHARGE_ON_SIGHTSEEING: PricingWarning.FixedChargeOnSightseeing,
	EMPTY_SUPPLY: PricingWarning.EmptySupply,
	ZERO_COST: PricingWarning.ZeroCost
} as const;

export type ENUM_PRICING_WARNING_BACKEND_TYPE = PricingWarning;

export const ENUM_TRANSLATION_STATE_BACKEND = {
	SOURCE: TranslationState.Source,
	READY: TranslationState.Ready,
	PENDING: TranslationState.Pending
} as const;

export type ENUM_TRANSLATION_STATE_BACKEND_TYPE = TranslationState;

export const ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND = {
	MASTER_CLASS: GeneralVenueInputSubTypEnum.MasterClass,
	SIGHTSEEING: GeneralVenueInputSubTypEnum.Sightseeing,
	OUTDOOR: GeneralVenueInputSubTypEnum.Outdoor,
	RIDING: GeneralVenueInputSubTypEnum.Riding,
	EXTREME: GeneralVenueInputSubTypEnum.Extreme,
	WELLNESS: GeneralVenueInputSubTypEnum.Wellness,
	ENTERTAINMENT: GeneralVenueInputSubTypEnum.Entertainment,
	WATER_ACTIVITIES: GeneralVenueInputSubTypEnum.WaterActivities,
	PHOTOGRAPHY: GeneralVenueInputSubTypEnum.Photography,
	SPIRITUAL: GeneralVenueInputSubTypEnum.Spiritual,
	OTHER: GeneralVenueInputSubTypEnum.Other
} as const;

export type ENUM_GENERAL_VENUE_INPUT_SUB_TYP_BACKEND_TYPE =
	GeneralVenueInputSubTypEnum;

export const ENUM_ROUTE_OVERRIDE_INPUT_TYP_BACKEND = {
	TRAIN: RouteOverrideInputTypEnum.Train,
	FLIGHT: RouteOverrideInputTypEnum.Flight
} as const;

export type ENUM_ROUTE_OVERRIDE_INPUT_TYP_BACKEND_TYPE =
	RouteOverrideInputTypEnum;

export const ENUM_ROUTE_OVERRIDE_OUTPUT_TYP_BACKEND = {
	TRAIN: RouteOverrideOutputTypEnum.Train,
	FLIGHT: RouteOverrideOutputTypEnum.Flight
} as const;

export type ENUM_ROUTE_OVERRIDE_OUTPUT_TYP_BACKEND_TYPE =
	RouteOverrideOutputTypEnum;

export const ENUM_SUPPLIER_POLICY_WARNING_BACKEND = {
	EARLY_CHECK_IN: SupplierPolicyWarning.EarlyCheckIn,
	LATE_CHECK_OUT: SupplierPolicyWarning.LateCheckOut,
	SUPPLIER_TYPE_MISMATCH: SupplierPolicyWarning.SupplierTypeMismatch
} as const;

export type ENUM_SUPPLIER_POLICY_WARNING_BACKEND_TYPE = SupplierPolicyWarning;

export const ENUM_DETACH_KEEP_BACKEND = {
	SPEC: DetachKeep.Spec,
	NOTHING: DetachKeep.Nothing
} as const;

export type ENUM_DETACH_KEEP_BACKEND_TYPE = DetachKeep;

export const ENUM_GUIDE_TYPE_BACKEND = {
	LOCAL: GuideType.Local,
	ROUTE: GuideType.Route
} as const;

export type ENUM_GUIDE_TYPE_BACKEND_TYPE = GuideType;

export const ENUM_TRANSFER_TYPES_BACKEND = {
	CITY_TOUR: TransferTypes.CityTour,
	CITY_TRANSFER: TransferTypes.CityTransfer,
	INTERCITY_TRANSFER: TransferTypes.IntercityTransfer,
	AIRPORT_TRANSFER: TransferTypes.AirportTransfer,
	STATION_TRANSFER: TransferTypes.StationTransfer,
	CUSTOM: TransferTypes.Custom
} as const;

export type ENUM_TRANSFER_TYPES_BACKEND_TYPE = TransferTypes;
