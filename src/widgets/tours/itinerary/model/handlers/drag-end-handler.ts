import type { DragEndEvent } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";

import { ENUM_EVENT, EVENT_TEMPLATES_LIST } from "@/entities/tour";
import type { ENUM_EVENT_TYPE, IEventLibraryItem } from "@/entities/tour";

import {
	addItemToData,
	findItemLocation,
	isValidKanbanDropTarget,
	moveItemInData,
	reorderDaysInData
} from "../helpers";
import { type IDayItem, type IItemLocation, type TOptionsData } from "../types";

import { getTargetContainer } from "./target-container";

// Описание API-действия, которое нужно выполнить после DND
export type TDragAction =
	| {
			type: "create";
			day: number;
			position: number;
			eventType: ENUM_EVENT_TYPE;
			title: string;
			tempBlockId: string;
			details: Record<string, unknown>;
	  }
	| {
			type: "createFromLibrary";
			templateId: string;
			day: number;
			position: number;
			eventType: ENUM_EVENT_TYPE;
			title: string;
			tempBlockId: string;
	  }
	| {
			type: "move";
			backendId: string;
			day: number;
			position: number;
	  }
	| {
			type: "reorder";
			backendId: string;
			day: number;
			position: number;
	  }
	| {
			type: "reorderDays";
	  };

export interface IDragEndResult {
	shouldUpdate: boolean;
	newData?: TOptionsData;
	clearState: boolean;
	action?: TDragAction;
}

const createItemFromTemplate = (
	tplId: string,
	targetContainer: ReturnType<typeof getTargetContainer>["container"]
): IDayItem | null => {
	const tpl = [
		...EVENT_TEMPLATES_LIST.library,
		...EVENT_TEMPLATES_LIST.components
	].find((t) => t.eventType === tplId);
	if (!tpl) return null;

	const newItem: IDayItem = {
		id: uuidv4(),
		block_id: `${tpl.eventType}-${Date.now()}`,
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

const createItemFromLibrarySummary = (
	summary: IEventLibraryItem,
	targetContainer: ReturnType<typeof getTargetContainer>["container"]
): IDayItem | null => {
	if (
		summary.eventType === ENUM_EVENT.MULTIPLY_OPTION &&
		targetContainer?.nestedIndex !== undefined
	) {
		return null;
	}

	return {
		id: uuidv4(),
		block_id: `library-${summary.eventType}-${Date.now()}`,
		eventType: summary.eventType,
		title: summary.name || "Untitled",
		subtitle: "Information"
	};
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
	activeOption: string,
	libraryItemsById: Record<string, IEventLibraryItem> = {}
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
				clearState: false,
				action: { type: "reorderDays" }
			};
		}
		return { shouldUpdate: false, clearState: false };
	}

	// Sidebar create sources must land on a real kanban droppable
	if (
		(activeIdStr.startsWith("library:") ||
			activeIdStr.startsWith("template:")) &&
		!isValidKanbanDropTarget(overIdStr)
	) {
		return { shouldUpdate: false, clearState: true };
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

	// Event Library template -> create from full GET (async later)
	if (activeIdStr.startsWith("library:")) {
		const fromData = active.data.current as
			| { type?: string; templateId?: string }
			| undefined;
		const templateId =
			fromData?.type === "event-library" && fromData.templateId
				? fromData.templateId
				: activeIdStr.replace("library:", "");
		const summary = libraryItemsById[templateId];
		if (!summary) {
			return { shouldUpdate: false, clearState: true };
		}

		const newItem = createItemFromLibrarySummary(summary, targetContainer);
		if (!newItem) {
			return { shouldUpdate: false, clearState: true };
		}

		const targetDay = targetContainer.day ?? 1;
		const resultData = addItemToData(
			optionsData,
			targetContainer,
			toIndex,
			newItem,
			activeOption
		);

		return {
			shouldUpdate: true,
			newData: resultData,
			clearState: true,
			action: {
				type: "createFromLibrary",
				templateId,
				day: targetDay,
				position: toIndex,
				eventType: newItem.eventType,
				title: newItem.title,
				tempBlockId: newItem.block_id
			}
		};
	}

	// Template -> create new item
	if (activeIdStr.startsWith("template:")) {
		const tplId = activeIdStr.replace("template:", "");
		const newItem = createItemFromTemplate(tplId, targetContainer);

		if (!newItem) {
			return { shouldUpdate: false, clearState: true };
		}

		const targetDay = targetContainer.day ?? 1;

		const resultData = addItemToData(
			optionsData,
			targetContainer,
			toIndex,
			newItem,
			activeOption
		);
		return {
			shouldUpdate: true,
			newData: resultData,
			clearState: true,
			action: {
				type: "create",
				day: targetDay,
				position: toIndex,
				eventType: newItem.eventType,
				title: newItem.title,
				tempBlockId: newItem.block_id,
				// details: DEFAULT_EVENT_DETAILS[newItem.eventType] || {}
				details: {}
			}
		};
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
			movedItem.eventType === ENUM_EVENT.MULTIPLY_OPTION &&
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

		// Определяем тип действия: move (смена дня) или reorder (тот же день)
		let action: TDragAction | undefined;
		if (movedItem.backendId) {
			const isSameDay =
				from.location === "day" &&
				targetContainer.location === "day" &&
				from.day === targetContainer.day;

			if (isSameDay) {
				action = {
					type: "reorder",
					day: targetContainer.day as number,
					backendId: movedItem.backendId,
					position: toIndex
				};
			} else if (targetContainer.location === "day") {
				action = {
					type: "move",
					backendId: movedItem.backendId,
					day: targetContainer.day as number,
					position: toIndex
				};
			}
		}

		return {
			shouldUpdate: true,
			newData: resultData,
			clearState: true,
			action
		};
	}

	return { shouldUpdate: false, clearState: true };
};
