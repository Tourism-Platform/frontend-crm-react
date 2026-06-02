import { ROOM_NAME_OPTIONS } from "@/shared/config";

export const getRoomDisplayName = (roomName: string) =>
	ROOM_NAME_OPTIONS.find((option) => option.value === roomName)?.label ??
	roomName;
