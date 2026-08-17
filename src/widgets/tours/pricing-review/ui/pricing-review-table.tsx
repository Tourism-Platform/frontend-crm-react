import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Button, Card, CardContent, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { type ITourReviewItem } from "@/entities/tour";

import { PRICING_REVIEW_COLUMNS } from "../model";

interface IPricingReviewTableProps {
	items: ITourReviewItem[];
	tourId: string;
	optionId: string;
}

const TABLE_LAYOUT = {
	rowBorder: true,
	headerBackground: false
};

const getSubRowsFn = (row: ITourReviewItem) => row.subRows;

const PricingReviewTableBase: FC<IPricingReviewTableProps> = ({
	items,
	tourId,
	optionId
}) => {
	const { t } = useTranslation("tour_pricing_review_page");
	const columns = useMemo(
		() => PRICING_REVIEW_COLUMNS(t, { tourId, optionId }),
		[t, tourId, optionId]
	);

	const actionsJsx = useMemo(
		() => (
			<Button variant="default" asChild>
				<Link to={buildRoute(ENUM_PATH.TOURS.ITINERARY, { tourId })}>
					{t("table.buttons.add_item")}
				</Link>
			</Button>
		),
		[t, tourId]
	);

	return (
		<Card>
			<CardContent>
				<SmartTable
					data={items}
					actions={actionsJsx}
					columns={columns}
					getSubRows={getSubRowsFn}
					showPagination={false}
					showTopFilters={false}
					tableLayout={TABLE_LAYOUT}
					defaultExpanded={true}
				/>
			</CardContent>
		</Card>
	);
};

export const PricingReviewTable = withErrorBoundary(PricingReviewTableBase);
