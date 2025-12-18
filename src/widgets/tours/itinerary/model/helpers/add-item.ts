import type { IDayItem, TOptionsData } from "../types";

interface ITargetContainer {
	location: "tripDetails" | "day";
	day?: number;
	nestedIndex?: number;
}

export function addItemToData(
	optionsData: TOptionsData,
	target: ITargetContainer,
	toIndex: number,
	item: IDayItem,
	targetOptionId: number
): TOptionsData {
	const resultData = { ...optionsData };
	const targetOpt = { ...resultData[targetOptionId] };

	if (target.location === "tripDetails") {
		const trg = [...targetOpt.tripDetails];
		if (target.nestedIndex !== undefined) {
			const parent = { ...trg[target.nestedIndex] };
			const nested = [...(parent.items || [])];
			nested.splice(toIndex, 0, item);
			parent.items = nested;
			trg[target.nestedIndex] = parent;
		} else {
			trg.splice(toIndex, 0, item);
		}
		targetOpt.tripDetails = trg;
	} else {
		const dayNum = target.day as number;
		const trg = [...(targetOpt.days[dayNum] || [])];
		if (target.nestedIndex !== undefined) {
			const parent = { ...trg[target.nestedIndex] };
			const nested = [...(parent.items || [])];
			nested.splice(toIndex, 0, item);
			parent.items = nested;
			trg[target.nestedIndex] = parent;
		} else {
			trg.splice(toIndex, 0, item);
		}
		targetOpt.days = {
			...targetOpt.days,
			[dayNum]: trg
		};
	}
	resultData[targetOptionId] = targetOpt;
	return resultData;
}
