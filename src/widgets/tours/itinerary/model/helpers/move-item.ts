import type {
	IDayItem,
	IItemBaseLocation,
	IItemLocation,
	TOptionsData
} from "../types";

import { addItemToData } from "./add-item";
import { removeItemFromData } from "./remove-item";

export function moveItemInData(
	optionsData: TOptionsData,
	from: IItemLocation,
	target: IItemBaseLocation,
	toIndex: number,
	movedItem: IDayItem,
	targetOptionId: number
): TOptionsData {
	// Check if we're moving within the same container
	const isSameOption = from.optionId === targetOptionId;
	const isSameDay =
		from.location === "day" &&
		target.location === "day" &&
		from.day === target.day;
	const isSameTripDetails =
		from.location === "tripDetails" && target.location === "tripDetails";
	const isSameContainer = isSameOption && (isSameTripDetails || isSameDay);

	// Adjust target indices if moving within the same container
	const adjustedToIndex = toIndex;
	let adjustedTarget = { ...target };

	if (
		isSameContainer &&
		from.nestedIndex === undefined &&
		target.nestedIndex === undefined
	) {
		// Moving within the same top-level array
		// No adjustment needed for indices ideally if we mimic arrayMove logic correctly
		// previously we subtracted 1 if from.index < toIndex, but that causes off-by-one error
	} else if (
		isSameContainer &&
		from.nestedIndex === undefined &&
		target.nestedIndex !== undefined
	) {
		// Moving from top-level to nested in the same array
		// If the item we're removing is before the parent container, adjust parent index
		if (from.index < target.nestedIndex) {
			adjustedTarget = { ...target, nestedIndex: target.nestedIndex - 1 };
		}
	}

	// 1. Remove from source
	const dataAfterRemove = removeItemFromData(optionsData, from);

	// 2. Insert into target with adjusted indices
	const dataAfterAdd = addItemToData(
		dataAfterRemove,
		adjustedTarget,
		adjustedToIndex,
		movedItem,
		targetOptionId
	);

	return dataAfterAdd;
}
