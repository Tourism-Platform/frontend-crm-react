import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	Badge,
	Button,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/shared/ui";

import {
	ENUM_ACCOMMODATION_EDIT_TAB,
	ENUM_ACTIVITY_EDIT_TAB,
	ENUM_BREAKDOWN_LEG,
	ENUM_BREAKDOWN_LINE_KIND,
	ENUM_EVENT,
	type ENUM_EVENT_TYPE,
	ENUM_FLIGHT_EDIT_TAB,
	ENUM_GUIDE_EDIT_TAB,
	ENUM_PRICING_REVIEW_ROW,
	ENUM_SUPPLEMENT_EDIT_TAB,
	ENUM_TRANSPORTATION_EDIT_TAB,
	EVENT_METADATA,
	EVENT_TYPE_TO_OPTION_PATH,
	EVENT_TYPE_TO_PATH,
	type ITourReviewItem,
	getBreakdownRowMetadata,
	isPricingReviewBreakdownRow
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

const filterReviewItemByName = (
	item: ITourReviewItem,
	query: string
): ITourReviewItem[] => {
	const selfMatch = matchesItemName(item.item, query);
	if (!item.subRows?.length) {
		return selfMatch ? [item] : [];
	}

	if (selfMatch) return [item];

	const subRows = item.subRows.flatMap((subRow) =>
		filterReviewItemByName(subRow, query)
	);

	return subRows.length ? [{ ...item, subRows }] : [];
};

export const filterReviewItemsByName = (
	items: ITourReviewItem[],
	search: string
): ITourReviewItem[] => {
	const query = search.trim().toLowerCase();
	if (!query) return items;

	return items.flatMap((item) => filterReviewItemByName(item, query));
};

const resolveReviewItemTitle = (
	item: ITourReviewItem,
	rawTitle: string,
	t: TFunction<"tour_pricing_review_page", undefined>
): string => {
	if (item.rowKind === ENUM_PRICING_REVIEW_ROW.BREAKDOWN_GROUP) {
		return item.breakdownLeg === ENUM_BREAKDOWN_LEG.MAX
			? t("table.breakdown.max")
			: t("table.breakdown.min");
	}

	if (item.type === ENUM_EVENT.PACKAGE && !rawTitle.trim()) {
		return t("table.untitled");
	}

	return rawTitle;
};

const PricingWarningsCell = ({
	item,
	t
}: {
	item: ITourReviewItem;
	t: TFunction<"tour_pricing_review_page", undefined>;
}) => {
	if (isPricingReviewBreakdownRow(item) || !item.warnings?.length) {
		return null;
	}

	return (
		<div className="flex flex-wrap gap-1">
			{item.warnings.map((warning) => (
				<Tooltip key={warning}>
					<TooltipTrigger asChild>
						<Badge variant="yellow" size="sm">
							{t(`table.warnings.${warning}`)}
						</Badge>
					</TooltipTrigger>
					<TooltipContent>
						{t(`table.warnings_hints.${warning}`)}
					</TooltipContent>
				</Tooltip>
			))}
		</div>
	);
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
					original,
					depth,
					getIsExpanded,
					getToggleExpandedHandler,
					getParentRow
				},
				getValue
			}) => {
				const { id, type, subRows } = original;
				const isBreakdown = isPricingReviewBreakdownRow(original);
				const hasSubRows = !!subRows?.length;
				const metadata =
					getBreakdownRowMetadata(original) ??
					(type ? EVENT_METADATA[type] : null);
				const Icon = metadata?.icon;
				const rawTitle = getValue() as string;
				const title = resolveReviewItemTitle(original, rawTitle, t);
				const parent = getParentRow?.();
				const isNestedOption =
					depth > 0 &&
					parent?.original.type === ENUM_EVENT.MULTIPLY_OPTION &&
					!isPricingReviewBreakdownRow(parent.original);
				const eventPath = type
					? isNestedOption
						? EVENT_TYPE_TO_OPTION_PATH[type]
						: EVENT_TYPE_TO_PATH[type]
					: undefined;
				const pricingTab = type ? EVENT_PRICING_TAB[type] : undefined;
				const href =
					isBreakdown || !id
						? undefined
						: type === ENUM_EVENT.PACKAGE
							? buildRoute(ENUM_PATH.TOURS.PACKAGE, {
									tourId,
									optionId,
									packageId: id
								})
							: eventPath
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
								metadata?.color_bg || "bg-muted"
							)}
						>
							{Icon ? <Icon className="size-4" /> : null}
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
					original: { supplier, rowKind }
				}
			}) => {
				const label =
					rowKind === ENUM_PRICING_REVIEW_ROW.BREAKDOWN_LINE &&
					(supplier === ENUM_BREAKDOWN_LINE_KIND.UNIT ||
						supplier === ENUM_BREAKDOWN_LINE_KIND.EXTRA_COST ||
						supplier === ENUM_BREAKDOWN_LINE_KIND.SURCHARGE)
						? t(`table.kind.${supplier}`)
						: supplier;

				return (
					<div className="min-w-0 w-full">
						<span title={label} className="block truncate">
							{label}
						</span>
					</div>
				);
			},
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
		},
		{
			id: "warnings",
			header: t("table.warnings_column"),
			cell: ({ row }) => (
				<PricingWarningsCell item={row.original} t={t} />
			),
			size: 160
		}
	];
};
