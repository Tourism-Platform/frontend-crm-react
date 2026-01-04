import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator,
	SmartTable
} from "@/shared/ui";

import {
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	type ITourReviewItem,
	type ITourSummary
} from "@/entities/booking";

import { type IInfoItem, TOUR_REVIEW_COLUMNS, getTourSummary } from "../model";

interface IOrderTourReviewProps {
	items: ITourReviewItem[];
	summary: ITourSummary;
	orderStatus: ENUM_ORDER_STATUS_TYPE;
}

const TourSummaryColumn = ({ label, value, className }: IInfoItem) => {
	return (
		<div className="flex flex-col">
			<span className={cn("text-sm text-muted-foreground", className)}>
				{label}
			</span>
			<span className="text-lg text-foreground">{value}</span>
		</div>
	);
};

export const OrderTourReview = ({
	items,
	summary,
	orderStatus
}: IOrderTourReviewProps) => {
	const { t } = useTranslation("order_id_page");
	const summaryItems = getTourSummary(summary, orderStatus, t);

	return (
		<Card>
			<CardHeader className="gap-4">
				<CardTitle className="text-lg font-semibold">
					{t("tour_review.title")}
				</CardTitle>
				<div
					className={cn("grid items-center gap-8 w-fit", {
						"grid-cols-[auto_1px_auto]":
							orderStatus === ENUM_ORDER_STATUS.NEW,
						"grid-cols-[auto_1px_auto_1px_auto_1px_auto]":
							orderStatus !== ENUM_ORDER_STATUS.NEW
					})}
				>
					{summaryItems.map((item, index) => (
						<Fragment key={item.label}>
							<TourSummaryColumn {...item} />
							{index < summaryItems.length - 1 && (
								<Separator
									orientation="vertical"
									className="h-10"
								/>
							)}
						</Fragment>
					))}
				</div>
			</CardHeader>
			<CardContent>
				<SmartTable
					data={items}
					columns={TOUR_REVIEW_COLUMNS(orderStatus)}
					getSubRows={(row) => row.subRows}
					tableLayout={{
						rowBorder: true,
						headerBackground: false
					}}
					showTopFilters={false}
				/>
			</CardContent>
		</Card>
	);
};
