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
	StatusCounts,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_SUPPLIER_PAYMENT_FILTER,
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	type ISupplierPaymentFilters,
	SUPPLIER_PAYMENT_STATUS_LABELS,
	SUPPLIER_PAYMENT_STATUS_VARIANTS,
	useGetSupplierPaymentsQuery
} from "@/entities/finance";
import {
	SupplierOptionCard,
	SupplierOptionCardSkeleton,
	type TSupplierSelectOption,
	useSupplierSearchOptions
} from "@/entities/supplier";

import { COLUMNS } from "../model";

const SupplierPaymentsBase: FC = () => {
	const { t } = useTranslation("supplier_payments_page");
	const { t: tCols } = useTranslation(["supplier_payments_page", "options"]);
	const form = useForm<ISupplierPaymentFilters>({
		defaultValues: {
			page: 1,
			limit: INTERSECTION_ELEMENTS.SUPPLIER_PAYMENTS,
			search: "",
			status: []
		}
	});
	const { watch, setValue, control } = form;

	const filters = watch();
	const { supplierId } = filters;
	const suppliers = useSupplierSearchOptions({});

	// Новый фильтр — снова с первой страницы
	useEffect(() => {
		setValue("page", 1);
	}, [supplierId, setValue]);

	const handleResetFilters = useCallback(() => {
		setValue(ENUM_SUPPLIER_PAYMENT_FILTER.SUPPLIER_ID, undefined);
	}, [setValue]);

	const {
		data: paymentsData,
		isLoading,
		isFetching,
		isRealError: isError
	} = useOptionalResourceQuery(useGetSupplierPaymentsQuery(filters));

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const payments = useMemo(() => paymentsData?.data ?? [], [paymentsData]);
	const totalCount = paymentsData?.total ?? 0;
	const statusCounts = paymentsData?.statusCounts;

	const statusOptions = useValueToTranslateLabel(
		SUPPLIER_PAYMENT_STATUS_LABELS
	);

	const columns = useMemo(() => COLUMNS(tCols), [tCols]);

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
			setValue("status", val as ENUM_SUPPLIER_PAYMENT_STATUS_TYPE[]);
			setValue("page", 1);
		},
		[setValue]
	);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="text-3xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="flex flex-col gap-4">
					<StatusCounts
						statuses={Object.values(ENUM_SUPPLIER_PAYMENT_STATUS)}
						labels={SUPPLIER_PAYMENT_STATUS_LABELS}
						variants={SUPPLIER_PAYMENT_STATUS_VARIANTS}
						counts={statusCounts}
					/>
					<Form {...form}>
						<div className="flex flex-wrap items-center gap-4">
							<CustomField
								hideLabel
								fieldType="asyncSelect"
								control={control}
								name={ENUM_SUPPLIER_PAYMENT_FILTER.SUPPLIER_ID}
								t={t}
								label="filters.supplier.label"
								placeholder="filters.supplier.placeholder"
								emptyText="filters.supplier.empty"
								className="w-[32rem]"
								options={suppliers.options}
								onQueryChange={suppliers.setQuery}
								onLoadMore={suppliers.loadMore}
								hasMore={suppliers.hasMore}
								isLoading={suppliers.isLoading}
								isLoadingMore={suppliers.isLoadingMore}
								renderOption={(option) => (
									<SupplierOptionCard
										option={option as TSupplierSelectOption}
									/>
								)}
								renderSkeleton={() => (
									<SupplierOptionCardSkeleton />
								)}
							/>
							<Button
								type="button"
								variant="outline"
								onClick={handleResetFilters}
							>
								{t("filters.reset")}
							</Button>
						</div>
					</Form>
					<SmartTable
						data={payments}
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

export const SupplierPayments = withErrorBoundary(SupplierPaymentsBase);
