import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	SmartTable
} from "@/shared/ui";

import { type IPaxReviewDetail, type IPaxReviewItem } from "@/entities/booking";

import { PAX_DETAILS_COLUMNS, PAX_REVIEW_COLUMNS } from "../model";

const OrderPaxReviewSubTable = ({ items }: { items: IPaxReviewDetail[] }) => {
	return (
		<div className="p-2">
			<SmartTable
				data={items}
				columns={PAX_DETAILS_COLUMNS()}
				showTopFilters={false}
				showPagination={false}
				tableLayout={{
					rowBorder: true,
					headerBackground: true,
					showHeader: false
				}}
			/>
		</div>
	);
};

interface IOrderPaxReviewProps {
	items?: IPaxReviewItem[];
}

export const OrderPaxReview = ({ items = [] }: IOrderPaxReviewProps) => {
	const { t } = useTranslation("order_id_page");

	return (
		<Card>
			<CardHeader className="text-lg font-semibold">
				<CardTitle>{t("pax_information.title")}</CardTitle>
			</CardHeader>
			<CardContent>
				<SmartTable
					data={items}
					columns={PAX_REVIEW_COLUMNS((subItems) => (
						<OrderPaxReviewSubTable items={subItems} />
					))}
					getRowCanExpand={(row: { original: IPaxReviewItem }) =>
						row.original.items.length > 0
					}
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
