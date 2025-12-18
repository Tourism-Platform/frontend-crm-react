import type { IDayItem } from "./day-item.types";

export interface IOption {
	id: number;
	name: string;
}

export interface IOptionData {
	tripDetails: IDayItem[];
	days: Record<number, IDayItem[]>;
	dayOrder: number[];
}

export type TOptionsData = Record<number, IOptionData>;
