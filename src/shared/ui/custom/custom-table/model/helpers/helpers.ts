import type { FilterFn } from "@tanstack/react-table";

import type { IItem } from "../item.types";

export const multiColumnFilterFn: FilterFn<IItem> = (row, filterValue) => {
	const searchableRowContent =
		`${row.original.name} ${row.original.email}`.toLowerCase();
	const searchTerm = (filterValue ?? "").toLowerCase();
	return searchableRowContent.includes(searchTerm);
};

export const statusFilterFn: FilterFn<IItem> = (
	row,
	columnId,
	filterValue: string[]
) => {
	if (!filterValue?.length) return true;
	const status = row.getValue(columnId) as string;
	return filterValue.includes(status);
};
