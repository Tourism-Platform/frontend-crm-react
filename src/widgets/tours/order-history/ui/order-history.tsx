import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Card, CardContent, SmartTable } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_TOUR_ORDER_STATUS_TYPE,
	type ITourOrderFilters,
	TOUR_ORDER_STATUS_LABELS,
	TourHeader,
	useGetTourOrdersQuery
} from "@/entities/tour";

import { PreviewTourButton, PublishTourButton } from "@/features/tours";

import { ORDER_HISTORY_COLUMNS } from "../model";

export const OrderHistory: FC = () => {
	const { t } = useTranslation("tour_order_history_page");
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

	const { data, isLoading, isFetching } = useGetTourOrdersQuery(filters);

	const orders = data?.data ?? [];
	const totalCount = data?.total ?? 0;

	const handlePaginationChange: OnChangeFn<PaginationState> = (
		updaterOrValue
	) => {
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
	};

	const handleSearchChange = (val: string) => {
		setValue("search", val);
		setValue("page", 1);
	};

	const handleStatusChange = (val: string[]) => {
		setValue("status", val as ENUM_TOUR_ORDER_STATUS_TYPE[]);
		setValue("page", 1);
	};

	const statusOptions = useValueToTranslateLabel(TOUR_ORDER_STATUS_LABELS);

	return (
		<section className="flex flex-col gap-6 container">
			<TourHeader
				title={`${t("page_name")}: Embark on an Unforgettable Archaeological Journey`}
				badgeText="Planning"
				duration="6 days / 5 nights"
				type="Group"
				actions={
					<>
						<PreviewTourButton />
						<PublishTourButton />
					</>
				}
			/>
			<Card>
				<CardContent>
					<SmartTable
						data={orders}
						columns={ORDER_HISTORY_COLUMNS()}
						isLoading={isLoading || isFetching}
						loadingMode="skeleton"
						recordCount={totalCount}
						pagination={{
							pageIndex: filters.page - 1,
							pageSize: filters.limit
						}}
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
