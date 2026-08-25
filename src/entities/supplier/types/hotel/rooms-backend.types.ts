import type {
	DurationChargeInput,
	HotelRoomRateSchemaInput,
	HotelRoomSchemaInput,
	HotelVariantReadOutput,
	HotelVariantWrite
} from "@/shared/api/generated/Api";

export type TDurationChargeInputBackend = DurationChargeInput;
export type THotelRoomSchemaInputBackend = HotelRoomSchemaInput;
export type THotelRoomRateInputBackend = HotelRoomRateSchemaInput;
export type THotelRoomChargeInputBackend = NonNullable<
	HotelRoomSchemaInput["expenses"]
>;
export type THotelVariantWriteBackend = HotelVariantWrite;
export type THotelVariantReadBackend = HotelVariantReadOutput;
export type THotelRoomReadBackend = NonNullable<
	HotelVariantReadOutput["rooms"]
>[number];
