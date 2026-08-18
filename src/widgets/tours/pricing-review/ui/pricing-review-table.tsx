import { type PaginationState } from "@tanstack/react-table";
import { type FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { Button, Card, CardContent, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { type ITourReviewItem, TOUR_PACKAGE_CREATE_ID } from "@/entities/tour";

import { PRICING_REVIEW_COLUMNS, filterReviewItemsByName } from "../model";

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
	const [search, setSearch] = useState("");
	const columns = useMemo(
		() => PRICING_REVIEW_COLUMNS(t, { tourId, optionId }),
		[t, tourId, optionId]
	);
	const filteredItems = useMemo(
		() => filterReviewItemsByName(items, search),
		[items, search]
	);
	const pagination = useMemo<PaginationState>(
		() => ({
			pageIndex: 0,
			pageSize: Math.max(items.length, 1)
		}),
		[items.length]
	);

	useEffect(() => {
		setSearch("");
	}, [optionId]);

	const actionsJsx = useMemo(
		() => (
			<div className="flex gap-2">
				<Button variant="default" asChild>
					<Link
						to={buildRoute(ENUM_PATH.TOURS.ITINERARY, { tourId })}
					>
						{t("table.buttons.add_item")}
					</Link>
				</Button>
				<Button variant="default" asChild>
					<Link
						to={buildRoute(ENUM_PATH.TOURS.PACKAGE, {
							tourId,
							optionId,
							packageId: TOUR_PACKAGE_CREATE_ID
						})}
					>
						{t("table.buttons.create_package")}
					</Link>
				</Button>
			</div>
		),
		[t, tourId, optionId]
	);

	return (
		<Card>
			<CardContent>
				<SmartTable
					data={filteredItems}
					columns={columns}
					getSubRows={getSubRowsFn}
					actions={actionsJsx}
					tableLayout={TABLE_LAYOUT}
					showPagination={false}
					pagination={pagination}
					showStatusFilter={false}
					showVisibilityFilter={false}
					search={search}
					onSearchChange={setSearch}
					minSearchLength={1}
					defaultExpanded={true}
				/>
			</CardContent>
		</Card>
	);
};

export const PricingReviewTable = withErrorBoundary(PricingReviewTableBase);
