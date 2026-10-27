import type { Table } from "@tanstack/react-table";
import { type ReactNode, type RefObject } from "react";

import { SearchFilter } from "./search-filter";
import { StatusFilter } from "./status-filter";
import { StatusTabsFilter } from "./status-tabs-filter";
import { VisibilityFilter } from "./visibility-filter";

interface IFiltersProps<TData extends object> extends IShowFilters {
	id: string;
	inputRef: RefObject<HTMLInputElement | null>;
	table: Table<TData>;
	selectedStatuses: string[];
	uniqueStatusValues: string[];
	handleStatusChange: (checked: boolean, value: string) => void;
	currentView?: "table" | "cards";
	searchKey?: keyof TData;
	/** Элементы в конце группы контролов (actions, переключатель вида) */
	trailing?: ReactNode;
}

export interface IShowFilters {
	showSearchFilter?: boolean;
	showStatusFilter?: boolean;
	showVisibilityFilter?: boolean;
	statusTabs?: { label: string; value: string }[];
	activeStatusTab?: string;
	showStatusTabsFilter?: boolean;
	onStatusTabChange?: (value: string) => void;
	search?: string;
	onSearchChange?: (value: string) => void;
	minSearchLength?: number;
	status?: string[];
	onStatusChange?: (value: string[]) => void;
	statusOptions?: { label: string; value: string }[];
}

export const Filters = <TData extends object>({
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
	showStatusTabsFilter = false,
	onStatusTabChange,
	search,
	onSearchChange,
	minSearchLength,
	status: controlledStatus,
	onStatusChange,
	statusOptions,
	currentView = "table",
	searchKey,
	trailing
}: IFiltersProps<TData>) => {
	const showTabs =
		(currentView === "cards" || showStatusTabsFilter) &&
		Boolean(statusTabs?.length);
	/** Серверный фильтр (onStatusChange) от вида не зависит; фасетный — по колонке, только в таблице */
	const showStatus =
		(currentView === "table" || Boolean(onStatusChange)) &&
		!showStatusTabsFilter &&
		showStatusFilter;
	const showVisibility = currentView === "table" && showVisibilityFilter;
	const hasControls =
		showSearchFilter || showStatus || showVisibility || Boolean(trailing);

	// Фрагмент: табы и контролы — прямые элементы flex-wrap тулбара SmartTable.
	// Если вместе не помещаются, контролы (вместе с trailing) уходят на новую строку.
	return (
		<>
			{/* Status tabs filter - только для режима карточек */}
			{showTabs && statusTabs && (
				<StatusTabsFilter
					statusTabs={statusTabs}
					activeStatusTab={activeStatusTab}
					onStatusTabChange={onStatusTabChange}
				/>
			)}
			{hasControls && (
				<div className="flex min-w-0 grow flex-wrap items-center justify-end gap-3">
					{/* Filter by name or email */}
					{showSearchFilter && (
						<SearchFilter<TData>
							id={id}
							inputRef={inputRef}
							table={table}
							search={search}
							onSearchChange={onSearchChange}
							minSearchLength={minSearchLength}
							searchKey={searchKey}
						/>
					)}
					{/* Filter by status - только для режима таблицы */}
					{showStatus && (
						<StatusFilter
							id={id}
							selectedStatuses={
								controlledStatus ?? selectedStatuses
							}
							uniqueStatusValues={uniqueStatusValues}
							handleStatusChange={
								onStatusChange
									? (checked: boolean, value: string) => {
											const current =
												controlledStatus ?? [];
											const next = checked
												? [...current, value]
												: current.filter(
														(s: string) =>
															s !== value
													);
											onStatusChange(next);
										}
									: handleStatusChange
							}
							statusOptions={statusOptions}
						/>
					)}
					{/* Toggle columns visibility */}
					{showVisibility && (
						<VisibilityFilter<TData> table={table} />
					)}
					{/* Actions и переключатель вида — переносятся вместе с фильтрами */}
					{trailing}
				</div>
			)}
		</>
	);
};
