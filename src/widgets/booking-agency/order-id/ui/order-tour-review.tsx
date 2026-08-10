import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { type IOrderTourReviewItem } from "@/entities/booking";

import { TOUR_REVIEW_COLUMNS } from "../model";

interface IOrderTourReviewProps {
	items: IOrderTourReviewItem[];
}

const TABLE_LAYOUT = {
	rowBorder: true,
	headerBackground: false
};

const getSubRowsFn = (row: IOrderTourReviewItem) => row.subRows;

const OrderTourReviewBase = ({ items }: IOrderTourReviewProps) => {
	const { t } = useTranslation("order_id_page");

	const columns = useMemo(() => TOUR_REVIEW_COLUMNS(t), [t]);

	return (
		<Card>
			<CardHeader className="gap-4">
				<CardTitle className="text-lg font-semibold">
					{t("tour_review.title")}
				</CardTitle>
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
