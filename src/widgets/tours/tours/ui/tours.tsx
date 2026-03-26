import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Card, CardContent, SmartTable } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_TOUR_STATUS,
	type ENUM_TOUR_STATUS_TYPE,
	type ITourFilters,
	TOUR_STATUS_LABELS,
	TourCard,
	TourCardSkeleton,
	useGetToursQuery
} from "@/entities/tour";

import { CreateTour } from "@/features/tours";

import { COLUMNS } from "../model";

export const Tours: FC = () => {
	const { t } = useTranslation(["tours_page", "options"]);

	const { watch, setValue } = useForm<ITourFilters>({
		defaultValues: {
			search: "",
			status: [ENUM_TOUR_STATUS.ALL],
			page: 1,
			limit: 10
		}
	});

	const filters = watch();

	const {
		data: toursData,
		isLoading,
		isFetching,
		isError
	} = useGetToursQuery(filters);

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const tours = useMemo(() => toursData?.data ?? [], [toursData]);
	const totalCount = toursData?.total ?? 0;

	const statusOptions = useValueToTranslateLabel(TOUR_STATUS_LABELS);

	const columns = useMemo(() => COLUMNS(t), [t]);

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
			setValue("status", val as ENUM_TOUR_STATUS_TYPE[]);
			setValue("page", 1);
		},
		[setValue]
	);

	const handleStatusTabChange = useCallback(
		(val: string) => {
			setValue("status", [val as ENUM_TOUR_STATUS_TYPE]);
			setValue("page", 1);
		},
		[setValue]
	);

	const activeTab = useMemo(
		() =>
			filters.status.length === 1
				? filters.status[0]
				: ENUM_TOUR_STATUS.ALL,
		[filters.status]
	);

	// Переводим тексты табов
	const translatedStatusTabs = useValueToTranslateLabel(TOUR_STATUS_LABELS);

	const actionsJsx = useMemo(() => <CreateTour />, []);
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
						columns={columns}
						data={tours}
						recordCount={totalCount}
						isLoading={isLoading || isFetching}
						loadingMode="skeleton"
						pagination={paginationObj}
						onPaginationChange={handlePaginationChange}
						useViewMode={true}
						defaultViewMode="cards"
						card={TourCard}
						cardSkeleton={TourCardSkeleton}
						showTopFilters={true}
						search={filters.search}
						onSearchChange={handleSearchChange}
						status={filters.status}
						onStatusChange={handleStatusChange}
						statusOptions={statusOptions}
						statusTabs={translatedStatusTabs}
						activeStatusTab={activeTab}
						onStatusTabChange={handleStatusTabChange}
						showStatusTabsFilter={true}
						actions={actionsJsx}
					/>
				</CardContent>
			</Card>
		</section>
	);
};
