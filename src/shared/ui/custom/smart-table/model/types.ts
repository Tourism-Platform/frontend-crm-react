import { type ColumnDef } from "@tanstack/react-table";
import { type FC, type ReactNode } from "react";

import { type DataGridProps } from "@/shared/ui/shadcn-ui/data-grid";

export type TViewModeType = "table" | "cards";

export interface IViewModeBase {
	useViewMode?: boolean;
	defaultViewMode?: TViewModeType;
}

export interface IViewModeEnabled extends IViewModeBase {
	useViewMode: true;
	card: FC<{ data: unknown }>;
}

export interface IViewModeDisabled extends IViewModeBase {
	useViewMode?: false;
	card?: never;
}

export type TViewMode = IViewModeEnabled | IViewModeDisabled;

export interface ISmartTableFilters {
	showTopFilters?: boolean;
	showSearchFilter?: boolean;
	showStatusFilter?: boolean;
	showVisibilityFilter?: boolean;
}

export interface ISmartTableProps<TData extends object>
	extends Omit<DataGridProps<TData>, "children" | "recordCount"> {
	columns: ColumnDef<TData, unknown>[];
	data: TData[];
	recordCount?: number;
	actions?: ReactNode;
	topChildren?: ReactNode;
	statusTabs?: { label: string; value: string }[];
	activeStatusTab?: string;
	onStatusTabChange?: (value: string) => void;
	showPagination?: boolean;
	getSubRows?: (row: TData) => TData[] | undefined;
	getRowCanExpand?: (row: { original: TData }) => boolean;
	onRowsReorder?: (oldIndex: number, newIndex: number) => void;
}

export type TSmartTableProps<TData extends object> = ISmartTableProps<TData> &
	ISmartTableFilters &
	TViewMode;
