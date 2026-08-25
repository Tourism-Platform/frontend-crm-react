import type { ISupplierFeeFormRow } from "../supplier-fee.types";
import type {
	IMonetaryValue,
	ISupplierFixedExpense,
	TSupplierSurcharge
} from "../supplier-money.types";
import type { ISupplierNodeImage } from "../supplier-product-image.types";

import type { ENUM_HOTEL_ROOM_TYPE_TYPE } from "./room-type.types";
import type { ENUM_FORM_HOTEL_ROOMS } from "./rooms-form.types";

export const ENUM_HOTEL_ROOM_CHARGE = {
	FIXED: "fixed",
	PER_DURATION: "per_duration"
} as const;

export type ENUM_HOTEL_ROOM_CHARGE_TYPE =
	(typeof ENUM_HOTEL_ROOM_CHARGE)[keyof typeof ENUM_HOTEL_ROOM_CHARGE];

export interface IHotelFixedCharge {
	typ: typeof ENUM_HOTEL_ROOM_CHARGE.FIXED;
	cost: IMonetaryValue;
	fees: ISupplierFeeFormRow[] | null;
	markup: TSupplierSurcharge | null;
}

export interface IHotelDurationCharge {
	typ: typeof ENUM_HOTEL_ROOM_CHARGE.PER_DURATION;
	rate: ISupplierFixedExpense;
	fees: ISupplierFeeFormRow[] | null;
	markup: TSupplierSurcharge | null;
}

export type THotelRoomCharge = IHotelFixedCharge | IHotelDurationCharge;

export interface IHotelRoomRate {
	fromDate: string;
	toDate: string;
	expenses: THotelRoomCharge;
}

export interface IHotelRoom {
	id?: string;
	typ: ENUM_HOTEL_ROOM_TYPE_TYPE | null;
	pax: number | null;
	expenses: THotelRoomCharge | null;
	rates: IHotelRoomRate[] | null;
	images: ISupplierNodeImage[];
}

export interface IHotelVariant {
	id: string;
	name: string;
	rooms: IHotelRoom[];
}

export interface IHotelRoomWrite {
	[ENUM_FORM_HOTEL_ROOMS.ID]?: string;
	typ: ENUM_HOTEL_ROOM_TYPE_TYPE;
	pax?: number | null;
	expenses: THotelRoomCharge | null;
	rates?: IHotelRoomRate[] | null;
}

export interface IHotelVariantWrite {
	name: string;
	rooms: IHotelRoomWrite[];
}
