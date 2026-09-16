import { DEFAULT_EVENT_CURRENCY } from "@/entities/commission";

import {
	ENUM_FORM_HOTEL_PRODUCT_ROOMS,
	ENUM_HOTEL_ROOM_CHARGE,
	ENUM_HOTEL_ROOM_TYPE,
	type IHotelProduct,
	type IHotelRoom,
	type IHotelRoomWrite,
	type IHotelVariant,
	type IHotelVariantWrite,
	type THotelRoomRow
} from "../../types";

const EMPTY_FIXED_CHARGE = () => ({
	typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
	cost: { val: 0, currency: DEFAULT_EVENT_CURRENCY },
	fees: null,
	markup: null
});

export const mapRoomRowFromVariant = (
	variant: IHotelVariant
): THotelRoomRow => {
	const room = variant.rooms[0];

	return {
		[ENUM_FORM_HOTEL_PRODUCT_ROOMS.VARIANT_ID]: variant.id,
		[ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOM_NAME]:
			room?.name || variant.name || "",
		[ENUM_FORM_HOTEL_PRODUCT_ROOMS.DESCRIPTION]:
			room?.description ?? undefined
	};
};

const mapRoomToWrite = (
	room: IHotelRoom,
	overrides?: Pick<IHotelRoomWrite, "name" | "description">
): IHotelRoomWrite => ({
	...(room.id ? { id: room.id } : {}),
	typ: room.typ ?? ENUM_HOTEL_ROOM_TYPE.DOUBLE,
	pax: room.pax,
	name: overrides?.name !== undefined ? overrides.name : room.name,
	description:
		overrides?.description !== undefined
			? overrides.description
			: room.description,
	expenses: room.expenses ?? EMPTY_FIXED_CHARGE(),
	rates: room.rates
});

export const mapHotelRoomRowToVariantWrite = (
	row: THotelRoomRow,
	product: IHotelProduct
): IHotelVariantWrite => {
	const existing = product.variants.find(
		(variant) =>
			variant.id === row[ENUM_FORM_HOTEL_PRODUCT_ROOMS.VARIANT_ID]
	);
	const roomName = row[ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOM_NAME].trim();
	const description =
		row[ENUM_FORM_HOTEL_PRODUCT_ROOMS.DESCRIPTION]?.trim() || null;
	const rooms = existing?.rooms ?? [];
	const first = rooms[0];

	return {
		name: roomName || existing?.name || "",
		rooms: first
			? [
					mapRoomToWrite(first, { name: roomName, description }),
					...rooms.slice(1).map((room) => mapRoomToWrite(room))
				]
			: [
					{
						typ: ENUM_HOTEL_ROOM_TYPE.DOUBLE,
						name: roomName,
						description,
						expenses: EMPTY_FIXED_CHARGE(),
						rates: null
					}
				]
	};
};
