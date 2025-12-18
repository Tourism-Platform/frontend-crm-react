import type { DragEndEvent } from "@dnd-kit/core";

import { EVENT_TEMPLATES_LIST } from "../config";
import { findItemLocation } from "../helpers";
import type { IDayItem, ITemplateItem, TOptionsData } from "../types";

export interface IDragStartState {
	activeDayItem: IDayItem | null;
	activeTemplateItem: ITemplateItem | null;
	activeColumn: number | null;
}

export const handleDragStart = (
	event: DragEndEvent,
	optionsData: TOptionsData
): IDragStartState => {
	const id = event.active.id as string;
	const state: IDragStartState = {
		activeDayItem: null,
		activeTemplateItem: null,
		activeColumn: null
	};

	if (id.startsWith("item:")) {
		const rawId = id.replace("item:", "");
		const loc = findItemLocation(optionsData, rawId);
		if (loc) {
			let item: IDayItem;
			if (loc.location === "tripDetails") {
				item = optionsData[loc.optionId].tripDetails[loc.index];
				if (loc.nestedIndex !== undefined) {
					item = item.items![loc.nestedIndex];
				}
			} else {
				item =
					optionsData[loc.optionId].days[loc.day as number][
						loc.index
					];
				if (loc.nestedIndex !== undefined) {
					item = item.items![loc.nestedIndex];
				}
			}
			state.activeDayItem = item;
		}
	} else if (id.startsWith("template:")) {
		const raw = id.replace("template:", "");
		const found = [
			...EVENT_TEMPLATES_LIST.library,
			...EVENT_TEMPLATES_LIST.components
		].find((t) => t.event_type === raw);
		if (found) {
			state.activeTemplateItem = found;
		}
	} else if (id.startsWith("column:")) {
		const day = Number(id.replace("column:", ""));
		state.activeColumn = day;
	}

	return state;
};
