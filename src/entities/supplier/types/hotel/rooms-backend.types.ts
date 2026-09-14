import type {
	CategoryOutput,
	DurationChargeInput,
	PerRoomHotelVariantWrite,
	PricedCategoryOutput,
	PricedRoomOutput,
	PricedRoomWrite,
	Room,
	RoomRateInput,
	RoomRateOutput,
	RoomSeasonInput,
	RoomSeasonOutput,
	RoomWrite,
	WholeHotelVariantWrite
} from "@/shared/api/generated/Api";

export type TDurationChargeInputBackend = DurationChargeInput;
export type TPricedRoomWriteBackend = PricedRoomWrite;
export type TRoomWriteBackend = RoomWrite;
export type THotelRoomRateInputBackend = RoomSeasonInput;
export type THotelRoomChargeInputBackend = RoomRateInput["base"];
export type THotelRoomChargeReadBackend = RoomRateOutput["base"];
export type THotelRoomSeasonReadBackend = RoomSeasonOutput;
export type THotelVariantWriteBackend =
	| PerRoomHotelVariantWrite
	| WholeHotelVariantWrite;
export type THotelVariantReadBackend = PricedCategoryOutput | CategoryOutput;
export type THotelRoomReadBackend = PricedRoomOutput | Room;
