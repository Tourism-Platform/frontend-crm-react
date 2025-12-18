import type { DragEndEvent } from "@dnd-kit/core";

import { findItemLocation, reorderDaysInData } from "../helpers";
import type { TOptionsData } from "../types";

export const handleDragOver = (
	event: DragEndEvent,
	optionsData: TOptionsData,
	activeOption: number
): TOptionsData | null => {
	const { active, over } = event;
	if (!over) return null;

	const activeIdStr = active.id as string;
	const overIdStr = over.id as string;

	// Column reordering during drag
	if (activeIdStr.startsWith("column:")) {
		let overDay: number | null = null;
		if (overIdStr.startsWith("column:")) {
			overDay = Number(overIdStr.replace("column:", ""));
		} else if (overIdStr.startsWith("container:day-")) {
			overDay = Number(overIdStr.replace("container:day-", ""));
		} else if (overIdStr.startsWith("item:")) {
			const loc = findItemLocation(
				optionsData,
				overIdStr.replace("item:", "")
			);
			if (loc && loc.location === "day") overDay = loc.day!;
		}

		if (overDay !== null) {
			const activeDay = Number(activeIdStr.replace("column:", ""));
			if (activeDay !== overDay) {
				return reorderDaysInData(
					optionsData,
					activeOption,
					activeDay,
					overDay
				);
			}
		}
	}

	return null;
};
