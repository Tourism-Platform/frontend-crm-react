import type { IEventOptionReorder, ITourEventOption } from "../types";

/**
 * Reorder payload — the current option row IDs in the new order.
 * Contract 3.1: `order` is `string[]` of event option ids, not indices.
 */
export const getMultiplyOptionsOrder = (
	currentOptions: Pick<ITourEventOption, "id">[]
): IEventOptionReorder => ({
	order: currentOptions.map((option) => option.id)
});

export const hasMultiplyOptionsOrderChanged = (
	originalOptions: Pick<ITourEventOption, "id">[],
	currentOptions: Pick<ITourEventOption, "id">[]
): boolean =>
	originalOptions.length !== currentOptions.length ||
	originalOptions.some(
		(option, index) => option.id !== currentOptions[index]?.id
	);

export const getRemovedMultiplyOptions = (
	originalOptions: Pick<ITourEventOption, "id">[],
	currentOptions: Pick<ITourEventOption, "id">[]
): Pick<ITourEventOption, "id">[] => {
	const currentIds = new Set(currentOptions.map((option) => option.id));
	return originalOptions.filter((option) => !currentIds.has(option.id));
};
