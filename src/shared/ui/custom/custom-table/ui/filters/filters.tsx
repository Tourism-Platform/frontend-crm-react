import type { Table } from "@tanstack/react-table";
import { type FC, type RefObject } from "react";

import type { IItem } from "../../model";

import { SearchFilter } from "./search-filter";
import { StatusFilter } from "./status-filter";
import { StatusTabsFilter } from "./status-tabs-filter";
import { VisibilityFilter } from "./visibility-filter";

interface IFiltersProps extends IShowFilters {
	id: string;
	inputRef: RefObject<HTMLInputElement | null>;
	table: Table<IItem>;
	selectedStatuses: string[];
	uniqueStatusValues: any[];
	handleStatusChange: (checked: boolean, value: string) => void;
	currentView?: "table" | "cards";
}

export interface IShowFilters {
	showSearchFilter?: boolean;
	showStatusFilter?: boolean;
	showVisibilityFilter?: boolean;
	statusTabs?: { label: string; value: string }[];
	activeStatusTab?: string;
	onStatusTabChange?: (value: string) => void;
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
	showVisibilityFilter = true,
	statusTabs,
	activeStatusTab,
	onStatusTabChange,
	currentView = "table"
}) => {
	return (
		<div className="flex justify-between gap-3">
			{/* Status tabs filter - только для режима карточек */}
			{currentView === "cards" && statusTabs && statusTabs.length > 0 && (
				<StatusTabsFilter
					statusTabs={statusTabs}
					activeStatusTab={activeStatusTab}
					onStatusTabChange={onStatusTabChange}
				/>
			)}
			<div className="flex items-center gap-3">
				{/* Filter by name or email */}
				{showSearchFilter && (
					<SearchFilter id={id} inputRef={inputRef} table={table} />
				)}
				{/* Filter by status - только для режима таблицы */}
				{currentView === "table" && showStatusFilter && (
					<StatusFilter
						id={id}
						selectedStatuses={selectedStatuses}
						uniqueStatusValues={uniqueStatusValues}
						handleStatusChange={handleStatusChange}
					/>
				)}
				{/* Toggle columns visibility */}
				{currentView === "table" && showVisibilityFilter && (
					<VisibilityFilter table={table} />
				)}
			</div>
		</div>
	);
};
