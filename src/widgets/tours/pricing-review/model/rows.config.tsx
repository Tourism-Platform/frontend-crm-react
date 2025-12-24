import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

import { EVENT_METADATA, type ITourReviewItem } from "@/entities/tour";

export const PRICING_REVIEW_COLUMNS = (): ColumnDef<ITourReviewItem>[] => {
	const { t } = useTranslation("tour_pricing_review_page");

	return [
		{
			accessorKey: "item",
			header: t("table.item"),
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
								metadata?.color_bg || "bg-slate-200"
							)}
						>
							{Icon && <Icon className="size-4" />}
						</div>
						<span className="font-medium whitespace-nowrap">
							{getValue() as string}
						</span>
					</div>
				);
			}
		},
		{
			accessorKey: "supplier",
			header: t("table.supplier")
		},
		{
			accessorKey: "plannedCost",
			header: t("table.total_cost")
		},
		{
			accessorKey: "estimatedRevenue",
			header: t("table.estimated_revenue")
		}
	];
};
