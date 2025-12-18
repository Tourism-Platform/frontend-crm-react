import { containerIdTrip, findItemLocation } from "../helpers";
import type { IItemBaseLocation, TOptionsData } from "../types";

export interface ITargetInfo {
	container: IItemBaseLocation | null;
	toIndex: number;
}

export const getTargetContainer = (
	overIdStr: string,
	optionsData: TOptionsData,
	activeOption: number
): ITargetInfo => {
	let targetContainer: IItemBaseLocation | null = null;
	let toIndex = 0;

	if (overIdStr === containerIdTrip()) {
		targetContainer = { location: "tripDetails" };
		toIndex = optionsData[activeOption].tripDetails.length;
	} else if (overIdStr.startsWith("container:day-")) {
		const day = Number(overIdStr.replace("container:day-", ""));
		targetContainer = { location: "day", day };
		toIndex = (optionsData[activeOption].days[day] || []).length;
	} else if (overIdStr.startsWith("item:")) {
		const rawOver = overIdStr.replace("item:", "");
		const loc = findItemLocation(optionsData, rawOver);
		if (loc) {
			const isNested = loc.nestedIndex !== undefined;
			targetContainer =
				loc.location === "tripDetails"
					? {
							location: "tripDetails",
							nestedIndex: isNested ? loc.index : undefined
						}
					: {
							location: "day",
							day: loc.day,
							nestedIndex: isNested ? loc.index : undefined
						};
			toIndex = isNested ? loc.nestedIndex! : loc.index;
		}
	} else if (overIdStr.startsWith("container:nested:")) {
		const parentBlockId = overIdStr.replace("container:nested:", "");
		const loc = findItemLocation(optionsData, parentBlockId);
		if (loc) {
			targetContainer =
				loc.location === "tripDetails"
					? { location: "tripDetails", nestedIndex: loc.index }
					: {
							location: "day",
							day: loc.day,
							nestedIndex: loc.index
						};
			const parent =
				loc.location === "tripDetails"
					? optionsData[loc.optionId].tripDetails[loc.index]
					: optionsData[loc.optionId].days[loc.day as number][
							loc.index
						];
			toIndex = (parent.items || []).length;
		}
	}

	return { container: targetContainer, toIndex };
};
