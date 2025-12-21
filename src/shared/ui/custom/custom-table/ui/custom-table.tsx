import {
	type ColumnDef,
	type ColumnFiltersState,
	type PaginationState,
	type SortingState,
	type VisibilityState,
	getCoreRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from "@tanstack/react-table";
import {
	CircleAlertIcon,
	LayoutGridIcon,
	StretchHorizontalIcon,
	TrashIcon
} from "lucide-react";
import React, {
	type FC,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState
} from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger
} from "@/shared/ui";

import { COLUMNS } from "../model";

import { Filters, type IShowFilters } from "./filters";
import { PaginationFilter } from "./pagination-filter";
import { TableData } from "./table-data";

type TViewModeType = "table" | "cards";

interface IViewModeBase {
	useViewMode?: boolean;
	defaultViewMode?: TViewModeType;
}

// Если useViewMode = true, карточка обязательна
interface IViewModeEnabled extends IViewModeBase {
	useViewMode: true;
	card: FC<any>;
}

// Если useViewMode = false/undefined, карточка не нужна
interface IViewModeDisabled extends IViewModeBase {
	useViewMode?: false;
	card?: never;
}

type TViewMode = IViewModeEnabled | IViewModeDisabled;

export interface IShowFiltersBase {
	showTopFilters?: boolean;
}

export interface IShowFiltersEnabled extends IShowFilters {
	showTopFilters: true;
}

export interface IShowFiltersDisabled extends IShowFiltersBase {
	showTopFilters?: false;
	showSearchFilter?: never;
	showStatusFilter?: never;
	showVisibilityFilter?: never;
}

type TShowFilters = IShowFiltersEnabled | IShowFiltersDisabled;

type TCustomTableProps = TShowFilters & {
	columns?: ColumnDef<any>[];
	data?: any[];
	actions?: React.ReactNode;
	topChildren?: React.ReactNode;
	statusTabs?: { label: string; value: string }[];
	activeStatusTab?: string;
	onStatusTabChange?: (value: string) => void;
	showPagination?: boolean;
} & TViewMode;

export const CustomTable: FC<TCustomTableProps> = ({
	columns = COLUMNS,
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
	onStatusTabChange
}) => {
	const id = useId();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	});
	const inputRef = useRef<HTMLInputElement>(null);

	const [sorting, setSorting] = useState<SortingState>([
		{
			id: "name",
			desc: false
		}
	]);

	const [tableData, setTableData] = useState<any[]>(data || []);

	useEffect(() => {
		setTableData(data || []);
	}, [data]);

	const handleDeleteRows = () => {
		const selectedRows = table.getSelectedRowModel().rows;
		const updatedData = tableData.filter(
			(item) => !selectedRows.some((row) => row.original.id === item.id)
		);
		setTableData(updatedData);
		table.resetRowSelection();
	};

	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		enableSortingRemoval: false,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		state: {
			sorting,
			pagination,
			columnFilters,
			columnVisibility
		}
	});

	// Get unique status values
	const uniqueStatusValues = useMemo(() => {
		const statusColumn = table.getColumn("status");

		if (!statusColumn) return [];

		const values = Array.from(statusColumn.getFacetedUniqueValues().keys());

		return values.sort();
	}, [table.getColumn("status")?.getFacetedUniqueValues()]);

	const selectedStatuses = useMemo(() => {
		const filterValue = table
			.getColumn("status")
			?.getFilterValue() as string[];
		return filterValue ?? [];
	}, [table.getColumn("status")?.getFilterValue()]);

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

	const VIEW_CONFIG = [
		...(useViewMode && Card
			? [
					{
						type: "cards" as const,
						component: (
							<div className="grid grid-cols-4 gap-5">
								{tableData.map((item, index) => (
									<Card key={item.id || index} data={item} />
								))}
							</div>
						),
						icon: <LayoutGridIcon className="w-3 h-3" />
					}
				]
			: []),
		{
			type: "table",
			component: <TableData table={table} columns={columns} />,
			icon: <StretchHorizontalIcon className="w-3 h-3" />
		}
	];

	// Определяем текущий режим отображения
	const [currentView, setCurrentView] =
		React.useState<TViewModeType>(defaultViewMode);

	// Условная логика для режима карточек

	return (
		<CustomOptionTabs
			defaultValue={defaultViewMode}
			onValueChange={(value) => setCurrentView(value as TViewModeType)}
		>
			<div className="space-y-4">
				{/* Filters */}
				<div className="grid grid-cols-[1fr_auto] items-center gap-3">
					{topChildren}
					{showTopFilters && (
						<Filters
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
							currentView={currentView}
						/>
					)}
					<div className="flex items-center gap-3">
						{/* Delete button */}
						{table.getSelectedRowModel().rows.length > 0 && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										className="ml-auto"
										variant="outline"
									>
										<TrashIcon
											className="-ms-1 opacity-60"
											size={16}
											aria-hidden="true"
										/>
										Delete
										<span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
											{
												table.getSelectedRowModel().rows
													.length
											}
										</span>
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
										<div
											className="flex size-9 shrink-0 items-center justify-center rounded-full border"
											aria-hidden="true"
										>
											<CircleAlertIcon
												className="opacity-80"
												size={16}
											/>
										</div>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you absolutely sure?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone.
												This will permanently delete{" "}
												{
													table.getSelectedRowModel()
														.rows.length
												}{" "}
												selected{" "}
												{table.getSelectedRowModel()
													.rows.length === 1
													? "row"
													: "rows"}
												.
											</AlertDialogDescription>
										</AlertDialogHeader>
									</div>
									<AlertDialogFooter>
										<AlertDialogCancel>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={handleDeleteRows}
										>
											Delete
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}

						{actions}

						{useViewMode && (
							<CustomOptionTabsList className="grid-cols-2 gap-2">
								{VIEW_CONFIG.map((item) => (
									<CustomOptionTabsTrigger
										key={item.type}
										value={item.type}
										asChild
									>
										<Button variant="outline" size={"icon"}>
											{item.icon}
										</Button>
									</CustomOptionTabsTrigger>
								))}
							</CustomOptionTabsList>
						)}
					</div>
				</div>

				{VIEW_CONFIG.map((item) => (
					<CustomOptionTabsContent key={item.type} value={item.type}>
						{item.component}
					</CustomOptionTabsContent>
				))}

				{/* Pagination */}
				{showPagination && <PaginationFilter id={id} table={table} />}
			</div>
		</CustomOptionTabs>
	);
};
