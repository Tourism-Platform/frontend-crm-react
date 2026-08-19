import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

import {
	ENUM_ACCOMMODATION_EDIT_TAB,
	ENUM_ACTIVITY_EDIT_TAB,
	ENUM_EVENT,
	type ENUM_EVENT_TYPE,
	ENUM_FLIGHT_EDIT_TAB,
	ENUM_GUIDE_EDIT_TAB,
	ENUM_SUPPLEMENT_EDIT_TAB,
	ENUM_TRANSPORTATION_EDIT_TAB,
	EVENT_METADATA,
	EVENT_TYPE_TO_OPTION_PATH,
	EVENT_TYPE_TO_PATH,
	type ITourReviewItem
} from "@/entities/tour";

interface IPricingReviewColumnsParams {
	tourId: string;
	optionId: string;
}

const EVENT_PRICING_TAB: Partial<Record<ENUM_EVENT_TYPE, string>> = {
	[ENUM_EVENT.ACTIVITY]: ENUM_ACTIVITY_EDIT_TAB.PRICING,
	[ENUM_EVENT.FLIGHT]: ENUM_FLIGHT_EDIT_TAB.PRICING,
	[ENUM_EVENT.ACCOMMODATION]: ENUM_ACCOMMODATION_EDIT_TAB.PRICING,
	[ENUM_EVENT.TRANSPORTATION]: ENUM_TRANSPORTATION_EDIT_TAB.PRICING,
	[ENUM_EVENT.SUPPLEMENT]: ENUM_SUPPLEMENT_EDIT_TAB.PRICING,
	[ENUM_EVENT.GUIDE]: ENUM_GUIDE_EDIT_TAB.PRICING
};

const matchesItemName = (value: string, query: string) =>
	value.toLowerCase().includes(query);

export const filterReviewItemsByName = (
	items: ITourReviewItem[],
	search: string
): ITourReviewItem[] => {
	const query = search.trim().toLowerCase();
	if (!query) return items;

	return items.flatMap((item) => {
		const selfMatch = matchesItemName(item.item, query);
		if (!item.subRows?.length) {
			return selfMatch ? [item] : [];
		}

		if (selfMatch) return [item];

		const subRows = item.subRows.filter((subRow) =>
			matchesItemName(subRow.item, query)
		);

		return subRows.length ? [{ ...item, subRows }] : [];
	});
};

export const PRICING_REVIEW_COLUMNS = (
	t: TFunction<"tour_pricing_review_page", undefined>,
	{ tourId, optionId }: IPricingReviewColumnsParams
): ColumnDef<ITourReviewItem>[] => {
	return [
		{
			accessorKey: "item",
			header: t("table.item"),
			cell: ({
				row: {
					original: { id, type, subRows },
					depth,
					getIsExpanded,
					getToggleExpandedHandler,
					getParentRow
				},
				getValue
			}) => {
				const hasSubRows = !!subRows?.length;
				const metadata = type ? EVENT_METADATA[type] : null;
				const Icon = metadata?.icon;
				const rawTitle = getValue() as string;
				const title =
					type === ENUM_EVENT.PACKAGE && !rawTitle.trim()
						? t("table.untitled")
						: rawTitle;
				const parent = getParentRow?.();
				const isNestedOption =
					depth > 0 &&
					parent?.original.type === ENUM_EVENT.MULTIPLY_OPTION;
				const eventPath = type
					? isNestedOption
						? EVENT_TYPE_TO_OPTION_PATH[type]
						: EVENT_TYPE_TO_PATH[type]
					: undefined;
				const pricingTab = type ? EVENT_PRICING_TAB[type] : undefined;
				const href =
					type === ENUM_EVENT.PACKAGE && id
						? buildRoute(ENUM_PATH.TOURS.PACKAGE, {
								tourId,
								optionId,
								packageId: id
							})
						: eventPath && id
							? isNestedOption && parent
								? buildRoute(
										eventPath,
										{
											tourId,
											optionId,
											eventId: parent.original.id,
											eventOptionId: id
										},
										pricingTab
											? { tab: pricingTab }
											: undefined
									)
								: buildRoute(
										eventPath,
										{
											tourId,
											optionId,
											eventId: id
										},
										pricingTab
											? { tab: pricingTab }
											: undefined
									)
							: undefined;

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
			size: 200
		},
		{
			accessorKey: "supplier",
			header: t("table.supplier"),
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
			header: t("table.total_cost"),
			size: 100
		},
		{
			accessorKey: "estimatedRevenue",
			header: t("table.estimated_revenue"),
			size: 100
		}
	];
};
