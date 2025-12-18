import type { TOptionsData } from "../types";

export function findItemLocation(
	optionsData: TOptionsData,
	itemIdRaw: string
): {
	optionId: number;
	location: "tripDetails" | "day";
	day?: number;
	index: number;
	nestedIndex?: number;
} | null {
	for (const key of Object.keys(optionsData)) {
		const optionKey = Number(key);
		const data = optionsData[optionKey];

		// tripDetails
		for (let i = 0; i < data.tripDetails.length; i++) {
			const item = data.tripDetails[i];
			if (item.block_id === itemIdRaw) {
				return {
					optionId: optionKey,
					location: "tripDetails",
					index: i
				};
			}
			if (item.items) {
				const nIdx = item.items.findIndex(
					(it) => it.block_id === itemIdRaw
				);
				if (nIdx !== -1) {
					return {
						optionId: optionKey,
						location: "tripDetails",
						index: i,
						nestedIndex: nIdx
					};
				}
			}
		}

		// days
		for (const dayKey of Object.keys(data.days)) {
			const day = Number(dayKey);
			const dayItems = data.days[day];
			for (let i = 0; i < dayItems.length; i++) {
				const item = dayItems[i];
				if (item.block_id === itemIdRaw) {
					return {
						optionId: optionKey,
						location: "day",
						day,
						index: i
					};
				}
				if (item.items) {
					const nIdx = item.items.findIndex(
						(it) => it.block_id === itemIdRaw
					);
					if (nIdx !== -1) {
						return {
							optionId: optionKey,
							location: "day",
							day,
							index: i,
							nestedIndex: nIdx
						};
					}
				}
			}
		}
	}
	return null;
}
