import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	withErrorBoundary
} from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import {
	type ISupplierPaymentFilters,
	useGetSupplierPaymentsQuery
} from "@/entities/finance";

import { SUPPLIER_PAYMENTS_COLUMNS } from "../model";

interface IOrderSupplierPaymentsProps {
	bookingId: string;
}

const TABLE_LAYOUT = {
	rowBorder: true,
	headerBackground: false
};

const OrderSupplierPaymentsBase: FC<IOrderSupplierPaymentsProps> = ({
	bookingId
}) => {
	const { t } = useTranslation(["order_id_page", "options"]);

	const { watch, setValue } = useForm<ISupplierPaymentFilters>({
		defaultValues: {
			bookingId,
			search: "",
			status: [],
			page: 1,
			limit: 10
		}
	});

	const filters = watch();
	const queryFilters = useMemo(
		() => ({ ...filters, bookingId }),
		[filters, bookingId]
	);

	const { data, isLoading, isFetching } = useGetSupplierPaymentsQuery(
		queryFilters,
		{ skip: !bookingId }
	);

	const payments = useMemo(() => data?.data ?? [], [data]);
	const totalCount = data?.total ?? 0;

	const columns = useMemo(() => SUPPLIER_PAYMENTS_COLUMNS(t), [t]);

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

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">
					{t("supplier_payments.title")}
				</CardTitle>
			</CardHeader>
			<CardContent>
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
					showTopFilters
					showStatusFilter={false}
					showVisibilityFilter
					tableLayout={TABLE_LAYOUT}
				/>
			</CardContent>
		</Card>
	);
};

export const OrderSupplierPayments = withErrorBoundary(
	OrderSupplierPaymentsBase
);
