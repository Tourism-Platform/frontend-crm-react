export interface IItemBaseLocation {
	location: "tripDetails" | "day";
	day?: number;
	nestedIndex?: number;
}

export interface IItemLocation extends IItemBaseLocation {
	optionId: string;
	index: number;
}

export interface IBaseDnDProps {
	optionId: string;
	onRemoveItem: (loc: IItemLocation) => void;
	onDuplicateItem?: (loc: IItemLocation) => void;
	onSaveItemToLibrary?: (loc: IItemLocation) => void;
}
