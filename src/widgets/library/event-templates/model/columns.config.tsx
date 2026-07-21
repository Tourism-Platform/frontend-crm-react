import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";

import { Skeleton } from "@/shared/ui";

import {
	type ENUM_EVENT_TYPE,
	EVENT_LIBRARY_TYPE_LABELS,
	type IEventLibraryItem
} from "@/entities/tour";

import { EventTemplatesActions } from "../ui/event-templates-actions";

export const COLUMNS = (
	t: TFunction<"event_templates_page", undefined>
): ColumnDef<IEventLibraryItem>[] => {
	return [
		{
			id: "select",
			size: 28,
			enableSorting: false,
			enableHiding: false
		},
		{
			header: t("table.name"),
			meta: {
				headerTitle: t("table.name"),
				skeleton: <Skeleton className="h-4 w-[160px]" />
			},
			accessorKey: "name",
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue("name")}</div>
			),
			size: 220
		},
		{
			header: t("table.type"),
			meta: {
				headerTitle: t("table.type"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "eventType",
			cell: ({ row }) => {
				const eventType = row.getValue("eventType") as ENUM_EVENT_TYPE;
				const labelKey = EVENT_LIBRARY_TYPE_LABELS[eventType];
				return (
					<div className="font-medium">
						{labelKey ? t(labelKey, { ns: "options" }) : eventType}
					</div>
				);
			},
			size: 160
		},
		{
			header: t("table.supplier"),
			meta: {
				headerTitle: t("table.supplier"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "supplierId",
			cell: ({ row }) => (
				<div className="font-medium">
					{(row.getValue("supplierId") as string | null) ||
						t("table.empty_supplier")}
				</div>
			),
			size: 180
		},
		{
			id: "actions",
			header: () => <span className="sr-only">Actions</span>,
			cell: ({ row }) => <EventTemplatesActions item={row.original} />,
			meta: {
				skeleton: <div className="size-9 rounded-md" />
			},
			size: 60,
			enableHiding: false
		}
	];
};
