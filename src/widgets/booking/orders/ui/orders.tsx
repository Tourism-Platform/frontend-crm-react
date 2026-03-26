import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Card, CardContent, SmartTable, withErrorBoundary } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	BOOKING_ORDER_STATUS_LABELS,
	ENUM_ORDER_STATUS,
	type ENUM_ORDER_STATUS_TYPE,
	useGetBookingOrdersQuery
} from "@/entities/booking";

import { COLUMNS } from "../model";

const OrdersBase: FC = () => {
	const { t } = useTranslation("orders_page");
	const { watch, setValue } = useForm<{
		status: ENUM_ORDER_STATUS_TYPE;
		search: string;
		page: number;
		limit: number;
	}>({
		defaultValues: {
			status: ENUM_ORDER_STATUS.NEW,
			search: "",
			page: 1,
			limit: 10
		}
	});

	const filters = watch();

	const {
		data: ordersData,
		isLoading,
		isFetching,
		isError
	} = useGetBookingOrdersQuery({
		status: [filters.status],
		search: filters.search,
		page: filters.page,
		limit: filters.limit
	});

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const orders = useMemo(() => ordersData?.data ?? [], [ordersData]);
	const totalCount = ordersData?.total ?? 0;

	const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
		(updaterOrValue) => {
			const currentPagination = {
				pageIndex: filters.page - 1,
				pageSize: filters.limit
			};

			const nextValue =
				typeof updaterOrValue === "function"
					? updaterOrValue(currentPagination)
					: updaterOrValue;

			setValue("page", nextValue.pageIndex + 1);
			setValue("limit", nextValue.pageSize);
		},
		[filters.page, filters.limit, setValue]
	);

	const handleSearchChange = useCallback(
		(val: string) => {
			setValue("search", val);
			setValue("page", 1);
		},
		[setValue]
	);

	const handleStatusTabChange = useCallback(
		(val: string) => {
			setValue("status", val as ENUM_ORDER_STATUS_TYPE);
			setValue("page", 1);
		},
		[setValue]
	);

	const translatedStatusTabs = useValueToTranslateLabel(
		BOOKING_ORDER_STATUS_LABELS
	);

	const columns = useMemo(
		() => COLUMNS(filters.status, t),
		[filters.status, t]
	);

	const paginationObj = useMemo(
		() => ({
			pageIndex: filters.page - 1,
			pageSize: filters.limit
		}),
		[filters.page, filters.limit]
	);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent>
					<SmartTable
						data={orders}
						columns={columns}
						recordCount={totalCount}
						isLoading={isLoading || isFetching}
						loadingMode="skeleton"
						pagination={paginationObj}
						onPaginationChange={handlePaginationChange}
						search={filters.search}
						onSearchChange={handleSearchChange}
						statusTabs={translatedStatusTabs}
						activeStatusTab={filters.status}
						onStatusTabChange={handleStatusTabChange}
						showStatusTabsFilter={true}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

export const Orders = withErrorBoundary(OrdersBase);
