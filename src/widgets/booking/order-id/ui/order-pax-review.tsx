import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	SmartTable,
	withErrorBoundary
} from "@/shared/ui";

import { type IPaxReviewDetail, type IPaxReviewItem } from "@/entities/booking";

import { PAX_DETAILS_COLUMNS, PAX_REVIEW_COLUMNS } from "../model";

const SUBTABLE_LAYOUT = {
	rowBorder: true,
	headerBackground: true,
	showHeader: false
};

const MAIN_TABLE_LAYOUT = {
	rowBorder: true,
	headerBackground: false
};

const getRowCanExpandFn = (row: { original: IPaxReviewItem }) =>
	row.original.items.length > 0;

const OrderPaxReviewSubTable = ({ items }: { items: IPaxReviewDetail[] }) => {
	const { t } = useTranslation("order_id_page");
	const columns = useMemo(() => PAX_DETAILS_COLUMNS(t), [t]);
	return (
		<div className="p-2">
			<SmartTable
				data={items}
				columns={columns}
				showTopFilters={false}
				showPagination={false}
				tableLayout={SUBTABLE_LAYOUT}
			/>
		</div>
	);
};

interface IOrderPaxReviewProps {
	items?: IPaxReviewItem[];
}

const OrderPaxReviewBase = ({ items = [] }: IOrderPaxReviewProps) => {
	const { t } = useTranslation("order_id_page");

	const renderSubTable = useCallback(
		(subItems: IPaxReviewDetail[]) => (
			<OrderPaxReviewSubTable items={subItems} />
		),
		[]
	);

	const columns = useMemo(
		() => PAX_REVIEW_COLUMNS(t, renderSubTable),
		[t, renderSubTable]
	);

	return (
		<Card>
			<CardHeader className="text-lg font-semibold">
				<CardTitle>{t("pax_information.title")}</CardTitle>
			</CardHeader>
			<CardContent>
				<SmartTable
					data={items}
					columns={columns}
					getRowCanExpand={getRowCanExpandFn}
					tableLayout={MAIN_TABLE_LAYOUT}
					showTopFilters={false}
				/>
			</CardContent>
		</Card>
	);
};

export const OrderPaxReview = withErrorBoundary(OrderPaxReviewBase);
