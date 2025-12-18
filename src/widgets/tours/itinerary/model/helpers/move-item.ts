import type { IDayItem, TOptionsData } from "../types";

import { addItemToData } from "./add-item";
import { removeItemFromData } from "./remove-item";

interface IItemLocation {
	optionId: number;
	location: "tripDetails" | "day";
	day?: number;
	index: number;
	nestedIndex?: number;
}

interface ITargetContainer {
	type: "tripDetails" | "day";
	day?: number;
	nestedIn?: number;
}

export function moveItemInData(
	optionsData: TOptionsData,
	from: IItemLocation,
	target: ITargetContainer,
	toIndex: number,
	movedItem: IDayItem,
	targetOptionId: number
): TOptionsData {
	// Check if we're moving within the same container
	const isSameOption = from.optionId === targetOptionId;
	const isSameDay =
		from.location === "day" &&
		target.type === "day" &&
		from.day === target.day;
	const isSameTripDetails =
		from.location === "tripDetails" && target.type === "tripDetails";
	const isSameContainer = isSameOption && (isSameTripDetails || isSameDay);

	// Adjust target indices if moving within the same container
	let adjustedTarget = { ...target };
	let adjustedToIndex = toIndex;

	if (
		isSameContainer &&
		from.nestedIndex === undefined &&
		target.nestedIn === undefined
	) {
		// Moving within the same top-level array
		if (from.index < toIndex) {
			adjustedToIndex = toIndex - 1;
		}
	} else if (
		isSameContainer &&
		from.nestedIndex === undefined &&
		target.nestedIn !== undefined
	) {
		// Moving from top-level to nested in the same array
		// If the item we're removing is before the parent container, adjust parent index
		if (from.index < target.nestedIn) {
			adjustedTarget = { ...target, nestedIn: target.nestedIn - 1 };
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
