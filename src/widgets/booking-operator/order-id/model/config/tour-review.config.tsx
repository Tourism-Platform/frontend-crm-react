import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	type IOrderTourReviewItem
} from "@/entities/booking";
import { ENUM_EVENT, EVENT_METADATA } from "@/entities/tour";

import { ApplyReviewAction } from "@/features/booking";

export const TOUR_REVIEW_COLUMNS = (
	t: TFunction<"order_id_page", undefined>,
	orderStatus: ENUM_ORDER_STATUS_TYPE,
	bookingId: string
): ColumnDef<IOrderTourReviewItem>[] => {
	return [
		{
			accessorKey: "item",
			header: t("tour_review.table.item"),
			cell: ({
				row: {
					original: { type, subRows },
					depth,
					getIsExpanded,
					getToggleExpandedHandler
				},
				getValue
			}) => {
				const hasSubRows = !!subRows?.length;
				const metadata = type ? EVENT_METADATA[type] : null;
				const Icon = metadata?.icon;
				const title = getValue() as string;

				return (
					<div
						className="flex w-full min-w-0 items-center gap-2"
						style={{ paddingLeft: `${depth * 2}rem` }}
					>
						{hasSubRows ? (
							<Button
								onClick={getToggleExpandedHandler()}
								variant="ghost"
								size="icon"
								className="shrink-0"
							>
								{getIsExpanded() ? (
									<ChevronDown className="size-4 text-muted-foreground" />
								) : (
									<ChevronRight className="size-4 text-muted-foreground" />
								)}
							</Button>
						) : (
							<div className="w-9 shrink-0" />
						)}
						<div
							className={cn(
								"size-8 rounded-full flex items-center justify-center text-white shrink-0",
								metadata?.color_bg || "bg-slate-200"
							)}
						>
							{Icon && <Icon className="size-4" />}
						</div>
						<span
							title={title}
							className="min-w-0 truncate font-medium"
						>
							{title}
						</span>
					</div>
				);
			},
			size: 200
		},
		{
			accessorKey: "supplier",
			header: t("tour_review.table.supplier"),
			cell: ({
				row: {
					original: { supplier }
				}
			}) => (
				<div className="min-w-0 w-full">
					<span title={supplier} className="block truncate">
						{supplier}
					</span>
				</div>
			),
			size: 200
		},
		{
			accessorKey: "plannedCost",
			header: t("tour_review.table.planned_cost"),
			size: 100
		},
		{
			accessorKey: "estimatedRevenue",
			header: t("tour_review.table.estimated_revenue"),
			size: 100
		},
		...(orderStatus === ENUM_ORDER_STATUS.IN_PROCESSING
			? [
					{
						id: "action",
						header: () => (
							<span className="sr-only">
								{t("tour_review.table.action")}
							</span>
						),
						cell: ({ row }) => {
							const { type, eventId, optionIndex, availability } =
								row.original;
							const depth = row.depth;
							const parentRow = row.getParentRow?.();
							const parentType = parentRow?.original?.type;

							if (type === ENUM_EVENT.MULTIPLY_OPTION) {
								return null;
							}

							if (
								depth > 0 &&
								parentType !== ENUM_EVENT.MULTIPLY_OPTION
							) {
								return null;
							}

							return (
								<ApplyReviewAction
									bookingId={bookingId}
									eventId={eventId}
									optionIndex={optionIndex}
									availabilityStatus={availability?.status}
								/>
							);
						},
						size: 100
					} as ColumnDef<IOrderTourReviewItem>
				]
			: [])
	];
};
