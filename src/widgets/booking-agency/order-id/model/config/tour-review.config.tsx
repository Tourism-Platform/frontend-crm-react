import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

import { type IOrderTourReviewItem } from "@/entities/booking";
import { EVENT_METADATA } from "@/entities/tour";

export const TOUR_REVIEW_COLUMNS = (
	t: TFunction<"order_id_page", undefined>
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
		}
	];
};
