"use client";

import {
	type ColumnFiltersState,
	type PaginationState,
	type SortingState,
	type VisibilityState,
	getCoreRowModel,
	getExpandedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from "@tanstack/react-table";
import { LayoutGridIcon, StretchHorizontalIcon } from "lucide-react";
import { useId, useState } from "react";

import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	DataGrid,
	DataGridContainer,
	DataGridTable
} from "@/shared/ui";
import { DataGridTableDnD } from "@/shared/ui/shadcn-ui/data-grid-table-dnd";

import { type TSmartTableProps } from "../model/types";

import { SmartTableFilters } from "./smart-table-filters";
import { SmartTablePagination } from "./smart-table-pagination";

export function SmartTable<TData extends object>({
	columns,
	data,
	actions,
	showPagination = true,
	showSearchFilter = true,
	showStatusFilter = true,
	showVisibilityFilter = true,
	showTopFilters = true,
	topChildren,
	useViewMode = false,
	defaultViewMode = "table",
	card: Card,
	statusTabs,
	activeStatusTab,
	onStatusTabChange,
	recordCount,
	isLoading = false,
	loadingMode = "skeleton",
	tableLayout,
	getSubRows,
	...props
}: TSmartTableProps<TData>) {
	const id = useId();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	});
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnOrder, setColumnOrder] = useState<string[]>(
		columns
			.map((column) => {
				if ("id" in column && column.id) return column.id as string;
				if ("accessorKey" in column && column.accessorKey)
					return column.accessorKey as string;
				return "";
			})
			.filter(Boolean)
	);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			pagination,
			columnFilters,
			columnVisibility,
			columnOrder
		},
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getExpandedRowModel: getExpandedRowModel(),
		getSubRows,
		columnResizeMode: "onChange",
		enableSortingRemoval: false,
		manualPagination: !!recordCount
	});

	const VIEW_CONFIG = [
		...(useViewMode && Card
			? [
					{
						type: "cards" as const,
						component: (
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
								{data.map((item, index) => (
									<Card
										key={
											(item as { id?: string }).id ||
											index
										}
										data={item}
									/>
								))}
							</div>
						),
						icon: <LayoutGridIcon className="w-3 h-3" />
					}
				]
			: []),
		{
			type: "table" as const,
			component:
				tableLayout?.columnsDraggable || tableLayout?.rowsDraggable ? (
					<DataGridTableDnD />
				) : (
					<DataGridTable />
				),
			icon: <StretchHorizontalIcon className="w-3 h-3" />
		}
	];

	return (
		<DataGrid
			table={table}
			recordCount={recordCount ?? data.length}
			isLoading={isLoading}
			loadingMode={loadingMode}
			tableLayout={tableLayout}
			{...props}
		>
			<CustomOptionTabs defaultValue={defaultViewMode}>
				<div className="space-y-4">
					<div className="grid grid-cols-[1fr_auto] items-center gap-3">
						<div className="flex items-center gap-3">
							{topChildren}
							{showTopFilters && (
								<SmartTableFilters
									id={id}
									table={table}
									showSearchFilter={showSearchFilter}
									showStatusFilter={showStatusFilter}
									showVisibilityFilter={showVisibilityFilter}
									statusTabs={statusTabs}
									activeStatusTab={activeStatusTab}
									onStatusTabChange={onStatusTabChange}
								/>
							)}
						</div>

						<div className="flex items-center gap-3">
							{actions}
							{useViewMode && (
								<CustomOptionTabsList className="grid-cols-2 gap-2">
									{VIEW_CONFIG.map((item) => (
										<CustomOptionTabsTrigger
											key={item.type}
											value={item.type}
											asChild
										>
											<Button
												variant="outline"
												size="icon"
											>
												{item.icon}
											</Button>
										</CustomOptionTabsTrigger>
									))}
								</CustomOptionTabsList>
							)}
						</div>
					</div>

					<DataGridContainer>
						{VIEW_CONFIG.map((item) => (
							<CustomOptionTabsContent
								key={item.type}
								value={item.type}
							>
								{item.component}
							</CustomOptionTabsContent>
						))}
					</DataGridContainer>

					{showPagination && <SmartTablePagination id={id} />}
				</div>
			</CustomOptionTabs>
		</DataGrid>
	);
}
