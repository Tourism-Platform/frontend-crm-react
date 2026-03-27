import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Card, CardContent, withErrorBoundary } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_TOUR_ORDER_STATUS_TYPE,
	type ITourOrderFilters,
	TOUR_ORDER_STATUS_LABELS,
	useGetTourOrdersQuery
} from "@/entities/tour";

import {
	ConnectedTourHeader,
	PreviewTourButton,
	PublishTourButton
} from "@/features/tours";

import { ORDER_HISTORY_COLUMNS } from "../model";

const OrderHistoryBase: FC = () => {
	const { t } = useTranslation("tour_order_history_page");
	const { t: tCols } = useTranslation(["tour_order_history_page", "options"]);
	const { tourId = "" } = useParams<{ tourId: string }>();

	const { watch, setValue } = useForm<ITourOrderFilters>({
		defaultValues: {
			tourId,
			status: [],
			search: "",
			page: 1,
			limit: 10
		}
	});

	const filters = watch();

	const {
		data,
		isLoading,
		isFetching,
		isError: isLandingError
	} = useGetTourOrdersQuery(filters);

	useEffect(() => {
		if (isLandingError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isLandingError, t]);

	const orders = useMemo(() => data?.data ?? [], [data]);
	const totalCount = data?.total ?? 0;

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

	const handleStatusChange = useCallback(
		(val: string[]) => {
			setValue("status", val as ENUM_TOUR_ORDER_STATUS_TYPE[]);
			setValue("page", 1);
		},
		[setValue]
	);

	const statusOptions = useValueToTranslateLabel(TOUR_ORDER_STATUS_LABELS);
	const columns = useMemo(() => ORDER_HISTORY_COLUMNS(tCols), [tCols]);

	const paginationObj = useMemo(
		() => ({
			pageIndex: filters.page - 1,
			pageSize: filters.limit
		}),
		[filters.page, filters.limit]
	);

	const actionsJsx = useMemo(
		() => (
			<>
				<PreviewTourButton />
				<PublishTourButton />
			</>
		),
		[]
	);

	return (
		<section className="flex flex-col gap-6 container">
			<ConnectedTourHeader title={t("page_name")} actions={actionsJsx} />
			<Card>
				<CardContent>
					<SmartTable
						data={orders}
						columns={columns}
						isLoading={isLoading || isFetching}
						loadingMode="skeleton"
						recordCount={totalCount}
						pagination={paginationObj}
						onPaginationChange={handlePaginationChange}
						search={filters.search}
						onSearchChange={handleSearchChange}
						status={filters.status}
						onStatusChange={handleStatusChange}
						statusOptions={statusOptions}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

export const OrderHistory = withErrorBoundary(OrderHistoryBase);
