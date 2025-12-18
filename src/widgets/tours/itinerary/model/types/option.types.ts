import type { IDayItem } from "./day-item.types";

export interface IOption {
	id: number;
	name: string;
}

export type TOptionsData = Record<
	number,
	{
		tripDetails: IDayItem[];
		days: Record<number, IDayItem[]>;
		dayOrder: number[];
	}
>;
