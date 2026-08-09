import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { Link } from "react-router-dom";

import { buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";

import {
	type ENUM_EVENT_TYPE,
	EVENT_LIBRARY_TYPE_LABELS,
	EVENT_METADATA,
	type IEventLibraryItem,
	mapEventTypeToLibraryEditPath
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
				skeleton: <Skeleton className="h-8 w-[200px]" />
			},
			accessorKey: "name",
			cell: ({ row }) => {
				const { id, name, eventType } = row.original;
				const metadata = EVENT_METADATA[eventType];
				const Icon = metadata?.icon;
				const title = name.trim() || t("table.untitled");
				const editPath = mapEventTypeToLibraryEditPath(eventType);
				const href = editPath
					? buildRoute(editPath, { libraryId: id })
					: undefined;

				return (
					<div className="flex w-full min-w-0 items-center gap-2">
						<div
							className={cn(
								"size-8 rounded-full flex items-center justify-center text-white shrink-0",
								metadata?.color_bg || "bg-slate-200"
							)}
						>
							{Icon && <Icon className="size-4" />}
						</div>
						{href ? (
							<Link
								to={href}
								title={title}
								className="min-w-0 truncate font-medium hover:underline"
							>
								{title}
							</Link>
						) : (
							<span
								title={title}
								className="min-w-0 truncate font-medium"
							>
								{title}
							</span>
						)}
					</div>
				);
			},
			size: 260
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
			header: t("table.summary"),
			meta: {
				headerTitle: t("table.summary"),
				skeleton: <Skeleton className="h-4 w-[120px]" />
			},
			accessorKey: "summary",
			cell: ({ row }) => {
				const summary = row.getValue("summary") as string | null;
				return (
					<div className="min-w-0 w-full">
						<span
							title={summary ?? undefined}
							className="block truncate"
						>
							{summary || t("table.empty_summary")}
						</span>
					</div>
				);
			},
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
