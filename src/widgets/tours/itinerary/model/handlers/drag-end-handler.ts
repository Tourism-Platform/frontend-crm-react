import type { DragEndEvent } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";

import { EVENT_TEMPLATES_LIST } from "../config";
import {
	addItemToData,
	findItemLocation,
	moveItemInData,
	reorderDaysInData
} from "../helpers";
import {
	ENUM_EVENT,
	type IDayItem,
	type IItemLocation,
	type TOptionsData
} from "../types";

import { getTargetContainer } from "./target-container";

export interface IDragEndResult {
	shouldUpdate: boolean;
	newData?: TOptionsData;
	clearState: boolean;
}

const createItemFromTemplate = (
	tplId: string,
	targetContainer: ReturnType<typeof getTargetContainer>["container"]
): IDayItem | null => {
	const tpl = [
		...EVENT_TEMPLATES_LIST.library,
		...EVENT_TEMPLATES_LIST.components
	].find((t) => t.event_type === tplId);
	if (!tpl) return null;

	const newItem: IDayItem = {
		id: uuidv4(),
		block_id: `${tpl.event_type}-${Date.now()}`,
		event_type: tpl.event_type,
		title: tpl.title,
		subtitle: "Information"
	};

	if (
		newItem.event_type === ENUM_EVENT.MULTIPLY_OPTION &&
		targetContainer?.nestedIndex !== undefined
	) {
		return null;
	}

	return newItem;
};

const getMovedItem = (
	from: IItemLocation,
	optionsData: TOptionsData
): IDayItem => {
	if (from.location === "tripDetails") {
		const parent = optionsData[from.optionId].tripDetails[from.index];
		return from.nestedIndex !== undefined
			? parent.items![from.nestedIndex]
			: parent;
	} else {
		const parent =
			optionsData[from.optionId].days[from.day as number][from.index];
		return from.nestedIndex !== undefined
			? parent.items![from.nestedIndex]
			: parent;
	}
};

export const handleDragEnd = (
	event: DragEndEvent,
	optionsData: TOptionsData,
	activeOption: number
): IDragEndResult => {
	const { active, over } = event;

	if (!over) {
		return { shouldUpdate: false, clearState: true };
	}

	const activeIdStr = active.id as string;
	const overIdStr = over.id as string;

	// Column reordering
	if (activeIdStr.startsWith("column:") && overIdStr.startsWith("column:")) {
		const activeDay = Number(activeIdStr.replace("column:", ""));
		const overDay = Number(overIdStr.replace("column:", ""));

		if (activeDay !== overDay) {
			const resultData = reorderDaysInData(
				optionsData,
				activeOption,
				activeDay,
				overDay
			);
			return {
				shouldUpdate: true,
				newData: resultData,
				clearState: false
			};
		}
		return { shouldUpdate: false, clearState: false };
	}

	// Determine target container
	const { container: targetContainer, toIndex } = getTargetContainer(
		overIdStr,
		optionsData,
		activeOption
	);

	if (!targetContainer) {
		return { shouldUpdate: false, clearState: true };
	}

	// Template -> create new item
	if (activeIdStr.startsWith("template:")) {
		const tplId = activeIdStr.replace("template:", "");
		const newItem = createItemFromTemplate(tplId, targetContainer);

		if (!newItem) {
			return { shouldUpdate: false, clearState: true };
		}

		const resultData = addItemToData(
			optionsData,
			targetContainer,
			toIndex,
			newItem,
			activeOption
		);
		return { shouldUpdate: true, newData: resultData, clearState: true };
	}

	// Existing item move
	if (activeIdStr.startsWith("item:")) {
		const rawActive = activeIdStr.replace("item:", "");
		const from = findItemLocation(optionsData, rawActive);
		if (!from) {
			return { shouldUpdate: false, clearState: true };
		}

		const movedItem = getMovedItem(from, optionsData);

		// Prevent nesting MULTIPLY_OPTION into another MULTIPLY_OPTION
		if (
			movedItem.event_type === ENUM_EVENT.MULTIPLY_OPTION &&
			targetContainer.nestedIndex !== undefined
		) {
			return { shouldUpdate: false, clearState: true };
		}

		const resultData = moveItemInData(
			optionsData,
			from,
			targetContainer,
			toIndex,
			movedItem,
			activeOption
		);
		return { shouldUpdate: true, newData: resultData, clearState: true };
	}

	return { shouldUpdate: false, clearState: true };
};
