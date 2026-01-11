"use client";

import { type Table } from "@tanstack/react-table";
import { useMemo, useRef } from "react";

import type { TViewModeType } from "../model";

import { Filters } from "./filters";

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
	status?: string[];
	onStatusChange?: (value: string[]) => void;
	statusOptions?: { label: string; value: string }[];
	currentView?: TViewModeType;
	searchKey?: keyof TData;
	statusKey?: keyof TData;
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
	status: controlledStatus,
	onStatusChange,
	statusOptions,
	currentView = "table",
	searchKey,
	statusKey = "status" as keyof TData
}: SmartTableFiltersProps<TData>) {
	const inputRef = useRef<HTMLInputElement>(null);

	// Reusing logic from CustomTable filters if possible, or adapting it
	const uniqueStatusValues = useMemo(() => {
		const statusColumn = table.getColumn(statusKey as string);
		if (!statusColumn) return [];
		const values = Array.from(statusColumn.getFacetedUniqueValues().keys());
		return values.sort();
	}, [table, statusKey]);

	const selectedStatuses = useMemo(() => {
		const filterValue = table
			.getColumn(statusKey as string)
			?.getFilterValue() as string[];
		return filterValue ?? [];
	}, [table, statusKey]);

	const handleStatusChange = (checked: boolean, value: string) => {
		const filterValue = table
			.getColumn(statusKey as string)
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
			.getColumn(statusKey as string)
			?.setFilterValue(
				newFilterValue.length ? newFilterValue : undefined
			);
	};

	return (
		<Filters<TData>
			id={id}
			inputRef={inputRef}
			table={table}
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
			status={controlledStatus}
			onStatusChange={onStatusChange}
			statusOptions={statusOptions}
			currentView={currentView}
			searchKey={searchKey}
		/>
	);
}
