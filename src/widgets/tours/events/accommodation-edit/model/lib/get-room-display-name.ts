import type { TFunction } from "i18next";

import {
	type ENUM_HOUSING_ROOM_TYPE_TYPE,
	HOUSING_ROOM_TYPE_LABELS
} from "@/entities/tour";

export const getRoomDisplayName = (
	roomName: string,
	t: TFunction<"options">
) => {
	const labelKey =
		HOUSING_ROOM_TYPE_LABELS[roomName as ENUM_HOUSING_ROOM_TYPE_TYPE];

	return labelKey ? t(labelKey) : roomName;
};
