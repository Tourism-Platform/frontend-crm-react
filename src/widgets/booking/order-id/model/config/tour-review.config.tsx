import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE
} from "@/entities/booking";
import { type ITourReviewItem } from "@/entities/booking";
import { ENUM_EVENT, EVENT_METADATA } from "@/entities/tour";

import { ApplyReviewAction } from "@/features/booking";

export const TOUR_REVIEW_COLUMNS = (
	orderStatus?: ENUM_ORDER_STATUS_TYPE
): ColumnDef<ITourReviewItem>[] => {
	const { t } = useTranslation("order_id_page");
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

				return (
					<div
						className="flex items-center gap-2"
						style={{ paddingLeft: `${depth * 2}rem` }}
					>
						{hasSubRows ? (
							<Button
								onClick={getToggleExpandedHandler()}
								variant="ghost"
								size="icon"
							>
								{getIsExpanded() ? (
									<ChevronDown className="size-4 text-muted-foreground" />
								) : (
									<ChevronRight className="size-4 text-muted-foreground" />
								)}
							</Button>
						) : (
							<div className="w-9" />
						)}
						<div
							className={cn(
								"size-8 rounded-full flex items-center justify-center text-white shrink-0",
								metadata?.color_bg
							)}
						>
							{Icon && <Icon className="size-4" />}
						</div>
						<span className="font-medium">
							{getValue() as string}
						</span>
					</div>
				);
			}
		},
		{
			accessorKey: "supplier",
			header: t("tour_review.table.supplier")
		},
		{
			accessorKey: "plannedCost",
			header: t("tour_review.table.planned_cost")
		},
		{
			accessorKey: "estimatedRevenue",
			header: t("tour_review.table.estimated_revenue")
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
							const { id, type, isApplied } = row.original;
							const depth = row.depth;
							const parentRow = row.getParentRow?.();
							const parentType = parentRow?.original?.type;
							const parentId = parentRow?.original?.id;

							// Если это multiply-option — кнопку не показываем в родителе
							if (type === ENUM_EVENT.MULTIPLY_OPTION) {
								return null;
							}

							// Если это subRow — показываем кнопку только если родитель = multiply-option
							if (
								depth > 0 &&
								parentType !== ENUM_EVENT.MULTIPLY_OPTION
							) {
								return null;
							}

							return (
								<ApplyReviewAction
									id={id}
									parentId={parentId}
									isApplied={isApplied}
								/>
							);
						},
						size: 100
					} as ColumnDef<ITourReviewItem>
				]
			: [])
	];
};
