import type { Table } from "@tanstack/react-table";
import { type FC, type RefObject } from "react";

import type { IItem } from "../../model";

import { SearchFilter } from "./search-filter";
import { StatusFilter } from "./status-filter";
import { VisibilityFilter } from "./visibility-filter";

interface IFiltersProps {
	id: string;
	inputRef: RefObject<HTMLInputElement | null>;
	table: Table<IItem>;
	selectedStatuses: string[];
	uniqueStatusValues: any[];
	handleStatusChange: (checked: boolean, value: string) => void;
}

export const Filters: FC<IFiltersProps> = ({
	id,
	inputRef,
	table,
	selectedStatuses,
	uniqueStatusValues,
	handleStatusChange
}) => {
	return (
		<div className="flex items-center gap-3">
			{/* Filter by name or email */}
			<SearchFilter id={id} inputRef={inputRef} table={table} />
			{/* Filter by status */}
			<StatusFilter
				id={id}
				selectedStatuses={selectedStatuses}
				uniqueStatusValues={uniqueStatusValues}
				handleStatusChange={handleStatusChange}
			/>
			{/* Toggle columns visibility */}
			<VisibilityFilter table={table} />
		</div>
	);
};
