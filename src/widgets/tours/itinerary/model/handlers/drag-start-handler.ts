import type { DragStartEvent } from "@dnd-kit/core";

import {
	EVENT_TEMPLATES_LIST,
	type IEventLibraryItem,
	type ITemplateItem
} from "@/entities/tour";

import { findItemLocation } from "../helpers";
import type { IDayItem, TOptionsData } from "../types";

export interface IDragStartState {
	activeDayItem: IDayItem | null;
	activeTemplateItem: ITemplateItem | null;
	activeLibraryItem: IEventLibraryItem | null;
	activeColumn: number | null;
}

export const handleDragStart = (
	event: DragStartEvent,
	optionsData: TOptionsData,
	libraryItemsById: Record<string, IEventLibraryItem> = {}
): IDragStartState => {
	const id = event.active.id as string;
	const state: IDragStartState = {
		activeDayItem: null,
		activeTemplateItem: null,
		activeLibraryItem: null,
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
		].find((t) => t.eventType === raw);
		if (found) {
			state.activeTemplateItem = found;
		}
	} else if (id.startsWith("library:")) {
		const templateId = id.replace("library:", "");
		const fromData = event.active.data.current as
			| { type?: string; templateId?: string }
			| undefined;
		const resolvedId =
			fromData?.type === "event-library" && fromData.templateId
				? fromData.templateId
				: templateId;
		state.activeLibraryItem = libraryItemsById[resolvedId] ?? null;
	} else if (id.startsWith("column:")) {
		const day = Number(id.replace("column:", ""));
		state.activeColumn = day;
	}

	return state;
};
