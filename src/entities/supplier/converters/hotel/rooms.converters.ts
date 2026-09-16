import {
	ENUM_FORM_HOTEL_ROOMS,
	ENUM_HOTEL_PRICING,
	type ENUM_HOTEL_PRICING_TYPE,
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	type ENUM_HOTEL_ROOM_TYPE_TYPE,
	ENUM_SUPPLIER_SURCHARGE,
	type IHotelRoom,
	type IHotelRoomRate,
	type IHotelRoomWrite,
	type IHotelVariant,
	type IHotelVariantWrite,
	type THotelRoomCharge,
	type THotelRoomChargeInputBackend,
	type THotelRoomChargeReadBackend,
	type THotelRoomRateInputBackend,
	type THotelRoomReadBackend,
	type THotelRoomSeasonReadBackend,
	type THotelVariantReadBackend,
	type THotelVariantWriteBackend,
	type TPricedRoomWriteBackend,
	type TRoomWriteBackend
} from "../../types";
import {
	mapSupplierFeesFromBackend,
	mapSupplierFeesToBackend
} from "../supplier-fee.converters";
import {
	mapMonetaryFromBackend,
	mapMonetaryToBackend
} from "../supplier-money.converters";
import { mapSupplierNodeImageToFrontend } from "../supplier-product-image.converters";
import {
	mapSupplierChargeMarkupFromBackend,
	mapSupplierChargeMarkupToBackend
} from "../supplier-variant-charge.converters";

import { hotelRoomTypeConverter } from "./room-type.converters";

/**
 * Heads a fixed-occupancy room kind sleeps, by definition.
 * Variable kinds (suite, family) fall back to DEFAULT_VARIABLE_PAX when the
 * form did not collect a headcount.
 */
const FIXED_ROOM_PAX: Partial<Record<ENUM_HOTEL_ROOM_TYPE_TYPE, number>> = {
	[ENUM_HOTEL_ROOM_TYPE.SINGLE]: 1,
	[ENUM_HOTEL_ROOM_TYPE.DOUBLE]: 2,
	[ENUM_HOTEL_ROOM_TYPE.TWIN]: 2,
	[ENUM_HOTEL_ROOM_TYPE.TRIPLE]: 3,
	[ENUM_HOTEL_ROOM_TYPE.QUADRUPLE]: 4
};
const DEFAULT_VARIABLE_PAX = 2;

const resolveHotelRoomPax = (room: IHotelRoomWrite): number =>
	room.pax ?? FIXED_ROOM_PAX[room.typ] ?? DEFAULT_VARIABLE_PAX;

export const mapHotelRoomChargeFromBackend = (
	charge: THotelRoomChargeReadBackend
): THotelRoomCharge => {
	const fees = mapSupplierFeesFromBackend(charge.fees);
	const markup = mapSupplierChargeMarkupFromBackend(charge.markup);

	if (charge.typ === "per_duration") {
		return {
			typ: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
			rate: {
				typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
				cost: mapMonetaryFromBackend(charge.rate.cost)
			},
			fees,
			markup
		};
	}

	return {
		typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
		cost: mapMonetaryFromBackend(charge.cost),
		fees,
		markup
	};
};

export const mapHotelRoomChargeToBackend = (
	data: THotelRoomCharge
): THotelRoomChargeInputBackend => {
	const fees = mapSupplierFeesToBackend(data.fees);
	const markup = mapSupplierChargeMarkupToBackend(data.markup);

	if (data.typ === ENUM_HOTEL_ROOM_CHARGE.PER_DURATION) {
		return {
			typ: "per_duration",
			rate: {
				typ: "fixed",
				cost: mapMonetaryToBackend(data.rate.cost)
			},
			fees,
			markup
		};
	}

	return {
		typ: "fixed",
		cost: mapMonetaryToBackend(data.cost),
		fees,
		markup
	};
};

const mapHotelRoomRateFromBackend = (
	season: THotelRoomSeasonReadBackend
): IHotelRoomRate => ({
	fromDate: season.from_date,
	toDate: season.to_date,
	expenses: mapHotelRoomChargeFromBackend(season.charge)
});

const mapHotelRoomRateToBackend = (
	rate: IHotelRoomRate
): THotelRoomRateInputBackend => ({
	from_date: rate.fromDate,
	to_date: rate.toDate,
	charge: mapHotelRoomChargeToBackend(rate.expenses)
});

const mapHotelRoomFromBackend = (room: THotelRoomReadBackend): IHotelRoom => ({
	...(room.id ? { id: room.id } : {}),
	typ: hotelRoomTypeConverter.from(room.typ) ?? null,
	pax: room.pax,
	name: room.name ?? null,
	description: room.description ?? null,
	expenses:
		"rate" in room ? mapHotelRoomChargeFromBackend(room.rate.base) : null,
	rates:
		"rate" in room
			? room.rate.seasons.map(mapHotelRoomRateFromBackend)
			: null,
	images: (room.images ?? []).map(mapSupplierNodeImageToFrontend)
});

const mapHotelRoomToPricedWrite = (
	room: IHotelRoomWrite
): TPricedRoomWriteBackend => ({
	id: room[ENUM_FORM_HOTEL_ROOMS.ID] ?? null,
	typ: hotelRoomTypeConverter.to(room.typ)!,
	pax: resolveHotelRoomPax(room),
	name: room.name ?? null,
	description: room.description ?? null,
	rate: {
		base: mapHotelRoomChargeToBackend(room.expenses),
		seasons: room.rates?.map(mapHotelRoomRateToBackend) ?? []
	}
});

const mapHotelRoomToWholeWrite = (
	room: IHotelRoomWrite
): TRoomWriteBackend => ({
	id: room[ENUM_FORM_HOTEL_ROOMS.ID] ?? null,
	typ: hotelRoomTypeConverter.to(room.typ)!,
	pax: resolveHotelRoomPax(room),
	name: room.name ?? null,
	description: room.description ?? null
});

export const mapHotelVariantFromBackend = (
	variant: THotelVariantReadBackend
): IHotelVariant => ({
	id: variant.id,
	name: variant.name ?? "",
	rooms: variant.rooms.map(mapHotelRoomFromBackend)
});

export const mapHotelVariantToWrite = (
	data: IHotelVariantWrite,
	pricing: ENUM_HOTEL_PRICING_TYPE
): THotelVariantWriteBackend =>
	pricing === ENUM_HOTEL_PRICING.WHOLE
		? {
				typ: "hotel",
				pricing: ENUM_HOTEL_PRICING.WHOLE,
				name: data.name,
				rooms: data.rooms.map(mapHotelRoomToWholeWrite)
			}
		: {
				typ: "hotel",
				pricing: ENUM_HOTEL_PRICING.PER_ROOM,
				name: data.name,
				rooms: data.rooms.map(mapHotelRoomToPricedWrite)
			};
