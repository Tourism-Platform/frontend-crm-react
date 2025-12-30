"use client";

import { type Table } from "@tanstack/react-table";
import { useMemo, useRef } from "react";

import { Filters } from "../../custom-table/ui/filters";
import type { TViewModeType } from "../model";

interface SmartTableFiltersProps<TData extends object> {
	id: string;
	table: Table<TData>;
	showSearchFilter?: boolean;
	showStatusFilter?: boolean;
	showVisibilityFilter?: boolean;
	statusTabs?: { label: string; value: string }[];
	activeStatusTab?: string;
	onStatusTabChange?: (value: string) => void;
	showStatusTabsFilter?: boolean;
	search?: string;
	onSearchChange?: (value: string) => void;
	status?: any[];
	onStatusChange?: (value: any[]) => void;
	statusOptions?: { label: string; value: string }[];
	currentView?: TViewModeType;
}

export function SmartTableFilters<TData extends object>({
	id,
	table,
	showSearchFilter,
	showStatusFilter,
	showVisibilityFilter,
	statusTabs,
	activeStatusTab,
	onStatusTabChange,
	showStatusTabsFilter,
	search,
	onSearchChange,
	status,
	onStatusChange,
	statusOptions,
	currentView = "table"
}: SmartTableFiltersProps<TData>) {
	const inputRef = useRef<HTMLInputElement>(null);

	// Reusing logic from CustomTable filters if possible, or adapting it
	const uniqueStatusValues = useMemo(() => {
		const statusColumn = table.getColumn("status");
		if (!statusColumn) return [];
		const values = Array.from(statusColumn.getFacetedUniqueValues().keys());
		return values.sort();
	}, [table.getColumn("status")]);

	const selectedStatuses = useMemo(() => {
		const filterValue = table
			.getColumn("status")
			?.getFilterValue() as string[];
		return filterValue ?? [];
	}, [table.getColumn("status")]);

	const handleStatusChange = (checked: boolean, value: string) => {
		const filterValue = table
			.getColumn("status")
			?.getFilterValue() as string[];
		const newFilterValue = filterValue ? [...filterValue] : [];

		if (checked) {
			newFilterValue.push(value);
		} else {
			const index = newFilterValue.indexOf(value);
			if (index > -1) {
				newFilterValue.splice(index, 1);
			}
		}

		table
			.getColumn("status")
			?.setFilterValue(
				newFilterValue.length ? newFilterValue : undefined
			);
	};

	return (
		<Filters
			id={id}
			inputRef={inputRef}
			table={table as any}
			selectedStatuses={selectedStatuses}
			uniqueStatusValues={uniqueStatusValues}
			handleStatusChange={handleStatusChange}
			showSearchFilter={showSearchFilter}
			showStatusFilter={showStatusFilter}
			showVisibilityFilter={showVisibilityFilter}
			statusTabs={statusTabs}
			activeStatusTab={activeStatusTab}
			onStatusTabChange={onStatusTabChange}
			showStatusTabsFilter={showStatusTabsFilter}
			search={search}
			onSearchChange={onSearchChange}
			status={status}
			onStatusChange={onStatusChange}
			statusOptions={statusOptions}
			currentView={currentView}
		/>
	);
}
