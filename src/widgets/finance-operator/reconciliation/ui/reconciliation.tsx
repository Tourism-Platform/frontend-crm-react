import { RestartIcon } from "@solar-icons/react/outline";
import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	Card,
	CardContent,
	CustomField,
	Form,
	GLASS_SURFACE,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { useValueToTranslateLabel } from "@/shared/utils";

import { type ENUM_ORDER_STATUS_TYPE } from "@/entities/booking/order/types/order-status.types";
import {
	ENUM_RECONCILIATION_FILTER,
	type IReconciliationFilters,
	RECONCILIATION_STATUS_LABELS,
	useGetReconciliationsQuery
} from "@/entities/finance";
import {
	type TTourSelectOption,
	TourOptionCard,
	TourOptionCardSkeleton,
	useTourSearchOptions
} from "@/entities/tour";

import {
	COLUMNS,
	RECONCILIATION_FILTERS_LIST,
	RECONCILIATION_SWITCHES_LIST
} from "../model";

import { ReconciliationHeader } from "./reconciliation-header";

const ReconciliationBase: FC = () => {
	const { t } = useTranslation(["reconciliation_page", "options"]);
	// Переводы TourOptionCard в фильтре — грузим вместе со страницей, иначе первое открытие списка уходит в Suspense
	useTranslation("tours_page");
	const form = useForm<IReconciliationFilters>({
		defaultValues: {
			page: 1,
			limit: INTERSECTION_ELEMENTS.RECONCILIATION,
			search: "",
			status: []
		}
	});
	const { watch, setValue, control } = form;

	const filters = watch();
	const { tourId, dateRange, outstandingOnly, payableOnly } = filters;
	const hasFilters = Boolean(
		tourId || dateRange?.from || outstandingOnly || payableOnly
	);
	const tours = useTourSearchOptions();

	// Новый фильтр — снова с первой страницы
	useEffect(() => {
		setValue("page", 1);
	}, [tourId, dateRange, outstandingOnly, payableOnly, setValue]);

	const handleResetFilters = useCallback(() => {
		setValue(ENUM_RECONCILIATION_FILTER.TOUR_ID, undefined);
		setValue(ENUM_RECONCILIATION_FILTER.DATE_RANGE, undefined);
		setValue(ENUM_RECONCILIATION_FILTER.OUTSTANDING_ONLY, false);
		setValue(ENUM_RECONCILIATION_FILTER.PAYABLE_ONLY, false);
	}, [setValue]);

	const {
		data: reconciliationData,
		isLoading,
		isFetching
	} = useGetReconciliationsQuery(filters);

	const data = useMemo(
		() => reconciliationData?.data ?? [],
		[reconciliationData]
	);
	const totalCount = reconciliationData?.total ?? 0;
	const totals = reconciliationData?.totals;

	const statusOptions = useValueToTranslateLabel(
		RECONCILIATION_STATUS_LABELS
	);

	const columns = useMemo(() => COLUMNS(t), [t]);

	const paginationObj = useMemo(
		() => ({
			pageIndex: filters.page - 1,
			pageSize: filters.limit
		}),
		[filters.page, filters.limit]
	);

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
			setValue("status", val as ENUM_ORDER_STATUS_TYPE[]);
			setValue("page", 1);
		},
		[setValue]
	);

	return (
		<section className="flex gap-5 flex-col">
			<ReconciliationHeader totals={totals} />

			<Card variant="glass">
				<CardContent>
					<SmartTable
						TableClassName={cn(GLASS_SURFACE, "rounded-xl")}
						data={data}
						columns={columns}
						topChildren={
							<Form {...form}>
								<div className="flex w-full flex-wrap items-end justify-between gap-4">
									<div className="flex w-full flex-wrap items-end gap-3 sm:w-auto">
										<CustomField
											fieldType="asyncSelect"
											control={control}
											name={
												ENUM_RECONCILIATION_FILTER.TOUR_ID
											}
											t={t}
											label="filters.tour.label"
											placeholder="filters.tour.placeholder"
											emptyText="filters.tour.empty"
											className="mb-0 w-full sm:w-72"
											options={tours.options}
											onQueryChange={tours.setQuery}
											onLoadMore={tours.loadMore}
											hasMore={tours.hasMore}
											isLoading={tours.isLoading}
											isLoadingMore={tours.isLoadingMore}
											renderOption={(option) => (
												<TourOptionCard
													option={
														option as TTourSelectOption
													}
												/>
											)}
											renderSkeleton={() => (
												<TourOptionCardSkeleton />
											)}
										/>
										{RECONCILIATION_FILTERS_LIST.map(
											({ key, ...item }) => (
												<CustomField
													key={key}
													control={control}
													name={key}
													t={t}
													className="mb-0 w-full sm:w-60"
													{...item}
												/>
											)
										)}
										<LoaderButton
											type="button"
											variant="glass"
											onClick={handleResetFilters}
											disabled={!hasFilters}
											icon={<RestartIcon />}
											label={t("filters.reset")}
										/>
									</div>
									<div className="flex flex-wrap gap-x-6 gap-y-2 2xl:flex-col">
										{RECONCILIATION_SWITCHES_LIST.map(
											({ key, ...item }) => (
												<CustomField
													key={key}
													control={control}
													name={key}
													t={t}
													className="grow"
													{...item}
												/>
											)
										)}
									</div>
								</div>
							</Form>
						}
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

export const Reconciliation = withErrorBoundary(ReconciliationBase);
