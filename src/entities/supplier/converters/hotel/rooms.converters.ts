import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission/types/currency.types";

import {
	ENUM_FORM_HOTEL_ROOMS,
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	type ENUM_HOTEL_ROOM_TYPE_TYPE,
	ENUM_SUPPLIER_SURCHARGE,
	type IHotelDurationCharge,
	type IHotelFixedCharge,
	type IHotelRoom,
	type IHotelRoomRate,
	type IHotelRoomWrite,
	type IHotelVariant,
	type IHotelVariantWrite,
	type TFixedChargeInputBackend,
	type THotelRoomCharge,
	type THotelRoomChargeInputBackend,
	type THotelRoomRateInputBackend,
	type THotelRoomReadBackend,
	type THotelRoomSchemaInputBackend,
	type THotelVariantReadBackend,
	type THotelVariantWriteBackend,
	type TSupplierSurcharge
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

import { hotelRoomTypeConverter } from "./room-type.converters";

const FIXED_PAX_TYPES: ENUM_HOTEL_ROOM_TYPE_TYPE[] = [
	ENUM_HOTEL_ROOM_TYPE.SINGLE,
	ENUM_HOTEL_ROOM_TYPE.DOUBLE,
	ENUM_HOTEL_ROOM_TYPE.TWIN,
	ENUM_HOTEL_ROOM_TYPE.TRIPLE,
	ENUM_HOTEL_ROOM_TYPE.QUADRUPLE
];

type THotelChargeMarkupBackend = NonNullable<
	TFixedChargeInputBackend["markup"]
>;
type THotelChargeMarkupOutputBackend = NonNullable<
	NonNullable<THotelRoomReadBackend["expenses"]>["markup"]
>;

const mapHotelMarkupFromBackend = (
	markup?: THotelChargeMarkupOutputBackend | null
): TSupplierSurcharge | null => {
	if (!markup) return null;
	if (markup.typ === "percentage" && "percentage" in markup) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.PERCENTAGE,
			percentage: markup.percentage ?? 0
		};
	}
	if ("cost" in markup && markup.cost) {
		return {
			typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
			cost: mapMonetaryFromBackend(markup.cost)
		};
	}
	return null;
};

const mapHotelMarkupToBackend = (
	markup: TSupplierSurcharge | null
): THotelChargeMarkupBackend | null => {
	if (!markup) return null;
	if (markup.typ === ENUM_SUPPLIER_SURCHARGE.PERCENTAGE) {
		return {
			typ: "percentage",
			percentage: markup.percentage
		};
	}
	return {
		typ: "fixed",
		cost: mapMonetaryToBackend(markup.cost)
	};
};

export const mapHotelRoomChargeToBackend = (
	data: THotelRoomCharge
): THotelRoomChargeInputBackend => {
	const fees = mapSupplierFeesToBackend(data.fees);
	const markup = mapHotelMarkupToBackend(data.markup);

	switch (data.typ) {
		case ENUM_HOTEL_ROOM_CHARGE.PER_DURATION:
			return {
				typ: "per_duration",
				rate: {
					typ: "fixed",
					cost: mapMonetaryToBackend(data.rate.cost)
				},
				fees,
				markup
			};
		case ENUM_HOTEL_ROOM_CHARGE.FIXED:
		default:
			return {
				typ: "fixed",
				cost: mapMonetaryToBackend(data.cost),
				fees,
				markup
			};
	}
};

export const mapHotelRoomChargeFromBackend = (
	expenses: THotelRoomReadBackend["expenses"]
): THotelRoomCharge | null => {
	if (!expenses) {
		return null;
	}

	const fees = mapSupplierFeesFromBackend(expenses.fees);
	const markup = mapHotelMarkupFromBackend(expenses.markup);

	if (expenses.typ === "per_duration" && "rate" in expenses) {
		const rate = expenses.rate;
		const cost =
			rate && "cost" in rate
				? mapMonetaryFromBackend(rate.cost)
				: { val: 0, currency: DEFAULT_EVENT_CURRENCY };
		const duration: IHotelDurationCharge = {
			typ: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
			rate: {
				typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
				cost
			},
			fees,
			markup
		};
		return duration;
	}

	const fixed: IHotelFixedCharge = {
		typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
		cost: mapMonetaryFromBackend(
			"cost" in expenses ? expenses.cost : undefined
		),
		fees,
		markup
	};
	return fixed;
};

const mapHotelRoomRateToBackend = (
	rate: IHotelRoomRate
): THotelRoomRateInputBackend => ({
	from_date: rate.fromDate,
	to_date: rate.toDate,
	expenses: mapHotelRoomChargeToBackend(rate.expenses)
});

const mapHotelRoomRateFromBackend = (
	rate: NonNullable<THotelRoomReadBackend["rates"]>[number]
): IHotelRoomRate => ({
	fromDate: rate.from_date,
	toDate: rate.to_date,
	expenses: mapHotelRoomChargeFromBackend(rate.expenses) ?? {
		typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
		cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY },
		fees: null,
		markup: null
	}
});

const mapHotelRoomToWrite = (
	room: IHotelRoomWrite
): THotelRoomSchemaInputBackend => ({
	...(room[ENUM_FORM_HOTEL_ROOMS.ID]
		? { id: room[ENUM_FORM_HOTEL_ROOMS.ID] }
		: {}),
	typ: hotelRoomTypeConverter.to(room.typ) ?? null,
	...(!FIXED_PAX_TYPES.includes(room.typ) && room.pax != null
		? { pax: room.pax }
		: {}),
	expenses: room.expenses ? mapHotelRoomChargeToBackend(room.expenses) : null,
	rates: room.rates?.map(mapHotelRoomRateToBackend) ?? null
});

const mapHotelRoomFromBackend = (room: THotelRoomReadBackend): IHotelRoom => ({
	...(room.id ? { id: room.id } : {}),
	typ: hotelRoomTypeConverter.from(room.typ) ?? null,
	pax: room.pax ?? null,
	expenses: mapHotelRoomChargeFromBackend(room.expenses),
	rates: room.rates?.map(mapHotelRoomRateFromBackend) ?? null,
	images: (room.images ?? []).map(mapSupplierNodeImageToFrontend)
});

export const mapHotelVariantFromBackend = (
	variant: THotelVariantReadBackend
): IHotelVariant => ({
	id: variant.id,
	name: variant.name,
	rooms: (variant.rooms ?? []).map(mapHotelRoomFromBackend)
});

export const mapHotelVariantToWrite = (
	data: IHotelVariantWrite
): THotelVariantWriteBackend => ({
	typ: "hotel",
	name: data.name,
	details: {
		typ: "hotel",
		rooms: data.rooms.map(mapHotelRoomToWrite)
	}
});
