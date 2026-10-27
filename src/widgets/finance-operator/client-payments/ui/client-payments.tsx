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
	BookingOrderOptionCard,
	BookingOrderOptionCardSkeleton,
	type TBookingOrderSelectOption,
	useBookingOrderSearchOptions
} from "@/entities/booking";
import {
	ENUM_PAYMENT_FILTER,
	ENUM_PAYMENT_STATUS,
	type ENUM_PAYMENT_STATUS_TYPE,
	type IPaymentFilters,
	PAYMENT_STATUS_LABELS,
	PAYMENT_STATUS_VARIANTS,
	useGetPaymentsQuery
} from "@/entities/finance";

import { NewPayment } from "@/features/finance";

import { CLIENT_PAYMENTS_FILTERS_LIST, COLUMNS } from "../model";

const ClientPaymentsBase: FC = () => {
	const { t } = useTranslation(["client_payments_page", "options"]);
	const form = useForm<IPaymentFilters>({
		defaultValues: {
			page: 1,
			limit: INTERSECTION_ELEMENTS.CLIENT_PAYMENTS,
			search: "",
			status: []
		}
	});
	const { watch, setValue, control } = form;

	const filters = watch();
	const { bookingId, createdRange } = filters;
	const orders = useBookingOrderSearchOptions();

	// Новый фильтр — снова с первой страницы
	useEffect(() => {
		setValue("page", 1);
	}, [bookingId, createdRange, setValue]);

	const handleResetFilters = useCallback(() => {
		setValue(ENUM_PAYMENT_FILTER.BOOKING_ID, undefined);
		setValue(ENUM_PAYMENT_FILTER.CREATED_RANGE, undefined);
	}, [setValue]);

	const {
		data: paymentsData,
		isLoading,
		isFetching,
		isRealError: isError
	} = useOptionalResourceQuery(useGetPaymentsQuery(filters));

	useEffect(() => {
		if (isError) {
			toast.error(t("toasts.load.error"));
		}
	}, [isError, t]);

	const payments = useMemo(() => paymentsData?.data ?? [], [paymentsData]);
	const totalCount = paymentsData?.total ?? 0;
	const statusCounts = paymentsData?.statusCounts;

	const statusOptions = useValueToTranslateLabel(PAYMENT_STATUS_LABELS);

	const columns = useMemo(() => COLUMNS(t), [t]);

	const actionsJsx = useMemo(() => <NewPayment />, []);

	const filtersJsx = (
		<Form {...form}>
			<div className="flex flex-wrap items-center gap-4">
				<CustomField
					hideLabel
					fieldType="asyncSelect"
					control={control}
					name={ENUM_PAYMENT_FILTER.BOOKING_ID}
					t={t}
					label="filters.booking.label"
					placeholder="filters.booking.placeholder"
					emptyText="filters.booking.empty"
					className="w-full sm:w-72"
					options={orders.options}
					onQueryChange={orders.setQuery}
					onLoadMore={orders.loadMore}
					hasMore={orders.hasMore}
					isLoading={orders.isLoading}
					isLoadingMore={orders.isLoadingMore}
					renderOption={(option) => (
						<BookingOrderOptionCard
							option={option as TBookingOrderSelectOption}
						/>
					)}
					renderSkeleton={() => <BookingOrderOptionCardSkeleton />}
				/>
				{CLIENT_PAYMENTS_FILTERS_LIST.map(({ key, ...item }) => (
					<CustomField
						hideLabel
						key={key}
						control={control}
						name={key}
						t={t}
						className="w-full sm:w-72"
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
			setValue("status", val as ENUM_PAYMENT_STATUS_TYPE[]);
			setValue("page", 1);
		},
		[setValue]
	);

	return (
		<section className="flex gap-5 flex-col">
			<h1 className="md:text-3xl text-2xl">{t("page_name")}</h1>
			<Card>
				<CardContent className="flex flex-col gap-4">
					<StatusCounts
						statuses={Object.values(ENUM_PAYMENT_STATUS)}
						labels={PAYMENT_STATUS_LABELS}
						variants={PAYMENT_STATUS_VARIANTS}
						counts={statusCounts}
					/>
					{filtersJsx}
					<SmartTable
						data={payments}
						columns={columns}
						actions={actionsJsx}
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

export const ClientPayments = withErrorBoundary(ClientPaymentsBase);
