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
import { useEffect, useId, useState } from "react";

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

import { EmptyState } from "./empty-state";
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
	showStatusTabsFilter = false,
	recordCount,
	isLoading = false,
	loadingMode = "skeleton",
	tableLayout,
	pagination: externalPagination,
	onPaginationChange: externalOnPaginationChange,
	getSubRows,
	getRowCanExpand,
	...props
}: TSmartTableProps<TData>) {
	const id = useId();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);
	const [internalPagination, setInternalPagination] =
		useState<PaginationState>({
			pageIndex: 0,
			pageSize: 10
		});
	const pagination = externalPagination ?? internalPagination;
	const onPaginationChange =
		externalOnPaginationChange ?? setInternalPagination;

	const [sorting, setSorting] = useState<SortingState>([]);
	const getColumnIds = (cols: typeof columns) =>
		cols
			.map((column) => {
				if ("id" in column && column.id) return column.id as string;
				if ("accessorKey" in column && column.accessorKey)
					return column.accessorKey as string;
				return "";
			})
			.filter(Boolean);

	const [columnOrder, setColumnOrder] = useState<string[]>(
		getColumnIds(columns)
	);

	// Синхронизация columnOrder при изменении columns
	useEffect(() => {
		setColumnOrder(getColumnIds(columns));
	}, [columns]);

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
		onPaginationChange,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getExpandedRowModel: getExpandedRowModel(),
		getRowCanExpand: getRowCanExpand as any,
		getSubRows,
		columnResizeMode: "onChange",
		enableSortingRemoval: false,
		manualPagination: recordCount !== undefined,
		pageCount:
			recordCount !== undefined
				? Math.ceil(recordCount / pagination.pageSize)
				: -1
	});

	// Если на текущей странице нет данных (после удаления) и это не первая страница,
	// переходим на предыдущую таблицу.
	useEffect(() => {
		if (
			!isLoading &&
			pagination.pageIndex > 0 &&
			data.length === 0 &&
			recordCount !== undefined &&
			recordCount > 0
		) {
			table.setPageIndex(pagination.pageIndex - 1);
		}
	}, [data.length, isLoading, recordCount, pagination.pageIndex, table]);

	const VIEW_CONFIG = [
		...(useViewMode && Card
			? [
					{
						type: "cards" as const,
						component: (
							<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
								{data.length > 0 ? (
									data.map((item, index) => (
										<Card
											key={
												(item as { id?: string }).id ||
												index
											}
											data={item}
										/>
									))
								) : (
									<div className="col-span-full">
										<EmptyState />
									</div>
								)}
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
			emptyMessage={<EmptyState />}
			{...props}
		>
			<CustomOptionTabs defaultValue={defaultViewMode}>
				<div className="space-y-4">
					{(topChildren ||
						showTopFilters ||
						actions ||
						useViewMode) && (
						<div
							className={`grid-cols-[1fr_auto] items-center gap-3 ${!!actions || useViewMode ? "grid" : "block"}`}
						>
							<div className="flex items-center gap-3">
								{topChildren}
								{showTopFilters && (
									<SmartTableFilters
										id={id}
										table={table}
										showSearchFilter={showSearchFilter}
										showStatusFilter={showStatusFilter}
										showVisibilityFilter={
											showVisibilityFilter
										}
										showStatusTabsFilter={
											showStatusTabsFilter
										}
										statusTabs={statusTabs}
										activeStatusTab={activeStatusTab}
										onStatusTabChange={onStatusTabChange}
									/>
								)}
							</div>
							<div
								className={`flex items-center gap-3 ${!!actions || useViewMode ? "flex" : "hidden"}`}
							>
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
					)}

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
