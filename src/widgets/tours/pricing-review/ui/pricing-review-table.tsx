import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, CardContent, SmartTable } from "@/shared/ui";

import { type ITourReviewItem } from "@/entities/tour";

import { PRICING_REVIEW_COLUMNS } from "../model";

interface IPricingReviewTableProps {
	items: ITourReviewItem[];
}

export const PricingReviewTable: FC<IPricingReviewTableProps> = ({ items }) => {
	const { t } = useTranslation("tour_pricing_review_page");

	return (
		<Card>
			<CardContent>
				<SmartTable
					data={items}
					actions={
						<Button variant="default">
							{t("table.buttons.add_item")}
						</Button>
					}
					columns={PRICING_REVIEW_COLUMNS()}
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
