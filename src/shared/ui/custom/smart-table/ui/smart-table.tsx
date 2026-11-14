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
import {
	LayoutGridIcon,
	LayoutListIcon,
	StretchHorizontalIcon
} from "lucide-react";
import {
	type FC,
	memo,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useState
} from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger
} from "@/shared/ui";
import { DataGrid, DataGridContainer } from "@/shared/ui/shadcn-ui/data-grid";
import { DataGridTable } from "@/shared/ui/shadcn-ui/data-grid-table";
import { DataGridTableDnD } from "@/shared/ui/shadcn-ui/data-grid-table-dnd";

import { type TSmartTableProps, type TViewModeType } from "../model";

import { EmptyState } from "./empty-state";
import { SmartTableFilters } from "./smart-table-filters";
import { SmartTablePagination } from "./smart-table-pagination";

/** Колонки переключателя вида — по числу видов (карточки, список, таблица) */
const VIEW_TABS_COLS: Record<number, string> = {
	2: "grid-cols-2",
	3: "grid-cols-3"
};

function SmartTableInner<TData extends object>({
	columns,
	data,
	actions,
	defaultExpanded = false,
	showPagination = true,
	showSearchFilter = true,
	showStatusFilter = true,
	showVisibilityFilter = true,
	showTopFilters = true,
	topChildren,
	useViewMode = false,
	defaultViewMode = "table",
	card: Card,
	cardSkeleton: CardSkeleton,
	CardsClassName,
	listCard: ListCard,
	listCardSkeleton: ListCardSkeleton,
	ListClassName,
	TableClassName,
	statusTabs,
	activeStatusTab,
	onStatusTabChange,
	showStatusTabsFilter = false,
	recordCount,
	isLoading = false,
	loadingMode = "skeleton",
	tableLayout,
	pagination: externalPagination,
	defaultPageSize = 10,
	onPaginationChange: externalOnPaginationChange,
	search,
	onSearchChange,
	minSearchLength,
	searchResetKey,
	status,
	onStatusChange,
	statusOptions,
	getSubRows,
	getRowCanExpand,
	searchKey,
	statusKey,
	...props
}: TSmartTableProps<TData>) {
	const { t } = useTranslation("common");
	const id = useId();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);
	const [internalPagination, setInternalPagination] =
		useState<PaginationState>({
			pageIndex: 0,
			pageSize: defaultPageSize
		});
	const pagination = externalPagination ?? internalPagination;
	const onPaginationChange =
		externalOnPaginationChange ?? setInternalPagination;

	const [sorting, setSorting] = useState<SortingState>([]);
	const getColumnIds = useCallback(
		(cols: typeof columns) =>
			cols
				.map((column) => {
					if ("id" in column && column.id) return column.id as string;
					if ("accessorKey" in column && column.accessorKey)
						return column.accessorKey as string;
					return "";
				})
				.filter(Boolean),
		[]
	);

	const [columnOrder, setColumnOrder] = useState<string[]>(
		getColumnIds(columns)
	);

	// Синхронизация columnOrder при изменении columns
	useEffect(() => {
		setColumnOrder(getColumnIds(columns));
	}, [columns, getColumnIds]);

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
		initialState: {
			expanded: defaultExpanded || {}
		},
		onSortingChange: setSorting,
		onPaginationChange,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onColumnOrderChange: setColumnOrder,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		...(showPagination || recordCount !== undefined || Boolean(getSubRows)
			? { getPaginationRowModel: getPaginationRowModel() }
			: {}),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getExpandedRowModel: getExpandedRowModel(),
		// Keep expanded children on the same page as their parent
		paginateExpandedRows: false,
		getRowCanExpand: getRowCanExpand as any,
		getSubRows,
		columnResizeMode: "onChange",
		enableSortingRemoval: false,
		autoResetPageIndex: false,
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

	const VIEW_CONFIG = useMemo(() => {
		// Карточки и длинные карточки: скелетоны при загрузке, пустое состояние без данных
		const renderCards = (
			Item: FC<{ data: TData }>,
			ItemSkeleton: FC | undefined,
			className: string
		) => (
			<div className={className}>
				{isLoading && loadingMode === "skeleton" ? (
					Array.from({ length: pagination.pageSize }).map((_, i) =>
						ItemSkeleton ? (
							<ItemSkeleton key={i} />
						) : (
							<div
								key={i}
								className="h-64 rounded-xl bg-muted animate-pulse"
							/>
						)
					)
				) : data.length > 0 ? (
					data.map((item, index) => (
						<Item
							key={(item as { id?: string }).id || index}
							data={item}
						/>
					))
				) : (
					<div className="col-span-full">
						<EmptyState />
					</div>
				)}
			</div>
		);

		return [
			...(useViewMode && Card
				? [
						{
							type: "cards" as const,
							component: renderCards(
								Card,
								CardSkeleton,
								cn(
									"grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4",
									CardsClassName
								)
							),
							icon: <LayoutGridIcon className="w-3 h-3" />,
							label: t("table.view_mode.cards")
						}
					]
				: []),
			...(useViewMode && ListCard
				? [
						{
							type: "list" as const,
							component: renderCards(
								ListCard,
								ListCardSkeleton,
								cn("flex flex-col gap-3", ListClassName)
							),
							icon: <LayoutListIcon className="w-3 h-3" />,
							label: t("table.view_mode.list")
						}
					]
				: []),
			{
				type: "table" as const,
				component: (
					<DataGridContainer
						className={cn("custom-scrollbar", TableClassName)}
					>
						{tableLayout?.columnsDraggable ||
						tableLayout?.rowsDraggable ? (
							<DataGridTableDnD />
						) : (
							<DataGridTable />
						)}
					</DataGridContainer>
				),
				icon: <StretchHorizontalIcon className="w-3 h-3" />,
				label: t("table.view_mode.table")
			}
		];
	}, [
		useViewMode,
		Card,
		CardsClassName,
		ListCard,
		ListCardSkeleton,
		ListClassName,
		isLoading,
		loadingMode,
		pagination.pageSize,
		CardSkeleton,
		data,
		TableClassName,
		tableLayout?.columnsDraggable,
		tableLayout?.rowsDraggable,
		t
	]);

	const [currentView, setCurrentView] =
		useState<TViewModeType>(defaultViewMode);

	// Actions и переключатель вида — в конце группы контролов,
	// чтобы переноситься вместе с поиском и фильтрами
	const trailing =
		actions || useViewMode ? (
			<>
				{actions}
				{useViewMode && (
					<CustomOptionTabsList
						className={cn(
							"h-9 shrink-0 gap-2",
							VIEW_TABS_COLS[VIEW_CONFIG.length]
						)}
					>
						{VIEW_CONFIG.map((item) => (
							<CustomOptionTabsTrigger
								key={item.type}
								value={item.type}
								aria-label={item.label}
								title={item.label}
							>
								{item.icon}
							</CustomOptionTabsTrigger>
						))}
					</CustomOptionTabsList>
				)}
			</>
		) : null;

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
			<CustomOptionTabs
				value={currentView}
				onValueChange={(val) => setCurrentView(val as TViewModeType)}
			>
				<div className="space-y-4">
					{(topChildren ||
						showTopFilters ||
						actions ||
						useViewMode) && (
						// Плоский flex-wrap: если табы и контролы не помещаются в строку,
						// контролы (вместе с actions и переключателем вида) переносятся,
						// а табы при нехватке ширины листаются свайпом
						<div className="flex flex-wrap items-center gap-3">
							{topChildren}
							{showTopFilters ? (
								<SmartTableFilters
									id={id}
									table={table}
									showSearchFilter={showSearchFilter}
									showStatusFilter={showStatusFilter}
									showVisibilityFilter={showVisibilityFilter}
									showStatusTabsFilter={showStatusTabsFilter}
									statusTabs={statusTabs}
									activeStatusTab={activeStatusTab}
									onStatusTabChange={onStatusTabChange}
									search={search}
									onSearchChange={onSearchChange}
									minSearchLength={minSearchLength}
									searchResetKey={searchResetKey}
									status={status}
									onStatusChange={onStatusChange}
									statusOptions={statusOptions}
									currentView={currentView}
									searchKey={searchKey}
									statusKey={statusKey}
									trailing={trailing}
								/>
							) : (
								trailing && (
									<div className="ml-auto flex shrink-0 items-center gap-3">
										{trailing}
									</div>
								)
							)}
						</div>
					)}

					{VIEW_CONFIG.map((item) => (
						<CustomOptionTabsContent
							key={item.type}
							value={item.type}
						>
							{item.component}
						</CustomOptionTabsContent>
					))}

					{showPagination && <SmartTablePagination id={id} />}
				</div>
			</CustomOptionTabs>
		</DataGrid>
	);
}

export const SmartTable = memo(SmartTableInner) as typeof SmartTableInner;
