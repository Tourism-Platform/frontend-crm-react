export interface IRemoveItemLoc {
	optionId: number;
	location: "tripDetails" | "day";
	day?: number;
	index: number;
	nestedIndex?: number;
}

export interface IBaseDnDProps {
	optionId: number;
	onRemoveItem: (loc: IRemoveItemLoc) => void;
}
