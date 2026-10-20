import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Button,
	Card,
	CardContent,
	CustomField,
	Form,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_TOUR_FILTER,
	ENUM_TOUR_STATUS,
	type ENUM_TOUR_STATUS_TYPE,
	type ITourFilters,
	TOUR_STATUS_LABELS,
	TourCard,
	TourCardSkeleton,
	useGetToursQuery
} from "@/entities/tour";

import { CreateTour } from "@/features/tours";

import { COLUMNS, TOURS_FILTERS_LIST } from "../model";

const ToursBase: FC = () => {
	const { t } = useTranslation(["tours_page", "options"]);

	const form = useForm<ITourFilters>({
		defaultValues: {
			page: 1,
			limit: INTERSECTION_ELEMENTS.TOURS,
			search: "",
			status: [ENUM_TOUR_STATUS.ALL]
		}
	});
	const { watch, setValue, control } = form;

	const filters = watch();
	const { sort, type } = filters;
	const filtersList = TOURS_FILTERS_LIST();

	// Новый фильтр или сортировка — снова с первой страницы
	useEffect(() => {
		setValue("page", 1);
	}, [sort, type, setValue]);

	const handleResetFilters = useCallback(() => {
		setValue(ENUM_TOUR_FILTER.SORT, undefined);
		setValue(ENUM_TOUR_FILTER.TYPE, undefined);
	}, [setValue]);

	const filtersJsx = (
		<Form {...form}>
			<div className="flex flex-wrap items-center gap-4">
				{filtersList.map(({ key, ...item }) => (
					<CustomField
						hideLabel
						key={key}
						control={control}
						name={key}
						t={t}
						className="w-60"
						{...item}
					/>
				))}
				<Button
					type="button"
					variant="outline"
					onClick={handleResetFilters}
				>
					{t("filters.reset")}
				</Button>
			</div>
		</Form>
	);

	const {
		data: toursData,
		isLoading,
		isFetching,
		isRealError: isError
	} = useOptionalResourceQuery(useGetToursQuery(filters));

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

	const actionsJsx = <CreateTour />;
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
				<CardContent className="flex flex-col gap-4">
					{filtersJsx}
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

export const Tours = withErrorBoundary(ToursBase);
