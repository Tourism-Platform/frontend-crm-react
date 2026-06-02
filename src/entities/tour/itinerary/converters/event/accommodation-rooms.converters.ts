import type {
	HousingRoomCategoryExpensesSchemaOutput,
	HousingRoomExpensesSchemaOutput
} from "@/shared/api";
import { HousingRoomTypes } from "@/shared/api";

import { ENUM_FORM_ROOMS, type TRoomsSchema } from "../../types";

type TRoomsList = TRoomsSchema[typeof ENUM_FORM_ROOMS.ROOMS_LIST];

export const mapRoomNameToHousingType = (
	roomName: string
): HousingRoomTypes | null => {
	const values = Object.values(HousingRoomTypes) as string[];
	return values.includes(roomName) ? (roomName as HousingRoomTypes) : null;
};

const mapRoomToBackendInput = (
	room: TRoomsList[number]
): Pick<HousingRoomExpensesSchemaOutput, "typ" | "description"> => ({
	typ: mapRoomNameToHousingType(room.room_name),
	description: room.description || null
});

export const mapRoomsFromBackend = (
	perRoomRooms?: HousingRoomExpensesSchemaOutput[] | null,
	perRoomCategoryRooms?: HousingRoomCategoryExpensesSchemaOutput[] | null
) => {
	const source = perRoomRooms?.length
		? perRoomRooms
		: perRoomCategoryRooms?.length
			? perRoomCategoryRooms
			: [];

	if (!source.length) {
		return { rooms: [] };
	}

	return {
		rooms: source.map((room) => ({
			room_name: room.typ ?? "",
			description: room.description ?? ""
		}))
	};
};

export const mapRoomsToBackend = (roomsList: TRoomsList = []) => ({
	details: {
		expenses: {
			typ: "per_room" as const,
			rooms: roomsList.map(mapRoomToBackendInput)
		}
	}
});
