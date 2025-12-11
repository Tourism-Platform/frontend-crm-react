import type { Table } from "@tanstack/react-table";
import { type FC, type RefObject } from "react";

import type { IItem } from "../../model";

import { SearchFilter } from "./search-filter";
import { StatusFilter } from "./status-filter";
import { VisibilityFilter } from "./visibility-filter";

interface IFiltersProps extends IShowFilters {
	id: string;
	inputRef: RefObject<HTMLInputElement | null>;
	table: Table<IItem>;
	selectedStatuses: string[];
	uniqueStatusValues: any[];
	handleStatusChange: (checked: boolean, value: string) => void;
}

export interface IShowFilters {
	showSearchFilter?: boolean;
	showStatusFilter?: boolean;
	showVisibilityFilter?: boolean;
}

export const Filters: FC<IFiltersProps> = ({
	id,
	inputRef,
	table,
	selectedStatuses,
	uniqueStatusValues,
	handleStatusChange,
	showSearchFilter = true,
	showStatusFilter = true,
	showVisibilityFilter = true
}) => {
	return (
		<div className="flex items-center gap-3">
			{/* Filter by name or email */}
			{showSearchFilter && (
				<SearchFilter id={id} inputRef={inputRef} table={table} />
			)}
			{/* Filter by status */}
			{showStatusFilter && (
				<StatusFilter
					id={id}
					selectedStatuses={selectedStatuses}
					uniqueStatusValues={uniqueStatusValues}
					handleStatusChange={handleStatusChange}
				/>
			)}
			{/* Toggle columns visibility */}
			{showVisibilityFilter && <VisibilityFilter table={table} />}
		</div>
	);
};
