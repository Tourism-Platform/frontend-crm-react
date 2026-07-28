import type {
	HousingRoomCategoryExpensesSchemaOutput,
	HousingRoomDoubleSchemaInput,
	HousingRoomDoubleSchemaOutput
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

	const uniqueRoomTypes = new Set<string>();
	perRoomCategoryRooms.forEach((category) => {
		category.rooms?.forEach((room) => {
			if (room.typ) {
				uniqueRoomTypes.add(room.typ);
			}
		});
	});

	return {
		rooms: Array.from(uniqueRoomTypes).map((roomName) => ({
			room_name: roomName,
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
