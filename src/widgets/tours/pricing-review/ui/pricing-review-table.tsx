import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	Button,
	Card,
	CardContent,
	SmartTable,
	withErrorBoundary
} from "@/shared/ui";

import { type ITourReviewItem } from "@/entities/tour";

import { PRICING_REVIEW_COLUMNS } from "../model";

interface IPricingReviewTableProps {
	items: ITourReviewItem[];
}

const TABLE_LAYOUT = {
	rowBorder: true,
	headerBackground: false
};

const getSubRowsFn = (row: ITourReviewItem) => row.subRows;

const PricingReviewTableBase: FC<IPricingReviewTableProps> = ({ items }) => {
	const { t } = useTranslation("tour_pricing_review_page");
	const columns = useMemo(() => PRICING_REVIEW_COLUMNS(t), [t]);

	const actionsJsx = useMemo(
		() => <Button variant="default">{t("table.buttons.add_item")}</Button>,
		[t]
	);

	return (
		<Card>
			<CardContent>
				<SmartTable
					data={items}
					actions={actionsJsx}
					columns={columns}
					getSubRows={getSubRowsFn}
					showPagination={true}
					showStatusFilter={false}
					tableLayout={TABLE_LAYOUT}
				/>
			</CardContent>
		</Card>
	);
};

export const PricingReviewTable = withErrorBoundary(PricingReviewTableBase);
