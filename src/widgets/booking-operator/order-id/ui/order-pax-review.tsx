import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	GLASS_SURFACE,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { type IPaxReviewDetail, type IPaxReviewItem } from "@/entities/booking";

import {
	ORDER_SUBTABLE_LAYOUT,
	ORDER_TABLE_LAYOUT,
	PAX_DETAILS_COLUMNS,
	PAX_REVIEW_COLUMNS
} from "../model";

const getRowCanExpandFn = (row: { original: IPaxReviewItem }) =>
	row.original.items.length > 0;

const OrderPaxReviewSubTable = ({ items }: { items: IPaxReviewDetail[] }) => {
	const { t } = useTranslation("order_id_page");
	const columns = useMemo(() => PAX_DETAILS_COLUMNS(t), [t]);
	return (
		<div className="p-2">
			<SmartTable
				TableClassName={cn(GLASS_SURFACE, "rounded-xl")}
				data={items}
				columns={columns}
				showTopFilters={false}
				showPagination={false}
				tableLayout={ORDER_SUBTABLE_LAYOUT}
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
		<Card variant="glass">
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					{t("pax_information.title")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<SmartTable
					TableClassName={cn(GLASS_SURFACE, "rounded-xl")}
					data={items}
					columns={columns}
					getRowCanExpand={getRowCanExpandFn}
					tableLayout={ORDER_TABLE_LAYOUT}
					showTopFilters={false}
				/>
			</CardContent>
		</Card>
	);
};

export const OrderPaxReview = withErrorBoundary(OrderPaxReviewBase);
