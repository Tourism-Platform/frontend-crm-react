import { type OnChangeFn, type PaginationState } from "@tanstack/react-table";
import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Card, CardContent, SmartTable } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_SUPPLIER_PAYMENT_STATUS_TYPE,
	type ISupplierPaymentFilters,
	SUPPLIER_PAYMENT_STATUS_LABELS,
	useGetSupplierPaymentsQuery
} from "@/entities/finance";

import { COLUMNS } from "../model";

import { SupplierPaymentsHeader } from "./supplier-payments-header";

export const SupplierPayments: FC = () => {
	const { watch, setValue } = useForm<ISupplierPaymentFilters>({
		defaultValues: {
			search: "",
			status: [],
			page: 1,
			limit: 10
		}
	});

	const filters = watch();

	const { data, isLoading, isFetching } =
		useGetSupplierPaymentsQuery(filters);

	const payments = data?.data ?? [];
	const totalCount = data?.total ?? 0;
	const statusCounts = data?.statusCounts;

	const statusOptions = useValueToTranslateLabel(
		SUPPLIER_PAYMENT_STATUS_LABELS
	);

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
		setValue("status", val as ENUM_SUPPLIER_PAYMENT_STATUS_TYPE[]);
		setValue("page", 1);
	};

	return (
		<section className="flex gap-5 flex-col">
			<SupplierPaymentsHeader statusCounts={statusCounts} />
			<Card>
				<CardContent>
					<SmartTable
						data={payments}
						columns={COLUMNS()}
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
