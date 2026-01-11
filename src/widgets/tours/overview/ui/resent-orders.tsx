import { type FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	SmartTable
} from "@/shared/ui";

import { type ITourOrderFilters, useGetTourOrdersQuery } from "@/entities/tour";

import { RECENT_ORDERS_COLUMNS } from "../model";

export const LastOrders: FC = () => {
	const { t } = useTranslation("tour_overview_page");
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

	const orders = data?.data ?? [];
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
					columns={RECENT_ORDERS_COLUMNS()}
					isLoading={isLoading}
					showTopFilters={false}
					showPagination={false}
					pagination={{
						pageIndex: filters.page - 1,
						pageSize: filters.limit
					}}
				/>
			</CardContent>
		</Card>
	);
};
