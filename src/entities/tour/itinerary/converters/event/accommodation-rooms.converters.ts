import {
	ENUM_FORM_ROOMS,
	type THousingRoomCategoryExpensesBackend,
	type THousingRoomExpensesBackend,
	type TRoomsSchema
} from "../../types";

type TRoomsList = TRoomsSchema[typeof ENUM_FORM_ROOMS.ROOMS_LIST];

const mapRoomToBackendInput = (room: TRoomsList[number]) => ({
	...(room[ENUM_FORM_ROOMS.ID] ? { id: room[ENUM_FORM_ROOMS.ID] } : {}),
	name: room.room_name || null,
	description: room.description || null
});

export const mapRoomsFromBackend = (
	perRoomRooms?: THousingRoomExpensesBackend[] | null,
	perRoomCategoryRooms?: THousingRoomCategoryExpensesBackend[] | null
) => {
	if (perRoomRooms?.length) {
		return {
			rooms: perRoomRooms.map((room) => ({
				[ENUM_FORM_ROOMS.ID]: room.id,
				[ENUM_FORM_ROOMS.ROOM_NAME]: room.name ?? "",
				[ENUM_FORM_ROOMS.DESCRIPTION]: room.description ?? ""
			}))
		};
	}

	if (!perRoomCategoryRooms?.length) {
		return { rooms: [] };
	}

	return {
		rooms: perRoomCategoryRooms.map((category) => ({
			[ENUM_FORM_ROOMS.ROOM_NAME]: category.name ?? "",
			[ENUM_FORM_ROOMS.DESCRIPTION]: ""
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
