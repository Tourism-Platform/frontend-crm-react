import { type FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import { type ITourOrderFilters, useGetTourOrdersQuery } from "@/entities/tour";

import { RECENT_ORDERS_COLUMNS } from "../model";

const LastOrdersBase: FC = () => {
	const { t } = useTranslation("tour_overview_page");
	const { t: tCols } = useTranslation(["tour_order_history_page", "options"]);
	const { tourId = "" } = useParams<{ tourId: string }>();

	const { watch } = useForm<ITourOrderFilters>({
		defaultValues: {
			tourId,
			status: [],
			search: "",
			page: 1,
			limit: 5
		}
	});

	const filters = watch();

	const {
		data,
		isLoading,
		isError: isLandingError
	} = useGetTourOrdersQuery(filters);

	useEffect(() => {
		if (isLandingError) {
			toast.error(t("recent_orders.toasts.load.error"));
		}
	}, [isLandingError, t]);

	const orders = useMemo(() => data?.data ?? [], [data]);
	const columns = useMemo(() => RECENT_ORDERS_COLUMNS(tCols), [tCols]);

	const paginationObj = useMemo(
		() => ({
			pageIndex: filters.page - 1,
			pageSize: filters.limit
		}),
		[filters.page, filters.limit]
	);
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl font-normal">
					{t("recent_orders.title")}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<SmartTable
					data={orders}
					columns={columns}
					isLoading={isLoading}
					showTopFilters={false}
					showPagination={false}
					pagination={paginationObj}
				/>
			</CardContent>
		</Card>
	);
};

export const LastOrders = withErrorBoundary(LastOrdersBase);
