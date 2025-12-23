"use client";

import {
	type ColumnDef,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable
} from "@tanstack/react-table";
import { useMemo } from "react";

import {
	DataGrid,
	DataGridContainer,
	DataGridPagination,
	DataGridTable
} from "@/shared/ui";

interface CustomDataGridProps<TData extends object> {
	data: TData[];
	columns: ColumnDef<TData, any>[];
	isLoading?: boolean;
	recordCount?: number;
	rowsPerPageLabel?: string;
	paginationInfo?: string;
	pageSize?: number;
	topChildren?: React.ReactNode;
	actions?: React.ReactNode;
}

export function CustomDataGrid<TData extends object>({
	data,
	columns,
	isLoading = false,
	recordCount,
	rowsPerPageLabel,
	paginationInfo,
	pageSize = 10,
	topChildren,
	actions
}: CustomDataGridProps<TData>) {
	const memoizedData = useMemo(() => data, [data]);
	const memoizedColumns = useMemo(() => columns, [columns]);

	const table = useReactTable({
		data: memoizedData,
		columns: memoizedColumns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize
			}
		}
	});

	return (
		<div className="space-y-4">
			{(topChildren || actions) && (
				<div className="flex items-center justify-between gap-3 px-4 py-2">
					<div className="flex items-center gap-3">{topChildren}</div>
					<div className="flex items-center gap-3">{actions}</div>
				</div>
			)}
			<DataGrid
				table={table}
				recordCount={recordCount ?? data.length}
				isLoading={isLoading}
			>
				<DataGridContainer className="border-none rounded-none">
					<DataGridTable />
				</DataGridContainer>
				<div className="p-4 border-t border-border/50">
					<DataGridPagination
						rowsPerPageLabel={rowsPerPageLabel}
						info={paginationInfo}
					/>
				</div>
			</DataGrid>
		</div>
	);
}
