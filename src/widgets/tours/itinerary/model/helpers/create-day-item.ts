import { v4 as uuidv4 } from "uuid";

import { ENUM_EVENT, EVENT_TEMPLATES_LIST } from "@/entities/tour";
import type { IEventLibraryItem } from "@/entities/tour";

import type { IDayItem, IItemBaseLocation } from "../types";

export const createItemFromTemplate = (
	tplId: string,
	targetContainer: IItemBaseLocation | null | undefined
): IDayItem | null => {
	const tpl = [
		...EVENT_TEMPLATES_LIST.library,
		...EVENT_TEMPLATES_LIST.components
	].find((t) => t.eventType === tplId);
	if (!tpl) return null;

	const id = uuidv4();
	const newItem: IDayItem = {
		id,
		block_id: id,
		eventType: tpl.eventType,
		title: tpl.title,
		subtitle: "Information"
	};

	if (
		newItem.eventType === ENUM_EVENT.MULTIPLY_OPTION &&
		targetContainer?.nestedIndex !== undefined
	) {
		return null;
	}

	return newItem;
};

export const createItemFromLibrarySummary = (
	summary: IEventLibraryItem,
	targetContainer: IItemBaseLocation | null | undefined
): IDayItem | null => {
	if (
		summary.eventType === ENUM_EVENT.MULTIPLY_OPTION &&
		targetContainer?.nestedIndex !== undefined
	) {
		return null;
	}

	const id = uuidv4();
	return {
		id,
		block_id: id,
		eventType: summary.eventType,
		title: summary.name || "Untitled",
		subtitle: "Information"
	};
};
