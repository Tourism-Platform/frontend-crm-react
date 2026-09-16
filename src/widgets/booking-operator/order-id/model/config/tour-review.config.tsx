import { type ColumnDef } from "@tanstack/react-table";
import type { TFunction } from "i18next";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib";
import {
	Badge,
	Button,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from "@/shared/ui";

import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	type IOrderTourReviewItem
} from "@/entities/booking";
import {
	ENUM_BREAKDOWN_LEG,
	ENUM_BREAKDOWN_LINE_KIND,
	ENUM_EVENT,
	ENUM_PRICING_REVIEW_ROW,
	EVENT_METADATA,
	getBreakdownRowMetadata,
	isPricingReviewBreakdownRow
} from "@/entities/tour";

import { ApplyReviewAction } from "@/features/booking";
import { RevisionEventPoolControls } from "@/features/booking/revision-event-pool";

const resolveOrderReviewTitle = (
	item: IOrderTourReviewItem,
	rawTitle: string,
	t: TFunction<"order_id_page", undefined>
): string => {
	if (item.rowKind === ENUM_PRICING_REVIEW_ROW.BREAKDOWN_GROUP) {
		return item.breakdownLeg === ENUM_BREAKDOWN_LEG.MAX
			? t("tour_review.table.breakdown.max")
			: t("tour_review.table.breakdown.min");
	}

	return rawTitle;
};

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
					original,
					depth,
					getIsExpanded,
					getToggleExpandedHandler
				},
				getValue
			}) => {
				const hasSubRows = !!original.subRows?.length;
				const metadata =
					getBreakdownRowMetadata(original) ??
					(original.type ? EVENT_METADATA[original.type] : null);
				const Icon = metadata?.icon;
				const title = resolveOrderReviewTitle(
					original,
					getValue() as string,
					t
				);

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
					original: {
						supplier,
						rowKind,
						pool,
						eventId,
						optionIndex,
						backendTyp,
						type
					}
				}
			}) => {
				const label =
					rowKind === ENUM_PRICING_REVIEW_ROW.BREAKDOWN_LINE &&
					(supplier === ENUM_BREAKDOWN_LINE_KIND.UNIT ||
						supplier === ENUM_BREAKDOWN_LINE_KIND.EXTRA_COST ||
						supplier === ENUM_BREAKDOWN_LINE_KIND.SURCHARGE)
						? t(`tour_review.table.kind.${supplier}`)
						: supplier;

				const showPool =
					orderStatus === ENUM_ORDER_STATUS.IN_PROCESSING &&
					!isPricingReviewBreakdownRow({ rowKind }) &&
					type !== ENUM_EVENT.MULTIPLY_OPTION &&
					Boolean(eventId) &&
					Boolean(backendTyp);

				return (
					<div className="min-w-0 w-full grid gap-2">
						<span title={label} className="block truncate">
							{label}
						</span>
						{showPool && backendTyp && eventId ? (
							<RevisionEventPoolControls
								bookingId={bookingId}
								eventId={eventId}
								optionIndex={optionIndex}
								eventTyp={backendTyp}
								pool={pool}
							/>
						) : null}
					</div>
				);
			},
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
		{
			id: "warnings",
			header: t("tour_review.table.warnings_column"),
			cell: ({ row }) => {
				const { warnings } = row.original;
				if (
					isPricingReviewBreakdownRow(row.original) ||
					!warnings?.length
				) {
					return null;
				}

				return (
					<div className="flex flex-wrap gap-1">
						{warnings.map((warning) => (
							<Tooltip key={warning}>
								<TooltipTrigger asChild>
									<Badge variant="yellow" size="sm">
										{t(
											`tour_review.table.warnings.${warning}`
										)}
									</Badge>
								</TooltipTrigger>
								<TooltipContent>
									{t(
										`tour_review.table.warnings_hints.${warning}`
									)}
								</TooltipContent>
							</Tooltip>
						))}
					</div>
				);
			},
			size: 160
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

							if (isPricingReviewBreakdownRow(row.original)) {
								return null;
							}

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
