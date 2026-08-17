import type { DragEndEvent } from "@dnd-kit/core";

import { ENUM_EVENT } from "@/entities/tour";
import type { ENUM_EVENT_TYPE, IEventLibraryItem } from "@/entities/tour";

import {
	addItemToData,
	findItemLocation,
	isValidKanbanDropTarget,
	moveItemInData,
	reorderDaysInData
} from "../helpers";
import {
	createItemFromLibrarySummary,
	createItemFromTemplate
} from "../helpers/create-day-item";
import {
	type IDayItem,
	type IItemBaseLocation,
	type IItemLocation,
	type TOptionsData
} from "../types";

import { getTargetContainer } from "./target-container";

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
			type: "addOption";
			parentBackendId: string;
			day: number;
			position: number;
			eventType: ENUM_EVENT_TYPE;
			title: string;
			tempBlockId: string;
			details: Record<string, unknown>;
	  }
	| {
			type: "addOptionFromLibrary";
			parentBackendId: string;
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
			type: "reorderOptions";
			parentBackendId: string;
			order: number[];
	  }
	| {
			type: "moveToMulti";
			eventId: string;
			targetEventId: string;
	  }
	| {
			type: "moveToSingle";
			parentEventId: string;
			eventOptionId: string;
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

const getParentAtIndex = (
	optionsData: TOptionsData,
	optionId: string,
	location: "tripDetails" | "day",
	day: number | undefined,
	parentIndex: number
): IDayItem | undefined => {
	if (location === "tripDetails") {
		return optionsData[optionId]?.tripDetails[parentIndex];
	}
	return optionsData[optionId]?.days[day as number]?.[parentIndex];
};

const getTargetParent = (
	target: IItemBaseLocation,
	optionsData: TOptionsData,
	activeOption: string
): IDayItem | undefined => {
	if (target.nestedIndex === undefined) return undefined;
	return getParentAtIndex(
		optionsData,
		activeOption,
		target.location,
		target.day,
		target.nestedIndex
	);
};

const buildOptionReorderPermutation = (
	fromNestedIndex: number,
	toIndex: number,
	length: number
): number[] => {
	const order = Array.from({ length }, (_, i) => i);
	const [removed] = order.splice(fromNestedIndex, 1);
	order.splice(toIndex, 0, removed);
	return order;
};

const resolveCreateAction = (
	targetContainer: IItemBaseLocation,
	optionsData: TOptionsData,
	activeOption: string,
	base: {
		day: number;
		position: number;
		eventType: ENUM_EVENT_TYPE;
		title: string;
		tempBlockId: string;
	}
): TDragAction | undefined => {
	if (targetContainer.nestedIndex === undefined) {
		return {
			type: "create",
			...base,
			details: {}
		};
	}

	const parent = getTargetParent(targetContainer, optionsData, activeOption);
	if (!parent?.backendId) return undefined;

	return {
		type: "addOption",
		parentBackendId: parent.backendId,
		...base,
		details: {}
	};
};

const resolveLibraryCreateAction = (
	targetContainer: IItemBaseLocation,
	optionsData: TOptionsData,
	activeOption: string,
	base: {
		templateId: string;
		day: number;
		position: number;
		eventType: ENUM_EVENT_TYPE;
		title: string;
		tempBlockId: string;
	}
): TDragAction | undefined => {
	if (targetContainer.nestedIndex === undefined) {
		return { type: "createFromLibrary", ...base };
	}

	const parent = getTargetParent(targetContainer, optionsData, activeOption);
	if (!parent?.backendId) return undefined;

	return {
		type: "addOptionFromLibrary",
		parentBackendId: parent.backendId,
		...base
	};
};

const resolveItemMoveAction = (
	from: IItemLocation,
	targetContainer: IItemBaseLocation,
	toIndex: number,
	movedItem: IDayItem,
	optionsData: TOptionsData,
	activeOption: string
): TDragAction | undefined => {
	if (!movedItem.backendId) return undefined;

	const fromNested = from.nestedIndex !== undefined;
	const toNested = targetContainer.nestedIndex !== undefined;

	// Root ↔ root
	if (!fromNested && !toNested) {
		const isSameDay =
			from.location === "day" &&
			targetContainer.location === "day" &&
			from.day === targetContainer.day;

		if (isSameDay) {
			return {
				type: "reorder",
				day: targetContainer.day as number,
				backendId: movedItem.backendId,
				position: toIndex
			};
		}
		if (targetContainer.location === "day") {
			return {
				type: "move",
				backendId: movedItem.backendId,
				day: targetContainer.day as number,
				position: toIndex
			};
		}
		return undefined;
	}

	// Root → inside multi
	if (!fromNested && toNested) {
		const targetParent = getTargetParent(
			targetContainer,
			optionsData,
			activeOption
		);
		if (!targetParent?.backendId) return undefined;
		return {
			type: "moveToMulti",
			eventId: movedItem.backendId,
			targetEventId: targetParent.backendId
		};
	}

	// Nested → root day
	if (fromNested && !toNested) {
		const parent = getParentAtIndex(
			optionsData,
			from.optionId,
			from.location,
			from.day,
			from.index
		);
		if (!parent?.backendId) return undefined;
		return {
			type: "moveToSingle",
			parentEventId: parent.backendId,
			eventOptionId: movedItem.backendId,
			day: targetContainer.day ?? 1,
			position: toIndex
		};
	}

	// Nested → nested
	if (fromNested && toNested) {
		const sameParent =
			from.location === targetContainer.location &&
			from.day === targetContainer.day &&
			from.index === targetContainer.nestedIndex;

		const parent = getParentAtIndex(
			optionsData,
			from.optionId,
			from.location,
			from.day,
			from.index
		);
		if (!parent?.backendId || !parent.items) return undefined;

		if (sameParent) {
			const order = buildOptionReorderPermutation(
				from.nestedIndex!,
				toIndex,
				parent.items.length
			);
			return {
				type: "reorderOptions",
				parentBackendId: parent.backendId,
				order
			};
		}

		// Cross-multi: promote then would need moveToMulti — not supported in one step
		return {
			type: "moveToSingle",
			parentEventId: parent.backendId,
			eventOptionId: movedItem.backendId,
			day: targetContainer.day ?? from.day ?? 1,
			position: toIndex
		};
	}

	return undefined;
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

	if (
		(activeIdStr.startsWith("library:") ||
			activeIdStr.startsWith("template:")) &&
		!isValidKanbanDropTarget(overIdStr)
	) {
		return { shouldUpdate: false, clearState: true };
	}

	const { container: targetContainer, toIndex } = getTargetContainer(
		overIdStr,
		optionsData,
		activeOption
	);

	if (!targetContainer) {
		return { shouldUpdate: false, clearState: true };
	}

	if (activeIdStr.startsWith("library:")) {
		const fromData = active.data.current as
			| { type?: string; templateId?: string; item?: IEventLibraryItem }
			| undefined;
		const templateId =
			fromData?.type === "event-library" && fromData.templateId
				? fromData.templateId
				: activeIdStr.replace("library:", "");
		const summary =
			(fromData?.type === "event-library" ? fromData.item : undefined) ??
			libraryItemsById[templateId];
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

		const action = resolveLibraryCreateAction(
			targetContainer,
			optionsData,
			activeOption,
			{
				templateId,
				day: targetDay,
				position: toIndex,
				eventType: newItem.eventType,
				title: newItem.title,
				tempBlockId: newItem.block_id
			}
		);

		return {
			shouldUpdate: true,
			newData: resultData,
			clearState: true,
			action
		};
	}

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

		const action = resolveCreateAction(
			targetContainer,
			optionsData,
			activeOption,
			{
				day: targetDay,
				position: toIndex,
				eventType: newItem.eventType,
				title: newItem.title,
				tempBlockId: newItem.block_id
			}
		);

		return {
			shouldUpdate: true,
			newData: resultData,
			clearState: true,
			action
		};
	}

	if (activeIdStr.startsWith("item:")) {
		const rawActive = activeIdStr.replace("item:", "");
		const from = findItemLocation(optionsData, rawActive);
		if (!from) {
			return { shouldUpdate: false, clearState: true };
		}

		const movedItem = getMovedItem(from, optionsData);

		if (
			movedItem.eventType === ENUM_EVENT.MULTIPLY_OPTION &&
			targetContainer.nestedIndex !== undefined
		) {
			return { shouldUpdate: false, clearState: true };
		}

		const action = resolveItemMoveAction(
			from,
			targetContainer,
			toIndex,
			movedItem,
			optionsData,
			activeOption
		);

		const resultData = moveItemInData(
			optionsData,
			from,
			targetContainer,
			toIndex,
			movedItem,
			activeOption
		);

		return {
			shouldUpdate: true,
			newData: resultData,
			clearState: true,
			action
		};
	}

	return { shouldUpdate: false, clearState: true };
};
