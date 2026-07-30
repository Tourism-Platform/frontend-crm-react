import type {
	HousingRoomCategoryExpensesSchemaOutput,
	HousingRoomDoubleSchemaInput,
	HousingRoomDoubleSchemaOutput
} from "@/shared/api";
import { HousingRoomTypes } from "@/shared/api";

import { ENUM_FORM_ROOMS, type TRoomsSchema } from "../../types";

type TRoomsList = TRoomsSchema[typeof ENUM_FORM_ROOMS.ROOMS_LIST];

/** Parses HousingRoomTypes from pricing row name (already an enum value from select). */
export const mapRoomNameToHousingType = (
	roomName: string
): HousingRoomTypes | null => {
	const values = Object.values(HousingRoomTypes) as string[];
	return values.includes(roomName) ? (roomName as HousingRoomTypes) : null;
};

const mapRoomToBackendInput = (
	room: TRoomsList[number]
): Pick<HousingRoomDoubleSchemaInput, "name" | "description"> => ({
	name: room.room_name || null,
	description: room.description || null
});

export const mapRoomsFromBackend = (
	perRoomRooms?: HousingRoomDoubleSchemaOutput[] | null,
	perRoomCategoryRooms?: HousingRoomCategoryExpensesSchemaOutput[] | null
) => {
	if (perRoomRooms?.length) {
		return {
			rooms: perRoomRooms.map((room) => ({
				room_name: room.name ?? "",
				description: room.description ?? ""
			}))
		};
	}

	if (!perRoomCategoryRooms?.length) {
		return { rooms: [] };
	}

	return {
		rooms: perRoomCategoryRooms.map((category) => ({
			room_name: category.name ?? "",
			description: ""
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
