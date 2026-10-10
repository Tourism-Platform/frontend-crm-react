import type {
	FieldValues,
	Path,
	PathValue,
	UseFormReturn
} from "react-hook-form";

/**
 * Removes a node (car, room, supplement item) together with the price row at
 * the same index. Price rows are aligned to nodes by index, so removing only
 * the node would shift every later price onto the wrong node.
 */
export const removeWithPriceRow = <T extends FieldValues>(
	form: UseFormReturn<T>,
	removeNode: (index: number) => void,
	priceRowsPath: string,
	index: number
) => {
	const path = priceRowsPath as Path<T>;
	const rows = form.getValues(path) as unknown;

	if (Array.isArray(rows) && index < rows.length) {
		form.setValue(
			path,
			rows.filter((_, rowIndex) => rowIndex !== index) as PathValue<
				T,
				Path<T>
			>,
			{ shouldDirty: true }
		);
	}

	removeNode(index);
};
