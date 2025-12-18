export interface IItemBaseLocation {
	location: "tripDetails" | "day";
	day?: number;
	nestedIndex?: number;
}

export interface IItemLocation extends IItemBaseLocation {
	optionId: number;
	index: number;
}

export interface IBaseDnDProps {
	optionId: number;
	onRemoveItem: (loc: IItemLocation) => void;
}
