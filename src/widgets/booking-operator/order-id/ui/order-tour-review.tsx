import { type FC, Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import {
	type ENUM_ORDER_STATUS_TYPE,
	type IOrderTourReviewItem
} from "@/entities/booking";
import { type IBookingFinancials } from "@/entities/finance";

import {
	type IFinancialsStatColumn,
	TOUR_REVIEW_COLUMNS,
	getFinancialsStats
} from "../model";

interface IOrderTourReviewProps {
	bookingId: string;
	items: IOrderTourReviewItem[];
	financials?: IBookingFinancials;
	orderStatus: ENUM_ORDER_STATUS_TYPE;
}

const TABLE_LAYOUT = {
	rowBorder: true,
	headerBackground: false
};

const getSubRowsFn = (row: IOrderTourReviewItem) => row.subRows;

const TourSummaryColumn: FC<IFinancialsStatColumn> = ({
	label,
	planned,
	actual
}) => {
	const { t } = useTranslation("order_id_page");

	return (
		<div className="flex min-w-[140px] flex-col gap-1">
			<span className="text-sm text-muted-foreground">{label}</span>
			<span className="text-lg font-medium tabular-nums text-foreground">
				{planned}
			</span>
			<span className="text-sm tabular-nums text-muted-foreground">
				{t("stats.actual")}:{" "}
				<span className="text-base font-medium text-foreground">
					{actual}
				</span>
			</span>
		</div>
	);
};

const OrderTourReviewBase = ({
	bookingId,
	items,
	financials,
	orderStatus
}: IOrderTourReviewProps) => {
	const { t } = useTranslation("order_id_page");

	const summary = useMemo(
		() => (financials ? getFinancialsStats(financials, t) : null),
		[financials, t]
	);

	const columns = useMemo(
		() => TOUR_REVIEW_COLUMNS(t, orderStatus, bookingId),
		[t, orderStatus, bookingId]
	);

	return (
		<Card>
			<CardHeader className="gap-4">
				<CardTitle className="text-lg font-semibold">
					{t("tour_review.title")}
				</CardTitle>

				{summary && (
					<div className="grid w-fit grid-cols-[auto_1px_auto_1px_auto] items-center gap-8">
						{summary.map((item, index) => (
							<Fragment key={item.label}>
								<TourSummaryColumn {...item} />
								{index < summary.length - 1 && (
									<Separator
										orientation="vertical"
										className="h-14"
									/>
								)}
							</Fragment>
						))}
					</div>
				)}
			</CardHeader>
			<CardContent>
				<SmartTable
					data={items}
					columns={columns}
					getSubRows={getSubRowsFn}
					tableLayout={TABLE_LAYOUT}
					showTopFilters={false}
					defaultExpanded={true}
				/>
			</CardContent>
		</Card>
	);
};

export const OrderTourReview = withErrorBoundary(OrderTourReviewBase);
