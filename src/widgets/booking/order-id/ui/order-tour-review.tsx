import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator,
	SmartTable
} from "@/shared/ui";
import { formatToDollars } from "@/shared/utils";

import { type ENUM_ORDER_STATUS_TYPE } from "@/entities/booking";
import { type ITourReviewItem, type ITourSummary } from "@/entities/tour";

import { TOUR_REVIEW_COLUMNS } from "../model";

interface IOrderTourReviewProps {
	items: ITourReviewItem[];
	summary: ITourSummary;
	orderStatus?: ENUM_ORDER_STATUS_TYPE;
}

export const OrderTourReview = ({
	items,
	summary,
	orderStatus
}: IOrderTourReviewProps) => {
	const { t } = useTranslation("order_id_page");

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					{t("tour_review.title")}
				</CardTitle>
				<div className="grid grid-cols-[auto_1px_auto] items-center gap-8 w-fit">
					<div className="flex flex-col gap-1">
						<div className="text-xs text-muted-foreground uppercase">
							{t("tour_review.revenue")}
						</div>
						<div className="text-lg text-foreground">
							{formatToDollars(summary.revenue.from)} -{" "}
							{formatToDollars(summary.revenue.to)}
						</div>
					</div>

					<Separator orientation="vertical" className="h-10" />

					<div className="flex flex-col gap-1">
						<div className="text-xs text-muted-foreground uppercase">
							{t("tour_review.profit")}
						</div>
						<div className="text-lg text-foreground">
							{formatToDollars(summary.profit.from)} -{" "}
							{formatToDollars(summary.profit.to)}
						</div>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<SmartTable
					data={items}
					columns={TOUR_REVIEW_COLUMNS(orderStatus)}
					getSubRows={(row) => row.subRows}
					showPagination={true}
					showStatusFilter={false}
					tableLayout={{
						rowBorder: true,
						headerBackground: false
					}}
				/>
			</CardContent>
		</Card>
	);
};
